# Vérification — SVT 3AM, Leçon 01 « الزلازل ظاهرة طبيعية »

Date : 19 octobre 2026 · Périmètre modifié : `src/components/svt/*`, `src/data/svtCoursesData.ts`,
`src/utils/exportCoursePdf.ts` (ajout du collecteur SVT uniquement), `src/index.css` (règles SVT).
**Mathématiques et Physique-Chimie non modifiés.**

## 1. Ordre du cours (vérifié sur le DOM rendu)

Ordre des grands blocs dans `#svt-course-main-content` (index DOM) :

| Bloc | id | index DOM |
|---|---|---|
| En-tête (titre, numéro, domaine, OBJ1→OBJ5) | `svt-course-header` | 0 |
| أحتفظ بالأهم (9 puces + schéma-bilan + 3 questions flash) | `sec-svt-essential` | 31 |
| Exercices BEM (3 exercices) | `sec-svt-exercices` | 162 |
| Accordéon للتعمق | `sec-svt-deepen-accordion` | 356 |

Accordéon **replié par défaut sur le web** (`display: none` constaté), **ouvert à l'impression et à l'export PDF**
(événement `course-pdf-prepare`). Contenu et ordre des enfants :

1. `sec-svt-discovery` — وضعية الانطلاق + الإشكالية
2. `sec-svt-01-docs` — ملاحظة الوثائق (question flash + réponse)
3. `sec-svt-01-def` → `sec-svt-01-safety` — تعريف، انتشار، تسجيل، مقدار/شدة، منحنيات، وقاية
4. `sec-svt-synthesis-vocab` — schéma-synthèse, حصيلة, glossaire (**dernier**)

Contrôles : `headerBeforeEssential`, `essentialBeforeExercises`, `exercisesBeforeDeepen`,
`situationInsideAccordion`, `glossaryLast` = **true**. La situation de départ n'apparaît plus en tête et
aucun renvoi ne la précède depuis l'essentiel.

## 2. Textes imposés (comparaison caractère par caractère)

- **9 puces du bloc « أحتفظ بالأهم »** : identiques au texte imposé (comparaison stricte sur le texte DOM,
  hors espaces de mise en forme) → **9/9**.
- **Situation de départ** (manuel p. 9) : identique → **OK**.
- **Problématique** : identique → **OK**.
- Texte extrait du **PDF d'impression** (`pdftotext`, PDF texte de `cours_svt_01_impression.pdf`) :
  **9/9 puces** et situation **identiques**. Deux puces mixtes arabe/latin (6 et 7) ne diffèrent que par
  l'ordre de la ponctuation/parenthèses réintroduit par l'extracteur bidi — tous les caractères sont présents.
- Détail machine : `public/verification_captures/lesson01_gabarit/pdf_comparison.json` et `texte_extrait_pdf.txt`.

## 3. Schémas (SVG vectoriels uniquement, aucune image externe/IA)

Contrôles géométriques automatiques (bbox réelles des `<text>`) :

| Schéma | viewBox | textes | hors cadre | chevauchements | texte hors viewBox |
|---|---|---|---|---|---|
| Schéma-bilan (essentiel) | 820×430 | 10 | 0 | 0 | 0 |
| Coupe géologique | 800×440 | 10 | 0 | 0 | 0 |
| Sismogramme | 800×340 | 15 | 0 | 0 | 0 |
| Schéma-synthèse | 860×300 | 9 | 0 | 0 | 0 |

- **Faille** : test d'intersection segment/rectangle → **0 libellé traversé** (schéma-bilan et coupe).
- **Sismographe** : appareil dessiné (base, bras, pointeau, tambour) **sans texte sur le tracé**, libellé dans
  une boîte séparée.
- **Légendes** : une seule légende arabe par schéma ; suppression des doublons français/anglais et de la
  grille de 4 encarts de la coupe.
- **Sismogramme** : ligne de base avant secousse, arrivée progressive, enveloppe croissante puis amortie
  (tracé généré par enveloppe lissée, sans dents de scie régulières), axes Temps (0→60 s) et Amplitude gradués.
- **Magnitude / intensité** : deux colonnes sur une même page, bloc insécable → tient sur la page 10 du PDF.
- **Schéma-synthèse** : chaîne de droite à gauche
  تصدع الصخور وتحرر الطاقة ← انتشار الأمواج الزلزالية من البؤرة ← اهتزاز سطح الأرض,
  avec la branche « التسجيل » (flèche descendante) reliée à « التسجيل الزلزالي ».

## 4. Mise en page (PDF d'impression, 13 pages)

- Aucun bloc pédagogique coupé entre deux pages : essentiel (p. 2), exercices 1/2/3 (p. 3/4/5),
  situation + observation (p. 6), coupe (p. 8), sismogramme (p. 9), magnitude/intensité (p. 10),
  prévention (p. 11), synthèse (p. 12). **Layout report : 0 échec.**
- Ordre global conforme dans le PDF : en-tête → essentiel → exercices → situation → observation →
  développements → synthèse+glossaire.
- Mentions internes : `page à confirmer` 0, `ص 50-52` 0, `Schéma du foyer` 0, `Seismic intensity` 0,
  `Magnitude vs` 0, `Formulation simplifiée` 0, `Vérification externe` 0.
- Prévention : « مكمل بيداغوجي » apparaît **1 seule fois**, dans le titre `إرشادات الحماية المدنية (مكمل بيداغوجي)`.
- Zemmouri : phrase imposée `مثل زلزال زموري 2003، مقداره 6.6 على سلم ريشتر` (2 occurrences, aucune pagination).
- Bloc essentiel : aucun libellé français ajouté (seuls `Magnitude`, `Intensité`, `MSK` du texte imposé).

## 5. Export PDF de l'application (interface réelle)

Bouton « حفظ كملف PDF » cliqué dans le navigateur :

- fichier produit : `cours_svt_01_export_application.pdf`, **3,36 Mo**, **10 pages**, **0 erreur JS** ;
- le collecteur SVT dédié découpe le cours en blocs (en-tête, essentiel, chaque exercice, chaque section de
  l'accordéon) au lieu d'une seule capture géante.

## 6. Captures

Dossier : `public/verification_captures/lesson01_gabarit/` (22 captures + 2 PDF + 5 fichiers de rapport) :

- `01_entete.png`, `02_essentiel.png`, `03_exercices.png`, `04_accordeon_ouvert.png`
- `05_situation_depart.png`, `06_observation_documents.png`, `07a…07f` (définition, propagation,
  enregistrement, magnitude/intensité, isoséistes, prévention)
- chaque schéma isolé + dans la page : `sch_coupe_geologique_*`, `sch_sismogramme_*`,
  `sch_magnitude_intensite_*`, `sch_schema_bilan_*`, `sch_schema_synthese_*`
- PDF et rapports : `cours_svt_01_impression.pdf`, `cours_svt_01_export_application.pdf`, `greps.txt`,
  `texte_extrait_pdf.txt`, `pdf_comparison.json`, `layout_report.json`, `geometry.json`

## 7. Points ouverts (inchangés)

- **V1** : termes « الهزات » et « الارتدادات » — formulation à confirmer dans le manuel.
- **V2** : formulation exacte de la définition du séisme — à confirmer dans le manuel.
- **V3** : plage de l'échelle de Richter : 0–9 (p. 13) ou 1–9 (p. 16) — à trancher par l'enseignant.
