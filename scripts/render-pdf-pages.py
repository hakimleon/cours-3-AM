# Rend chaque page d'un PDF en PNG (pour l'OCR automatique).
# Usage : python scripts/render-pdf-pages.py <pdf> <outdir> [zoom=2]
import os
import sys
import pymupdf

pdf_path = sys.argv[1]
outdir = sys.argv[2]
zoom = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
os.makedirs(outdir, exist_ok=True)

doc = pymupdf.open(pdf_path)
for i, page in enumerate(doc, start=1):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom))
    out = os.path.join(outdir, f"page-{i:02d}.png")
    pix.save(out)
    print(
        f"rendered page {i}/{doc.page_count} -> {out} ({pix.width}x{pix.height})")
