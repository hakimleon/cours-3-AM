# Documentation Technique — Simulation Framework 3AM Physique-Chimie

Cette documentation décrit l'architecture du **Simulation Framework 3AM Physique-Chimie** et explique comment ajouter une nouvelle simulation scientifique interactive sans modifier le moteur central (`SimulationScientifique` / `useSimulationEngine`).

---

## 1. Architecture du système

Le framework est situé dans `src/components/physics/simulations/` et sépare strictement les responsabilités :

```text
src/components/physics/simulations/
├── types.ts                                    # Contrats TypeScript génériques (Modèle, Paramètres, État, Pédagogie, Fallback)
├── useSimulationEngine.ts                      # Moteur d'état pur + hook React (RAF, vitesse, paramètres, reduced-motion)
├── SimulationScientifique.tsx                  # Conteneur UI générique (Paramètres, Contrôles, Exploration, Guidé, Print/PDF)
├── registry.ts                                 # Registre centralisé des simulations actives
├── pilots/
│   ├── electrolysisWaterModel.ts               # Cours 02 : Modèle scientifique pur + pédagogie (Électrolyse de l'eau)
│   ├── ElectrolysisWaterStage.tsx              # Cours 02 : Scène SVG Macro/Micro + mesures + graphe V = f(t)
│   ├── completeIncompleteCombustionModel.ts    # Cours 04 : Modèle scientifique pur + pédagogie (Combustion complète/incomplète)
│   ├── CompleteIncompleteCombustionStage.tsx   # Cours 04 : Scène SVG Brûleur/Virole d'air + tests chimiques + bilan atomique
│   ├── reactionSpeedModel.ts                   # Cours 06 : Modèle scientifique pur + pédagogie (Température & Surface de contact)
│   ├── ReactionSpeedStage.tsx                  # Cours 06 : Scène SVG Bécher Témoin vs Actif + Chocs efficaces + courbe x(t)
│   ├── energyBalanceModel.ts                   # Cours 09 : Modèle scientifique pur + pédagogie (Bilan énergétique & Rendement η)
│   └── EnergyBalanceStage.tsx                  # Cours 09 : Diagramme de flux énergétique (Sankey 3AM) + conservation + graphe E(t)
└── __tests__/
    └── electrolysisSimulation.test.ts          # 12 suites de tests unitaires et d'invariants scientifiques
```

---

## 2. Simulations enregistrées (Priorité P0)

| Cours | Identifiant (`simulationId`) | Notion scientifique | Paramètres manipulables | Invariants vérifiés |
| :--- | :--- | :--- | :--- | :--- |
| **Cours 02** | `'electrolysis-water'` | التحليل الكهربائي للماء (*Électrolyse de l'eau*) | Temps / Progression, Vitesse ($0.5\times \dots 2\times$), Mode Macro/Micro | $V(\text{H}_2) = 2 \times V(\text{O}_2)$, conservation de $20\text{ H}$ et $10\text{ O}$ |
| **Cours 04** | `'complete-incomplete-combustion'` | الاحتراق التام وغير التام (*Combustion complète vs incomplète*) | `oxygenSupplyPercent` ($20\% \rightarrow 100\%\text{ O}_2$) | Conservation stricte des atomes $\text{C}, \text{H}, \text{O}$ ; apparition de $\text{CO}$ et suie $\text{C}$ si $\text{O}_2$ insuffisant |
| **Cours 06** | `'reaction-speed'` | العوامل المؤثرة في التفاعل الكيميائي (*Facteurs cinétiques*) | `temperatureCelsius` ($10\,^\circ\text{C} \rightarrow 60\,^\circ\text{C}$), `surfaceDivisionFactor` ($\times 1, \times 2, \times 4$) | $x(t) + m_{\text{restant}}(t) = 100\%$ ; croissance monotone de la fréquence des chocs efficaces avec $T$ et $S$ |
| **Cours 09** | `'energy-balance'` | الحصيلة الطاقوية والمردود $\eta$ (*Bilan énergétique & Rendement*) | `deviceType` (Lampe $30\%$, Moteur $70\%$, Chauffe-eau $90\%$, Ventilateur $65\%$), `totalInputEnergyJoules` ($100\text{ J} \rightarrow 2000\text{ J}$) | Conservation stricte $E_{\text{reçue}} = E_{\text{utile}} + E_{\text{dissipée}}$ à tout instant et $\eta(\%) = (E_{\text{utile}} / E_{\text{reçue}}) \times 100$ |

---

## 3. Guide en 6 étapes : Comment ajouter une nouvelle simulation

1. **Créer le modèle scientifique (`pilots/<nom>Model.ts`)** :
   - Implémenter `SimulationScientificModel<TMetrics, TParams>` avec des fonctions **100 % pures et déterministes** (`getInitialMetrics`, `computeMetricsAtProgress`, `validateInvariants`, `extractHistoryValues`).
   - Si l'élève doit manipuler des variables physiques ou chimiques, déclarer `parameters: PhysicsSimulationParameter[]` (avec `min`, `max`, `step`, `defaultValue` et `presets`).
2. **Déclarer le contenu pédagogique (`SimulationPedagogicalContent`)** :
   - Renseigner `titleArabic`, `titleFrench`, `objectiveArabic`, `supportedRepresentations` (`['macroscopic', 'microscopic', 'both']` ou `['macroscopic']`), `scientificSteps`, `dynamicObservations`, `guidedQuestions` (avec `targetProgress` et `targetParams` optionnels) et `fallback`.
3. **Créer la scène graphique (`pilots/<Nom>Stage.tsx`)** :
   - Implémenter `React.FC<SimulationStageProps<TMetrics, TParams>>`.
   - Isoler toutes les formules, équations et mesures en `dir="ltr"` avec `style={{ unicodeBidi: 'isolate' }}`.
   - Respecter `state.reducedMotion` pour l'accessibilité.
4. **Enregistrer dans `registry.ts`** :
   - Ajouter l'identifiant dans `RegisteredSimulationId` (`types.ts`) et dans `simulationRegistry` (`registry.ts`).
5. **Insérer le bloc déclaratif dans le cours (`src/data/physicsChemistryCoursesData.ts`)** :
   - Ajouter `{ kind: 'simulation', data: { id: '...', simulationId: '...' } }` dans la section pertinente du cours.
6. **Ajouter les tests unitaires d'invariants (`__tests__/electrolysisSimulation.test.ts`)** :
   - Exécuter `npx tsx src/components/physics/simulations/__tests__/electrolysisSimulation.test.ts`.
