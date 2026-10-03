# Simulation Framework 3AM Physique-Chimie — Rapport d'Audit & Plan d'Architecture

Ce document présente l'audit complet du système actuel, l'évaluation pédagogique des 20 cours du programme **Physique-Chimie 3AM**, la matrice de pertinence des simulations (**Niveaux A/B/C/D** et **Priorités P0/P1/P2/P3**), l'audit d'isolation du pilote `electrolysis-water` (Cours 02), ainsi que l'architecture cible et le plan d'exécution.

---

## 1. Vue d'ensemble & Objectifs

### A. Architecture actuelle

L'application repose sur une architecture **React 19 + TypeScript + Vite + Tailwind CSS** structurée en deux modules indépendants (**Mathématiques** et **Physique-Chimie 3AM**).

Dans le module **Physique-Chimie 3AM** :
1. **Données des cours (`src/data/physicsChemistryCoursesData.ts` & `src/typesPhysicsChemistry.ts`)** :
   - Contient les 4 domaines officiels (`matter`, `energy`, `electricity`, `optics`) et le tableau `PHYSICS_CHEMISTRY_COURSES` de **20 cours** (`pc-course-01` à `pc-course-20`).
   - Les **Cours 01 à 09** ont le statut `populated` (complets avec activité de découverte `discoveryActivity`, sections structurées, schémas SVG `Course01Schemas.tsx`, exercices corrigés, résumé, schéma-bilan unique et glossaire trilingue).
   - Les **Cours 10 à 20** sont actuellement des emplacements structurés (`status: 'awaiting_content'`) créés via `createCourseSlot(...)`.
2. **Rendu des cours (`src/components/physics/PhysicsCourseView.tsx` & `PhysicsChemistryBlocks.tsx`)** :
   - Chaque section de cours affiche une liste de blocs typés `PhysicsContentBlock` (`definition`, `observation`, `experience`, `explanation`, `schema`, `table`, `formula`, `example`, `activity`, `bilingual-box`, `common-mistakes`, `discovery`, et `simulation`).
   - Thématisation dynamique par domaine via `domainThemeTokens.tsx` (`PhysicsDomainThemeProvider` / `usePhysicsDomainTheme`) : vert sarcelle (`#0F766E`) pour le Domaine 01 (*Matière*), orange/jaune électrique (`#D97706` / `#EA580C`) pour le Domaine 02 (*Énergie*), bleu (`#1D4ED8`) pour le Domaine 03 (*Électricité*), violet (`#6D28D9`) pour le Domaine 04 (*Optique*).
   - Composants dédiés au Domaine 02 dans `EnergySpecificComponents.tsx` (`EnergyInteractiveChainSimulator`, `EnergyCircuitAndConverterBlock`, `EnergyKeyFormulaBlock`, `EnergyAttentionUnitsBox`).
3. **Système actuel de simulation (`src/components/physics/simulations/`)** :
   - `types.ts` : interfaces `PhysicsSimulationBlockData`, `SimulationRuntimeState<TMetrics>`, `SimulationScientificModel<TMetrics>`, `SimulationPedagogicalContent`, `SimulationRegistryEntry`.
   - `useSimulationEngine.ts` : fonctions pures de transition d'état (`createInitialSimulationState`, `startSimulationState`, `pauseSimulationState`, `resetSimulationState`, `stepSimulationByDeltaSeconds`, `jumpToSimulationProgress`) + hook React gérant `requestAnimationFrame`, `IntersectionObserver` (pause hors-écran) et `prefers-reduced-motion`.
   - `registry.ts` : registre associant `'electrolysis-water'` à son modèle, sa pédagogie et son composant `StageComponent`.
   - `SimulationScientifique.tsx` : conteneur générique (en-tête, sélecteurs Exploration/Guidé et Macro/Micro/Combiné, barre de contrôles Play/Pause/Reset/Vitesse/Reduced Motion, curseur temporel, observations dynamiques, questions guidées, `SimulationErrorBoundary` et `SimulationFallbackView`).
   - `pilots/electrolysisWaterModel.ts` & `pilots/ElectrolysisWaterStage.tsx` : modèle déterministe et scène SVG du pilote du Cours 02 (*Électrolyse de l'eau*).
   - `__tests__/electrolysisSimulation.test.ts` : 9 suites de tests automatisés vérifiant le modèle, le moteur et l'absence de régression.

---

### B. Ce qui est déjà correct

1. **Séparation Modèle / Moteur / Vue sur le pilote** : `electrolysisWaterModel.ts` est 100 % pur et déterministe (aucun JSX, aucun effet de bord, validation mathématique stricte de $V(\text{H}_2) = 2 \times V(\text{O}_2)$ et de la conservation de $20\text{ H}$ et $10\text{ O}$).
2. **Moteur temporel robuste (`useSimulationEngine.ts`)** :
   - Boucle `requestAnimationFrame` proprement nettoyée.
   - Pause automatique hors du viewport via `IntersectionObserver`.
   - Support natif et manuel de `prefers-reduced-motion` avec avancement par paliers pédagogiques ($0\% \rightarrow 50\% \rightarrow 100\%$).
   - Indépendance entre la vitesse d'animation ($0.5\times, 1\times, 1.5\times, 2\times$) et les lois scientifiques.
3. **Intégration non-intrusive dans les cours** : le bloc `{ kind: 'simulation', data: PhysicsSimulationBlockData }` permet d'insérer une simulation à l'endroit pédagogique exact d'une section sans alourdir `physicsChemistryCoursesData.ts`.
4. **Résilience (ErrorBoundary + Fallback)** : en cas d'erreur de rendu ou d'identifiant non encore implémenté, le cours ne plante jamais et affiche une carte de synthèse statique.
5. **Bilinguisme RTL/LTR** : isolation stricte des formules, équations, unités et graphiques en `dir="ltr"` au sein de l'interface arabe `dir="rtl"`.

---

### C. Ce qui doit être modifié (et G. Corrections nécessaires du pilote électrolyse)

L'audit croisé de `SimulationScientifique.tsx`, `types.ts` et `useSimulationEngine.ts` révèle **6 points précis** où la logique spécifique au Cours 02 (*Électrolyse de l'eau*) a fuité dans le moteur générique ou limite l'ajout d'autres familles de simulations :

1. **Fuite 1 — Bandeau de démarche scientifique codé en dur dans `SimulationScientifique.tsx` (lignes 284–290)** :
   - Actuellement codé en dur dans le composant générique : `2. لاحظ الفقاعات` (*Observer les bulles*), `3. قِس الحجمين` (*Mesurer les deux volumes*), `4. قارن (2 : 1)` (*Comparer 2:1*), `5. استنتج المعادلة`.
   - **Correction** : déplacer ces 5 libellés d'étapes dans `SimulationPedagogicalContent.scientificSteps` avec des libellés génériques par défaut (`1. شغّل وغيّر العوامل`, `2. لاحظ الظاهرة`, `3. قِس المقادير`, `4. قارن النتائج`, `5. استنتج القانون`).
2. **Fuite 2 — Libellés du bouton Démarrer et du curseur codés en dur dans `SimulationScientifique.tsx` (lignes 348 & 434)** :
   - Le bouton principal affiche en dur `'تشغيل التيار (Démarrer)'` et le slider a `aria-label="شريط تقدم التحليل الكهربائي"`.
   - **Correction** : rendre ces textes configurables via `pedagogy.controlLabels` (avec défaut générique `'تشغيل المحاكاة (Démarrer)'` et `'شريط تقدم المحاكاة'`), et définir `'تشغيل التيار (Démarrer)'` uniquement dans `electrolysisPedagogicalContent`.
3. **Fuite 3 — Badge de conclusion codé en dur dans `SimulationScientifique.tsx` (ligne 531)** :
   - La carte « استنتج · Conclusion scientifique » affiche en dur `V(H₂) = 2 × V(O₂)` au lieu de lire `pedagogy.keyRelationBadgeLtr` (ou `pedagogy.volumeRelationLtr`).
   - **Correction** : remplacer la chaîne en dur par `{pedagogy.keyRelationBadgeLtr || pedagogy.volumeRelationLtr}`.
4. **Fuite 4 — Fallback par défaut spécifique à l'électrolyse dans `SimulationScientifique.tsx` (lignes 738–750)** :
   - Si une simulation n'est pas trouvée dans le registre, le fallback affiche en dur `2 H₂O → 2 H₂ + O₂` et `c02-electrolysis-apparatus`.
   - **Correction** : utiliser un fallback générique neutre basé sur `blockData` (ou le `fallback` déclaré dans `blockData`).
5. **Absence de support des paramètres scientifiques manipulables (`TParams`) dans `types.ts` & `useSimulationEngine.ts`** :
   - Actuellement, `computeMetricsAtProgress(progress)` ne dépend que du temps/progression. Or les simulations de type **Paramètres** (Cours 06 : température, surface de contact), **Combustion** (Cours 04 : ouverture de la virole d'air / apport en $\text{O}_2$), ou **Bilan énergétique** (Cours 09 : dispositif, énergie reçue $E_{\text{reçue}}$) nécessitent des paramètres manipulables décrits par des données (`PhysicsSimulationParameter`).
   - **Correction** : étendre `SimulationScientificModel<TMetrics, TParams>` et `SimulationRuntimeState<TMetrics, TParams>` avec un dictionnaire optionnel `params: TParams`, une liste déclarative `parameters?: PhysicsSimulationParameter[]`, et l'action `setParameter(paramId, value)` dans `useSimulationEngine` (tout en gardant 100 % de rétrocompatibilité avec les modèles sans paramètres comme `electrolysisScientificModel`).
6. **Affichage conditionnel du sélecteur `Macro / Micro / Combiné`, thématisation par domaine et impression PDF** :
   - Ajouter `supportedRepresentations?: SimulationRepresentationMode[]` dans `SimulationPedagogicalContent` pour n'afficher le sélecteur Macro/Micro que lorsque le modèle microscopique est pertinent (ex. Chimie C02, C03, C04, C06), et le masquer pour les systèmes énergétiques macroscopiques (C07, C08, C09).
   - Connecter `SimulationScientifique.tsx` à `usePhysicsDomainTheme()` pour que les simulations du Domaine 01 utilisent le thème émeraude (`#0F766E`) et celles du Domaine 02 le thème orange énergétique (`#D97706`).
   - Ajouter une vue/état d'impression propre pour l'export PDF (masquage `.no-pdf` de la barre de boutons interactifs lors de l'export PDF tout en conservant le schéma SVG, les mesures et la conclusion).

---

## 2. Design & Expérience Utilisateur

### D. Audit des 20 cours existants dans le projet

Lecture directe de `src/data/physicsChemistryCoursesData.ts` :

1. **Domaine 01 — المادة وتحولاتها (Matière et ses transformations) [6 cours publiés : C01 → C06]** :
   - **Cours 01 (`pc-course-01`, `populated`)** : *الفرد الكيميائي، النوع الكيميائي، الجملة الكيميائية* (*Entité chimique, espèce chimique et système chimique*).
     - Contenu actuel : distinction conceptuelle macroscopique (espèce) vs microscopique (entité : atome, molécule, ion) et système chimique. Les 5 schémas comparatifs (`c01-*`) suffisent pleinement : il n'y a ni évolution temporelle ni loi dynamique à manipuler.
   - **Cours 02 (`pc-course-02`, `populated`)** : *التحليل الكهربائي للماء* (*Électrolyse de l’eau*).
     - Contenu actuel : expérience d'électrolyse, identification de $\text{H}_2$ et $\text{O}_2$, rapport volumique $2:1$, équation $2\text{ H}_2\text{O} \rightarrow 2\text{ H}_2 + \text{O}_2$. Possède déjà la simulation pilote `electrolysis-water`.
   - **Cours 03 (`pc-course-03`, `populated`)** : *احتراق الكربون في الهواء* (*Combustion du carbone dans l’air*).
     - Contenu actuel : incandescence du carbone dans $\text{O}_2$, formation de $\text{CO}_2$, test à l'eau de chaux, réarrangement atomique $\text{C} + \text{O}_2 \rightarrow \text{CO}_2$, triangle du feu.
   - **Cours 04 (`pc-course-04`, `populated`)** : *الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني* (*Combustion complète et combustion incomplète d’un hydrocarbure*).
     - Contenu actuel : brûleur à gaz butane ($\text{C}_4\text{H}_{10}$), rôle déterminant de l'admission d'air (quantité de $\text{O}_2$), flamme bleue ($\text{CO}_2 + \text{H}_2\text{O}$) vs flamme jaune fuligineuse ($\text{CO} + \text{C} + \text{CO}_2 + \text{H}_2\text{O}$), danger du monoxyde de carbone ($\text{CO}$).
   - **Cours 05 (`pc-course-05`, `populated`)** : *موازنة معادلة التفاعل الكيميائي* (*Équilibrer une équation de réaction chimique*).
     - Contenu actuel : loi de conservation de la masse (Lavoisier) et des atomes (Dalton), coefficients stœchiométriques devant les formules vs interdiction de modifier les indices.
   - **Cours 06 (`pc-course-06`, `populated`)** : *العوامل المؤثرة في التفاعل الكيميائي* (*Les facteurs influençant une réaction chimique*).
     - Contenu actuel : vitesse de réaction, influence de la température (agitation thermique et fréquence des chocs efficaces), influence de la surface de contact (comprimé entier vs poudre), composition du mélange initial et catalyseur.
2. **Domaine 02 — الطاقة (Énergie) [3 cours publiés : C07 → C09 + 1 slot : C10]** :
   - **Cours 07 (`pc-course-07`, `populated`)** : *السلسلة الوظيفية* (*La chaîne fonctionnelle*).
     - Contenu actuel : fonction globale, acteurs techniques en bulles, verbes d'état (*أفعال الحالة*) et verbes d'action (*أفعال الأداء*).
   - **Cours 08 (`pc-course-08`, `populated`)** : *السلسلة الطاقوية* (*La chaîne énergétique*).
     - Contenu actuel : formes d'énergie, modes de stockage ($E_c, E_p, E_i$) et modes de transfert ($W, W_e, E_r, Q$), transfert utile vs transfert dissipé dans le milieu extérieur.
   - **Cours 09 (`pc-course-09`, `populated`)** : *الحصيلة الطاقوية* (*Le bilan énergétique*).
     - Contenu actuel : énergie reçue ($E_{\text{reçue}}$), énergie utile ($E_{\text{utile}}$), énergie dissipée ($E_{\text{dissipée}}$), principe de conservation ($E_{\text{reçue}} = E_{\text{utile}} + E_{\text{dissipée}}$), rendement énergétique $\eta(\%) = \frac{E_{\text{utile}}}{E_{\text{reçue}}} \times 100$.
   - **Cours 10 (`pc-course-10`, `awaiting_content`)** : *الدرس 10 — الطاقة* (prévu dans le programme 3AM : *استطاعة التحويل الطاقوي — Puissance énergétique $P = E / t$*).
3. **Domaine 03 — الظواهر الكهربائية (Phénomènes électriques) [5 slots : C11 → C15]** :
   - **Cours 11 à 15 (`pc-course-11` à `pc-course-15`, `awaiting_content`)** : emplacements prêts pour les cours d'électricité 3AM (courant continu, intensité $I$, tension $U$, résistance $R$ et loi d'Ohm $U = R \times I$, puissance électrique $P = U \times I$).
4. **Domaine 04 — الظواهر الضوئية (Phénomènes lumineux) [5 slots : C16 → C20]** :
   - **Cours 16 à 20 (`pc-course-16` à `pc-course-20`, `awaiting_content`)** : emplacements prêts pour les cours d'optique 3AM (spectre de la lumière blanche, synthèse additive RVB, synthèse soustractive CMJ, filtres colorés et vision des objets).

---

### E. Matrice des simulations recommandées (20 cours)

Classification obligatoire selon les 4 niveaux :
- **Niveau A** : Simulation indispensable (phénomène dynamique, paramétrique ou microscopique difficile à saisir sans manipulation).
- **Niveau B** : Simulation fortement recommandée (apporte une forte valeur ajoutée quantitative ou comparative).
- **Niveau C** : Animation / visualisation interactive légère (une simulation lourde serait excessive).
- **Niveau D** : Figure statique suffisante (ne pas ajouter de simulation).

| Cours | Statut actuel | Notion exacte du cours | Difficulté pédagogique | Visualisation interactive nécessaire ? | Type recommandé | Niveau (A/B/C/D) | Interactivité | Priorité | Justification pédagogique |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **C01** | `populated` | الفرد الكيميائي، النوع الكيميائي، الجملة الكيميائية | Distinguer l'échelle microscopique (1 entité) de l'échelle macroscopique (collection d'entités) | **Non** (les schémas comparatifs Macro/Micro suffisent) | Figure statique (existante) | **Niveau D** | Aucune | **P3** | Notion taxinomique et descriptive ; aucune loi dynamique ni variable temporelle à manipuler. |
| **C02** | `populated` | التحليل الكهربائي للماء (*Électrolyse de l'eau*) | Relier l'accumulation macroscopique des gaz ($V(\text{H}_2) = 2 V(\text{O}_2)$) à la dissociation microscopique ($2\text{ H}_2\text{O} \rightarrow 2\text{ H}_2 + \text{O}_2$) | **Oui** | **A. Laboratoire virtuel + B. Modèle micro + F. Graphe** | **Niveau A** | Forte (Play/Pause, Vitesse, Macro/Micro, Curseur) | **Existante (Pilote P0)** | Impossible d'observer simultanément en classe la mesure continue des volumes, le graphe $V=f(t)$ et le réarrangement atomique. |
| **C03** | `populated` | احتراق الكربون في الهواء (*Combustion du carbone*) | Comprendre que le carbone ne disparaît pas mais s'unit à $\text{O}_2$ pour former $\text{CO}_2$ | **Non / Légère** | Figure statique séquentielle (existante `c03-*`) | **Niveau D** | Faible | **P3** | Réaction à une seule voie ($\text{C} + \text{O}_2 \rightarrow \text{CO}_2$). LeCours 04 couvre déjà de façon beaucoup plus riche la dynamique de combustion. |
| **C04** | `populated` | الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني | Comprendre comment un seul paramètre (ouverture d'air / apport en $\text{O}_2$) bascule la flamme, les produits ($\text{CO}_2$ vs $\text{CO} + \text{C}$) et le risque d'intoxication | **Oui** | **C. Simulation de paramètres + A. Laboratoire + B. Modèle micro** | **Niveau A** | Forte (Réglage admission d'air $\text{O}_2$, tests eau de chaux / $\text{CuSO}_4$ / dépôt noir, vue moléculaire) | **P0** | L'élève manipule l'ouverture de la virole d'air du brûleur et observe en direct la transition flamme bleue $\leftrightarrow$ flamme jaune, l'apparition de $\text{CO}$ et de la suie $\text{C}$. |
| **C05** | `populated` | موازنة معادلة التفاعل الكيميائي (*Équilibrage d'équations*) | Ajuster les coefficients stœchiométriques pour égaliser le nombre d'atomes de chaque élément sans toucher aux indices | **Oui** | **B. Modèle microscopique + Balance interactive d'atomes** | **Niveau B** | Forte (Manipulation des coefficients stœchiométriques sur 3 équations cibles avec comptage visuel d'atomes) | **P1** | Permet à l'élève de tester concrètement l'effet d'un coefficient devant une molécule ($\text{H}_2\text{O}$, $\text{O}_2$, $\text{CH}_4$, $\text{C}_4\text{H}_{10}$) et de voir la balance des atomes s'équilibrer. |
| **C06** | `populated` | العوامل المؤثرة في التفاعل الكيميائي (*Facteurs cinétiques*) | Visualiser l'effet de la température ($T$) et de la surface de contact (comprimé vs poudre) sur l'agitation thermique, la fréquence des chocs efficaces et la courbe d'avancement | **Oui** | **C. Simulation de paramètres + B. Modèle micro + F. Graphe dynamique** | **Niveau A** | Forte (Choix Température $10^\circ\text{C} / 25^\circ\text{C} / 50^\circ\text{C}$, État compact vs poudre, comparaison des courbes) | **P0** | Les « chocs efficaces » entre particules sont invisibles à l'œil nu ; la simulation relie directement le paramètre macroscopique ($T$, division) à la fréquence des collisions et à la pente du graphe. |
| **C07** | `populated` | السلسلة الوظيفية (*La chaîne fonctionnelle*) | Identifier les acteurs techniques et distinguer verbe d'état (سهم/فقاعة) vs verbe d'action | **Oui (Légère)** | **D. Système technique interactif** (déjà intégré via `EnergyInteractiveChainSimulator`) | **Niveau C** | Moyenne | **P2 (Déjà couvert)** | Le mini-simulateur `EnergyInteractiveChainSimulator` en mode fonctionnel couvre déjà ce besoin sans alourdir le cours. |
| **C08** | `populated` | السلسلة الطاقوية (*La chaîne énergétique*) | Suivre le flux énergétique entre réservoirs ($E_c, E_p, E_i$) et transferts ($W, W_e, E_r, Q$) vers le milieu extérieur | **Oui (Légère)** | **E. Chaîne énergétique interactive** (déjà intégré via `EnergyInteractiveChainSimulator`) | **Niveau C** | Moyenne | **P2 (Déjà couvert)** | Déjà pris en charge par `EnergyInteractiveChainSimulator` (3 systèmes : Lampe, Ventilateur, Chute d'eau + Dynamo). |
| **C09** | `populated` | الحصيلة الطاقوية (*Le bilan énergétique & rendement $\eta$*) | Comprendre la répartition quantitative $E_{\text{reçue}} = E_{\text{utile}} + E_{\text{dissipée}}$ et l'évolution du rendement $\eta = \frac{E_{\text{utile}}}{E_{\text{reçue}}} \times 100$ selon le convertisseur | **Oui** | **E. Bilan énergétique quantitatif + C. Simulation de paramètres + F. Graphe** | **Niveau A** | Forte (Sélection du convertisseur, variation de $E_{\text{reçue}}$, flux énergétique proportionnel, calcul et jauge de $\eta$) | **P0** | Permet à l'élève de manipuler $E_{\text{reçue}}$ sur différents appareils (Lampe $\eta=30\%$, Moteur $\eta=75\%$, Chauffe-eau $\eta=90\%$), de vérifier que $E_{\text{utile}} + E_{\text{dissipée}} = E_{\text{reçue}}$ à tout instant et que l'énergie dissipée ne disparaît jamais. |
| **C10** | `awaiting_content` | الدرس 10 — الطاقة (*Puissance et énergie $E = P \times t$*) | Relier la puissance $P$ ($\text{W}$), la durée $t$ et l'énergie transférée $E$ ($\text{J}$ / $\text{Wh}$) | À activer lors de la rédaction du C10 | **C. Paramètres + F. Graphe $E=f(t)$** | **Niveau B** | Moyenne | **P2 (Différé C10)** | Cours non encore rédigé (`awaiting_content`). |
| **C11–C15** | `awaiting_content` | الدروس 11 → 15 — الظواهر الكهربائية (*Loi d'Ohm $U = R \cdot I$, etc.*) | Caractéristique $U = f(I)$ d'un résistor et mesure multimètre | À activer lors de la rédaction C11–C15 | **A. Laboratoire virtuel + F. Graphe $U=f(I)$** | **Niveau A (pour Loi d'Ohm)** / **D (autres)** | Forte sur Loi d'Ohm | **P2 (Différé C11–15)** | Cours non encore rédigés (`awaiting_content`). Le framework supporte déjà leur future intégration via `SimulationScientificModel` + graphe dynamique. |
| **C16–C20** | `awaiting_content` | الدروس 16 → 20 — الظواهر الضوئية (*Dispersion, RVB/CMJ, Filtres*) | Synthèse additive/soustractive et absorption par filtres colorés | À activer lors de la rédaction C16–C20 | **G. Optique interactive (Filtres & RVB)** | **Niveau B** | Moyenne | **P2 (Différé C16–20)** | Cours non encore rédigés (`awaiting_content`). |

---

### F. Synthèse du classement par priorité (P0 / P1 / P2 / P3)

#### 1. Pilote de référence existant (à isoler et valider dans le framework)
- **`electrolysis-water` (Cours 02 — التحليل الكهربائي للماء)** : **Pilote P0 existant** — Modèle et rendu déjà opérationnels ; nécessite uniquement l'extraction des 4 libellés codés en dur dans `SimulationScientifique.tsx`.

#### 2. Priorité P0 — Indispensables pédagogiquement sur les cours publiés (à développer dans cette mission)
1. **`hydrocarbon-combustion` (Cours 04 — الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني)** :
   - **Pourquoi P0** : C'est le cœur expérimental du Domaine 01 avec l'électrolyse. L'élève ajuste le **paramètre d'ouverture de l'arrivée d'air (apport en $\text{O}_2$ de $20\%$ à $100\%$)** sur le brûleur de butane ($\text{C}_4\text{H}_{10}$) et observe simultanément :
     - Au niveau **macroscopique** : couleur et stabilité de la flamme (bleue chaude vs jaune éclairante), dépôt de suie noire ($\text{C}$) sous le bécher, buée d'eau ($\text{H}_2\text{O}$), trouble de l'eau de chaux ($\text{CO}_2$) et détecteur de monoxyde de carbone ($\text{CO}$).
     - Au niveau **microscopique simplifié** : bilan des molécules formées montrant la conservation des atomes ($\text{C}, \text{H}, \text{O}$) et l'apparition de $\text{CO}$ et $\text{C}$ lorsque $\text{O}_2$ est insuffisant.
     - Au niveau **graphique** : évolution des proportions des produits ($\text{CO}_2$ utile vs $\text{CO} + \text{C}$ imbrûlés) en fonction de l'apport en dioxygène.
2. **`reaction-factors-kinetics` (Cours 06 — العوامل المؤثرة في التفاعل الكيميائي)** :
   - **Pourquoi P0** : Répond exactement aux critères « phénomène invisible à l'œil nu (chocs efficaces) » + « influence d'un paramètre » + « évolution temporelle ».
   - L'élève manipule **deux paramètres scientifiques réels** :
     - **Température de l'eau ($T \in \{10\,^\circ\text{C}, 25\,^\circ\text{C}, 50\,^\circ\text{C}\}$)** ;
     - **État de division du réactif solide (Surface de contact : Comprimé entier $1\times$ vs Fragmenté $2\times$ vs Poudre fine $4\times$)**.
   - Il observe en temps réel :
     - **Vue macroscopique** : intensité de l'effervescence et dissolution progressive du solide dans le bécher.
     - **Vue microscopique simplifiée** : vitesse d'agitation thermique des particules et compteur de **collisions efficaces (Chocs efficaces/s)**.
     - **Graphique dynamique** : courbe d'avancement de la réaction $x(t)$ comparée à la courbe de référence ($25\,^\circ\text{C}$, comprimé entier).
3. **`energy-balance-efficiency` (Cours 09 — الحصيلة الطاقوية والمردود الطاقوي $\eta$)** :
   - **Pourquoi P0** : Point culminant quantitatif du Domaine 02 (*Énergie*).
   - L'élève choisit le **système convertisseur** (*Lampe à incandescence $\eta=30\%$*, *Lampe LED $\eta=80\%$*, *Moteur électrique $\eta=75\%$*, *Chauffe-eau électrique $\eta=90\%$*, *Ventilateur $\eta=65\%$*) et ajuste **l'énergie électrique reçue $E_{\text{reçue}}$ ($100\text{ J} \rightarrow 2000\text{ J}$)**.
   - Il observe en temps réel :
     - Le **diagramme de flux énergétique quantitatif (type Sankey / Bilan 3AM)** où la largeur des flèches est mathématiquement proportionnelle à $E_{\text{reçue}}$, $E_{\text{utile}}$ et $E_{\text{dissipée}}$ ;
     - La vérification continue de l'invariant de conservation : $E_{\text{reçue}} = E_{\text{utile}} + E_{\text{dissipée}}$ ;
     - Le graphique comparatif empilé ($E_{\text{utile}}$ vs $E_{\text{dissipée}}$) et le calcul explicite du rendement $\eta(\%) = \frac{E_{\text{utile}}}{E_{\text{reçue}}} \times 100$.

#### 3. Priorité P1 — Forte valeur pédagogique (optionnelle ou seconde vague)
- **`equation-balancing-lab` (Cours 05 — موازنة معادلة التفاعل الكيميائي)** : atelier interactif d'équilibrage stœchiométrique avec balance visuelle des atomes.

#### 4. Priorité P2 — Déjà couverts par des composants légers ou en attente du contenu des cours C10–C20
- **Cours 07 & Cours 08** : déjà équipés du mini-simulateur `EnergyInteractiveChainSimulator` et du bloc `EnergyCircuitAndConverterBlock`.
- **Cours 10 à 20** : en attente de leur contenu de cours (`status: 'awaiting_content'`).

#### 5. Priorité P3 — Figure statique préférable (Aucune simulation à créer)
- **Cours 01** (*Entité, espèce, système chimique*) et **Cours 03** (*Combustion du carbone*) : les schémas statiques et tableaux comparatifs actuels sont pédagogiquement optimaux et évitent toute surcharge cognitive.

---

## 3. Architecture Technique & Plan d'Exécution

### H. Architecture cible du « Simulation Framework 3AM Physique-Chimie »

```text
                           PHYSIQUE-CHIMIE 3AM
                                    │
                                    ▼
             SimulationScientifique.tsx (Shell + ErrorBoundary)
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
1. Scientific Model        2. Simulation Engine        3. Stage Renderer
(Modèle pur & déterministe) (useSimulationEngine.ts)    (StageComponent SVG)
- nominalDurationSeconds   - status / progress / speed - Vue Macro / Micro
- parameters[]             - params: TParams           - Diagrammes / Flux
- getInitialParameters()   - setParameter(id, val)     - Mesures temps réel
- computeMetricsAtProgress - RAF + IntersectionObs     - Graphe dynamique SVG
- validateInvariants()     - prefers-reduced-motion
        │                           │                           │
        └───────────────────────────┼───────────────────────────┘
                                    │
                                    ▼
                        4. Pedagogical Layer
                        - scientificSteps (5 étapes)
                        - dynamicObservations[]
                        - guidedQuestions[] (Mode Guidé)
                        - conclusionArabic + formules LTR
                        - Fallback statique & Vue Print/PDF
```

#### Évolutions Data-Driven de `src/components/physics/simulations/types.ts` (sans sur-architecturer)

1. **Familles de simulations (`SimulationCategory`)** :
   ```ts
   export type SimulationCategory =
     | 'laboratory'          // A. Laboratoire virtuel (ex: C02 Électrolyse)
     | 'microscopic-model'   // B. Modèle microscopique
     | 'parameter-sim'       // C. Simulation de paramètres (ex: C04 Combustion, C06 Cinétique)
     | 'technical-system'    // D. Système technique interactif
     | 'energy-chain-bilan'  // E. Chaîne & Bilan énergétique (ex: C09 Bilan & Rendement)
     | 'dynamic-graph'       // F. Graphique dynamique
     | 'interactive-optics'; // G. Optique interactive
   ```
2. **Paramètres scientifiques manipulables (`PhysicsSimulationParameter`)** :
   ```ts
   export interface PhysicsSimulationParameterOption {
     value: number;
     labelArabic: string;
     labelFrench?: string;
   }

   export interface PhysicsSimulationParameter {
     id: string;
     labelArabic: string;
     labelFrench?: string;
     unit?: string;
     min: number;
     max: number;
     step: number;
     defaultValue: number;
     /** Si défini, affiche des boutons de paliers explicites en plus ou à la place du slider */
     presets?: PhysicsSimulationParameterOption[];
   }
   ```
3. **Extension rétrocompatible de `SimulationScientificModel<TMetrics, TParams>` et `SimulationRuntimeState<TMetrics, TParams>`** :
   - `parameters?: PhysicsSimulationParameter[]`
   - `getInitialParameters?: () => TParams`
   - `computeMetricsAtProgress: (progress: number, params?: TParams) => TMetrics`
   - `validateInvariants: (metrics: TMetrics, progress: number, params?: TParams) => boolean`
   - Dans `SimulationRuntimeState<TMetrics, TParams>` : ajout de `params: TParams`.
   - Dans `useSimulationEngine` : ajout de `setParameter(paramId: keyof TParams, value: number)` qui recalcule immédiatement `metrics` et `history` de façon purement déterministe.
4. **Découplage complet de `SimulationPedagogicalContent`** :
   - Ajout de `category?: SimulationCategory`
   - Ajout de `supportedRepresentations?: SimulationRepresentationMode[]` (par défaut `['macroscopic', 'microscopic', 'both']` ; peut être `['macroscopic']` pour un bilan énergétique où le mode micro n'est pas pertinent)
   - Ajout de `scientificSteps?: { ar: string; fr: string }[]`
   - Ajout de `controlLabels?: { startArabic?: string; progressAriaLabel?: string }`
   - Ajout de `keyRelationBadgeLtr?: string` (remplace l'usage codé en dur de `V(H₂) = 2 × V(O₂)` dans `SimulationScientifique.tsx`)

---

### I. Plan d'implémentation (Ordre d'exécution Phases 4 → 10)

Une fois ce plan validé, l'exécution suivra strictement cet ordre :

1. **Phase 4 — Architecture & Découplage du Moteur (`types.ts`, `useSimulationEngine.ts`, `SimulationScientifique.tsx`)** :
   - Supprimer les 4 fuites spécifiques à l'électrolyse dans `SimulationScientifique.tsx` et les déplacer dans `electrolysisPedagogicalContent` (`pilots/electrolysisWaterModel.ts`).
   - Ajouter le support générique des paramètres scientifiques manipulables (`PhysicsSimulationParameter`, `params`, `setParameter`) dans `types.ts`, `useSimulationEngine.ts` et dans le panneau de contrôles de `SimulationScientifique.tsx`.
   - Connecter `SimulationScientifique.tsx` à `usePhysicsDomainTheme()` et gérer proprement `supportedRepresentations` ainsi que le rendu d'impression PDF (`.no-pdf` sur les boutons d'action, conservation du visuel et des mesures).
2. **Phase 5 & Phase 6 — Développement des 3 Simulations P0 (`pilots/`)** :
   - **Simulation P0 n°1 (Cours 04) : `hydrocarbon-combustion`**
     - `pilots/hydrocarbonCombustionModel.ts` + `pilots/HydrocarbonCombustionStage.tsx` (réglage de l'apport en $\text{O}_2$, flamme bleue vs jaune, tests chimiques $\text{CuSO}_4$ / eau de chaux / suie / détecteur $\text{CO}$, vue moléculaire $\text{C}_4\text{H}_{10} + \text{O}_2$ et graphe des produits).
   - **Simulation P0 n°2 (Cours 06) : `reaction-speed`**
     - `pilots/reactionKineticsModel.ts` + `pilots/ReactionKineticsStage.tsx` (paramètres Température $10/25/50\,^\circ\text{C}$ et Surface de contact Comprimé/Fragmenté/Poudre, vue macroscopique d'effervescence, vue microscopique des chocs efficaces, et graphe dynamique d'avancement $x(t)$).
   - **Simulation P0 n°3 (Cours 09) : `energy-balance`**
     - `pilots/energyBalanceModel.ts` + `pilots/EnergyBalanceStage.tsx` (paramètres Type de convertisseur et Énergie reçue $E_{\text{reçue}}$, diagramme de flux quantitatif $E_{\text{reçue}} = E_{\text{utile}} + E_{\text{dissipée}}$, jauge et graphe du rendement $\eta$).
3. **Phase 7 — Enregistrement (`registry.ts`) & Intégration pédagogique dans les Cours 04, 06 et 09 (`physicsChemistryCoursesData.ts`)** :
   - Enregistrer les 3 nouvelles simulations dans `registry.ts` sans toucher à la logique interne du moteur.
   - Insérer chaque bloc `{ kind: 'simulation', data: ... }` à l'emplacement pédagogique exact dans `COURSE_04`, `COURSE_06` et `COURSE_09` (et corriger au passage le type `'experiment'` $\rightarrow$ `'experience'` dans `COURSE_06`).
4. **Phase 8 & Phase 9 — Tests à 3 niveaux (Scientifique + Moteur + Intégration) & Build** :
   - Étendre `src/components/physics/simulations/__tests__/electrolysisSimulation.test.ts` pour tester :
     - le pilote `electrolysis-water` ;
     - les 3 nouveaux modèles scientifiques P0 (`hydrocarbon-combustion`, `reaction-speed`, `energy-balance`) et leurs invariants (conservation des atomes, $E_{\text{reçue}} = E_{\text{utile}} + E_{\text{dissipée}}$, $\eta \in [0, 100]$, monotonie de la vitesse avec $T$ et la surface) ;
     - les transitions du moteur avec paramètres (`setSimulationParameterState`) ;
     - le registre et l'intégrité des 20 cours.
5. **Phase 10 — Documentation développeur (`src/components/physics/simulations/README.md`)** :
   - Documenter pas à pas comment créer un modèle scientifique, un renderer SVG, configurer la couche pédagogique, enregistrer la simulation dans `registry.ts`, l'intégrer dans un cours et écrire ses tests unitaires.
