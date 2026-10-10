# Extrait le texte page par page d'un PDF (reference de contenu) vers un .txt UTF-8.
# Usage : python scripts/extract-pdf-text.py <pdf> <sortie.txt>
import sys
import fitz  # PyMuPDF

pdf_path = sys.argv[1]
out_path = sys.argv[2]

doc = fitz.open(pdf_path)
with open(out_path, "w", encoding="utf-8") as f:
    for i, page in enumerate(doc, start=1):
        f.write(f"\n===== PAGE {i} =====\n")
        # sort=True : reconstitue l'ordre de lecture logique ; RTL gere par PyMuPDF.
        text = page.get_text("text", sort=True)
        f.write(text)
        f.write("\n")
print(f"OK {doc.page_count} pages -> {out_path}")
