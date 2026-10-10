# Recherche automatique de termes interdits (ions) dans le PDF exporté :
#   1) couche texte du PDF ;
#   2) texte DOM capturé au moment de l'export — contenu exact rasterisé
#      dans les images du PDF (le PDF est composé d'images) ;
#   3) texte OCR des pages du PDF (reconnaissance réelle du rendu) ;
#   4) formes normalisées (ة/ه، أ/ا، diacritiques) pour éviter les faux
#      négatifs (ex. شاردة vs شارده).
#   5) liste des séquences contenant « Na » / « Cl » : elles doivent se
#      limiter à des formules neutres (ex. NaCl, formule du sel).
# Usage : python scripts/search-pdf-ions.py <pdf> [dom-text.txt] [ocr-text.txt]
import re
import sys
import unicodedata

import pymupdf

FORBIDDEN = ["شاردة", "شوارد", "شارد", "أيون",
             "أيونات", "Na⁺", "Na+", "Cl⁻", "Cl-"]
NORMALIZED_FORBIDDEN = [
    "شارد",
    "شوارد",
    "ايون",
    "كاتيون",
    "انيون",
    "na+",
    "cl-",
    "na⁺",
    "cl⁻",
]


def normalize(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = s.replace("أ", "ا").replace(
        "إ", "ا").replace("آ", "ا").replace("ة", "ه")
    return s.lower()


def report(label, text):
    print(f"== {label} ({len(text)} chars) ==")
    total = 0
    for p in FORBIDDEN:
        c = text.count(p)
        total += c
        if c:
            idx = text.find(p)
            ctx = text[max(0, idx - 40): idx + 60].replace("\n", " ")
            print(f"  {p!r}: {c}  | contexte: …{ctx}…")
    print(f"  TOTAL termes d'ions : {total}")
    return total


def report_normalized(label, text):
    norm = normalize(text)
    total = 0
    print(f"== {label} — formes normalisées (ة/ه، أ/ا، diacritiques) ==")
    for p in NORMALIZED_FORBIDDEN:
        c = norm.count(p)
        total += c
        if c:
            idx = norm.find(p)
            ctx = norm[max(0, idx - 40): idx + 60].replace("\n", " ")
            print(f"  {p!r}: {c}  | contexte: …{ctx}…")
    print(f"  TOTAL formes normalisées : {total}")
    return total


def report_latin_tokens(label, text):
    tokens = {}
    for m in re.finditer(r"[A-Za-z]*(?:Na|Cl)[A-Za-z0-9]*", text, re.IGNORECASE):
        tokens[m.group(0).lower()] = tokens.get(m.group(0).lower(), 0) + 1
    print(f"== {label} — séquences contenant « Na » ou « Cl » ==")
    if not tokens:
        print("  aucune")
    for tok, c in sorted(tokens.items()):
        print(f"  {tok!r}: {c}")
    return tokens


doc = pymupdf.open(sys.argv[1])
pdf_text = "\n".join(page.get_text() for page in doc)
total = report("Couche texte du PDF", pdf_text)

if len(sys.argv) > 2:
    with open(sys.argv[2], encoding="utf-8-sig") as fh:
        dom = fh.read()
    total += report("Texte DOM capturé à l'export (source des images PDF)", dom)
    total += report_normalized("DOM", dom)
    report_latin_tokens("DOM", dom)

if len(sys.argv) > 3:
    with open(sys.argv[3], encoding="utf-8-sig") as fh:
        ocr = fh.read()
    total += report("Texte OCR des pages du PDF (reconnaissance du rendu)", ocr)
    total += report_normalized("OCR", ocr)
    report_latin_tokens("OCR", ocr)

print()
verdict = "PROPRE (aucun terme d'ion trouvé)" if total == 0 else "TERMES TROUVÉS"
print(f"VERDICT : {verdict}")
