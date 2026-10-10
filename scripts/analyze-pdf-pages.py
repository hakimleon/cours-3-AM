# Analyse le remplissage des pages d'un PDF exporte (images de blocs collées).
# Usage : python scripts/analyze-pdf-pages.py <pdf>
import sys
import fitz  # PyMuPDF

pdf_path = sys.argv[1]
doc = fitz.open(pdf_path)
print(f"Total pages: {doc.page_count}")
for i, page in enumerate(doc, start=1):
    r = page.rect
    infos = page.get_image_info()
    # union verticale du contenu (hors pied de page)
    tops = [im["bbox"][1] for im in infos]
    bottoms = [im["bbox"][3] for im in infos]
    if not infos:
        print(f"Page {i:2d}: (vide, aucune image)  page_h={r.height:.0f}")
        continue
    top = min(tops)
    bottom = max(bottoms)
    filled = bottom - top
    pct = filled / r.height * 100
    print(
        f"Page {i:2d}: {len(infos):2d} img | contenu y {top:6.1f} -> {bottom:6.1f} "
        f"| rempli {filled:6.1f}pt ({pct:4.1f}% de {r.height:.0f})"
    )
    # detail des bbox (triees par y) pour reperer les coupures exactes
    for im in sorted(infos, key=lambda x: x["bbox"][1]):
        b = im["bbox"]
        print(f"    img y {b[1]:6.1f} -> {b[3]:6.1f}  (h={b[3]-b[1]:6.1f})")
