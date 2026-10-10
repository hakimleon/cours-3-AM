# Rend une region (bande verticale) d'une page PDF en PNG haute resolution.
# Usage : python scripts/render-pdf-region.py <pdf> <page> <zoom> <y0frac> <y1frac> <out.png>
import sys
import fitz  # PyMuPDF

pdf_path = sys.argv[1]
page_no = int(sys.argv[2])
zoom = float(sys.argv[3])
y0 = float(sys.argv[4])
y1 = float(sys.argv[5])
out_path = sys.argv[6]

doc = fitz.open(pdf_path)
page = doc[page_no - 1]
r = page.rect
clip = fitz.Rect(r.x0, r.y0 + (r.y1 - r.y0) * y0,
                 r.x1, r.y0 + (r.y1 - r.y0) * y1)
pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip)
pix.save(out_path)
print(
    f"OK page {page_no} [{y0}-{y1}] zoom {zoom} -> {out_path} ({pix.width}x{pix.height})")
