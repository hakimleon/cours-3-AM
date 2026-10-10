# Crops de contrôle des frontières de pages du PDF Cours 01 (version 15 pages).
# Vérifie : cartes entières (illustration p5, questions p6), table exemples p8,
# schéma-bilan entier p14, et absence de fragment de bord en bas/haut de page.
import fitz  # PyMuPDF
import os
import glob
import sys
sys.stdout.reconfigure(encoding="utf-8")

pdfs = glob.glob("pdf_preview_new/*Cours-01*.pdf")
pdf = max(pdfs, key=os.path.getmtime)
print("PDF:", pdf)

doc = fitz.open(pdf)
print("pages:", doc.page_count)

# (page, zoom, y0frac, y1frac, sortie)
jobs = [
    # fin p4 : aucun fragment de carte
    (4, 1.6, 0.72, 1.00, "chk-p4-bas.png"),
    # carte illustration entière, bord haut net
    (5, 1.6, 0.00, 0.28, "chk-p5-haut.png"),
    # fin p5 : aucun fragment de la carte questions
    (5, 1.6, 0.70, 1.00, "chk-p5-bas.png"),
    (6, 1.6, 0.00, 0.30, "chk-p6-haut.png"),     # carte questions entière
    # table exemples complète (النحاس incluse)
    (8, 1.6, 0.25, 0.80, "chk-p8-table.png"),
    # bas p8 : enchaînement section 3
    (8, 1.6, 0.72, 1.00, "chk-p8-bas.png"),
    (12, 1.6, 0.75, 1.00, "chk-p12-bas.png"),    # fin tranche 1/2 du bloc 25
    # tranche 2/2 + blanc, pas de fragment schéma
    (13, 1.6, 0.00, 0.55, "chk-p13.png"),
    (14, 1.5, 0.00, 0.55, "chk-p14-haut.png"),   # début du schéma-bilan entier
    # fin du schéma-bilan + carte الفكرة
    (14, 1.5, 0.45, 1.00, "chk-p14-bas.png"),
]

for page_no, zoom, y0, y1, out in jobs:
    page = doc[page_no - 1]
    r = page.rect
    clip = fitz.Rect(r.x0, r.y0 + (r.y1 - r.y0) * y0,
                     r.x1, r.y0 + (r.y1 - r.y0) * y1)
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip)
    path = os.path.join("pdf_render_new", out)
    pix.save(path)
    print("OK", out, f"{pix.width}x{pix.height}")

print("done")
