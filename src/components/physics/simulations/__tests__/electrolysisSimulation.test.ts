import assert from 'node:assert/strict';
import {
  electrolysisPedagogicalContent,
  electrolysisScientificModel,
} from '../pilots/electrolysisWaterModel';
import {
  completeIncompleteCombustionModel,
  completeIncompleteCombustionPedagogicalContent,
} from '../pilots/completeIncompleteCombustionModel';
import {
  reactionSpeedPedagogicalContent,
  reactionSpeedScientificModel,
} from '../pilots/reactionSpeedModel';
import {
  energyBalancePedagogicalContent,
  energyBalanceScientificModel,
} from '../pilots/energyBalanceModel';
import {
  powerConversionPedagogicalContent,
  powerConversionScientificModel,
} from '../pilots/powerConversionModel';
import {
  createInitialSimulationState,
  startSimulationState,
  pauseSimulationState,
  resetSimulationState,
  setSimulationSpeedState,
  setSimulationParameterState,
  stepSimulationByDeltaSeconds,
} from '../useSimulationEngine';
import {
  getSimulationFromRegistry,
  isSimulationRegistered,
  simulationRegistry,
} from '../registry';
import { PHYSICS_CHEMISTRY_COURSES } from '../../../../data/physicsChemistryCoursesData';
import { COURSES_DATA } from '../../../../data/allCoursesData';

/**
 * Suite de tests automatisés du Simulation Framework 3AM Physique-Chimie
 * (Tests 1 à 12 : Moteur + Pilote C02 + Combustion C04 + Cinétique C06 + Bilan énergétique C09 + Non-régression).
 *
 * Exécutable via : `npx tsx src/components/physics/simulations/__tests__/electrolysisSimulation.test.ts`
 */
export function runAllSimulationTests(): void {
  const results: string[] = [];

  // ==========================================================================
  // TEST 1 — INITIALISATION (H₂ = 0, O₂ = 0, état = stopped)
  // ==========================================================================
  {
    const initial = createInitialSimulationState(electrolysisScientificModel);
    assert.equal(initial.status, 'stopped', 'Test 1 : status initial doit être stopped');
    assert.equal(initial.progress, 0, 'Test 1 : progress initial doit être 0');
    assert.equal(initial.metrics.volumeH2, 0, 'Test 1 : volumeH2 initial doit être 0');
    assert.equal(initial.metrics.volumeO2, 0, 'Test 1 : volumeO2 initial doit être 0');
    assert.equal(initial.metrics.ratioH2ToO2, null, 'Test 1 : ratioH2ToO2 initial doit être null');
    assert.equal(
      electrolysisScientificModel.validateInvariants(initial.metrics, initial.progress),
      true,
      'Test 1 : invariants scientifiques valides à t=0'
    );
    results.push('✔ Test 1 — Initialisation C02 (H₂ = 0, O₂ = 0, état = stopped) : OK');
  }

  // ==========================================================================
  // TEST 2 — DÉMARRAGE (Les volumes augmentent)
  // ==========================================================================
  {
    let state = createInitialSimulationState(electrolysisScientificModel);
    state = startSimulationState(state, electrolysisScientificModel);
    assert.equal(state.status, 'running', 'Test 2 : status après start doit être running');

    // Avancer de 2 secondes (20% de 10s à vitesse 1x)
    state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 2);
    assert.ok(state.metrics.volumeH2 > 0, 'Test 2 : volumeH2 doit augmenter après démarrage');
    assert.ok(state.metrics.volumeO2 > 0, 'Test 2 : volumeO2 doit augmenter après démarrage');
    assert.equal(state.metrics.volumeO2, 2, 'Test 2 : à t=2s (1x), volumeO2 = 2 unités');
    assert.equal(state.metrics.volumeH2, 4, 'Test 2 : à t=2s (1x), volumeH2 = 4 unités');
    results.push('✔ Test 2 — Démarrage C02 (les volumes H₂ et O₂ augmentent) : OK');
  }

  // ==========================================================================
  // TEST 3 — PAUSE (Les volumes cessent d'évoluer)
  // ==========================================================================
  {
    let state = createInitialSimulationState(electrolysisScientificModel);
    state = startSimulationState(state, electrolysisScientificModel);
    state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 3); // t = 3s
    const h2BeforePause = state.metrics.volumeH2;
    const o2BeforePause = state.metrics.volumeO2;

    state = pauseSimulationState(state);
    assert.equal(state.status, 'paused', 'Test 3 : status doit être paused');

    // Tenter d'avancer le temps pendant la pause : les volumes ne doivent pas bouger
    state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 4);
    assert.equal(state.metrics.volumeH2, h2BeforePause, 'Test 3 : volumeH2 figé en pause');
    assert.equal(state.metrics.volumeO2, o2BeforePause, 'Test 3 : volumeO2 figé en pause');
    results.push('✔ Test 3 — Pause (les grandeurs cessent d’évoluer) : OK');
  }

  // ==========================================================================
  // TEST 4 — REPRISE (La simulation reprend sans réinitialiser l'état)
  // ==========================================================================
  {
    let state = createInitialSimulationState(electrolysisScientificModel);
    state = startSimulationState(state, electrolysisScientificModel);
    state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 3); // H2 = 6, O2 = 3
    state = pauseSimulationState(state);

    // Reprise
    state = startSimulationState(state, electrolysisScientificModel);
    assert.equal(state.status, 'running', 'Test 4 : status doit redevenir running');
    assert.equal(state.metrics.volumeH2, 6, 'Test 4 : volumeH2 conservé à la reprise (6)');
    assert.equal(state.metrics.volumeO2, 3, 'Test 4 : volumeO2 conservé à la reprise (3)');

    // Avancer encore de 2 secondes (t total = 5s -> H2 = 10, O2 = 5)
    state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 2);
    assert.equal(state.metrics.volumeH2, 10, 'Test 4 : volumeH2 évolue après reprise (10)');
    assert.equal(state.metrics.volumeO2, 5, 'Test 4 : volumeO2 évolue après reprise (5)');
    results.push('✔ Test 4 — Reprise (reprend sans réinitialiser l’état) : OK');
  }

  // ==========================================================================
  // TEST 5 — RESET (Retour exact à H₂ = 0, O₂ = 0, stopped)
  // ==========================================================================
  {
    let state = createInitialSimulationState(electrolysisScientificModel);
    state = startSimulationState(state, electrolysisScientificModel);
    state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 6);
    assert.ok(state.metrics.volumeH2 > 0);

    state = resetSimulationState(state, electrolysisScientificModel);
    assert.equal(state.status, 'stopped', 'Test 5 : status = stopped après reset');
    assert.equal(state.progress, 0, 'Test 5 : progress = 0 après reset');
    assert.equal(state.elapsedTime, 0, 'Test 5 : elapsedTime = 0 après reset');
    assert.equal(state.metrics.volumeH2, 0, 'Test 5 : H₂ = 0 après reset');
    assert.equal(state.metrics.volumeO2, 0, 'Test 5 : O₂ = 0 après reset');
    assert.equal(state.history.length, 1, 'Test 5 : historique réinitialisé');
    results.push('✔ Test 5 — Reset (retour exact à l’état initial) : OK');
  }

  // ==========================================================================
  // TEST 6 — RATIO C02 (Pour toute valeur valide > 0 : H₂ / O₂ = 2)
  // ==========================================================================
  {
    for (let i = 1; i <= 100; i++) {
      const p = i / 100;
      const m = electrolysisScientificModel.computeMetricsAtProgress(p);
      assert.ok(m.volumeO2 > 0, `Test 6 : volumeO2 > 0 pour p=${p}`);
      assert.equal(
        Number((m.volumeH2 / m.volumeO2).toFixed(6)),
        2,
        `Test 6 : rapport H₂ / O₂ strictement égal à 2 pour p=${p}`
      );
      assert.equal(
        electrolysisScientificModel.validateInvariants(m, p),
        true,
        `Test 6 : invariants atomiques et volumiques respectés pour p=${p}`
      );
    }
    results.push('✔ Test 6 — Ratio C02 (H₂ / O₂ = 2 vérifié sur 100 paliers) : OK');
  }

  // ==========================================================================
  // TEST 7 — VITESSE (0.5x, 1x, 1.5x, 2x modifie le temps mais jamais le ratio)
  // ==========================================================================
  {
    const speeds = [0.5, 1, 1.5, 2] as const;
    const progressAfter2Sec: Record<number, number> = {};

    for (const spd of speeds) {
      let state = createInitialSimulationState(electrolysisScientificModel);
      state = setSimulationSpeedState(state, spd);
      state = startSimulationState(state, electrolysisScientificModel);
      state = stepSimulationByDeltaSeconds(state, electrolysisScientificModel, 2);

      progressAfter2Sec[spd] = state.progress;
      assert.equal(
        state.metrics.volumeH2 / state.metrics.volumeO2,
        2,
        `Test 7 : le ratio reste strictement égal à 2 à vitesse ${spd}x`
      );
    }

    assert.ok(
      progressAfter2Sec[0.5] < progressAfter2Sec[1] &&
        progressAfter2Sec[1] < progressAfter2Sec[1.5] &&
        progressAfter2Sec[1.5] < progressAfter2Sec[2],
      'Test 7 : la vitesse accélère proportionnellement la progression temporelle'
    );
    results.push('✔ Test 7 — Vitesse (0.5×, 1×, 1.5×, 2× modifie le temps sans altérer les lois) : OK');
  }

  // ==========================================================================
  // TEST 8 — COURS 04 : COMBUSTION COMPLÈTE VS INCOMPLÈTE (Paramètre O₂ & Conservation)
  // ==========================================================================
  {
    let state = createInitialSimulationState(completeIncompleteCombustionModel);
    assert.equal(state.params.oxygenSupplyPercent, 100, 'Test 8 : O₂ par défaut = 100%');
    state = startSimulationState(state, completeIncompleteCombustionModel);
    state = stepSimulationByDeltaSeconds(state, completeIncompleteCombustionModel, 10); // progress = 1.0

    // En combustion complète (100% O₂) : aucun CO ni suie C
    assert.equal(state.metrics.regime, 'complete', 'Test 8 : régime complet à 100% O₂');
    assert.equal(state.metrics.coProduced, 0, 'Test 8 : CO = 0 en combustion complète');
    assert.equal(state.metrics.carbonSootProduced, 0, 'Test 8 : suie C = 0 en combustion complète');
    assert.equal(
      completeIncompleteCombustionModel.validateInvariants(
        state.metrics,
        state.progress,
        state.params
      ),
      true,
      'Test 8 : conservation atomique C, H, O respectée en combustion complète'
    );

    // Basculer le paramètre d'ouverture d'air à 30% (Combustion incomplète)
    state = setSimulationParameterState(
      state,
      completeIncompleteCombustionModel,
      'oxygenSupplyPercent',
      30
    );
    assert.equal(state.metrics.regime, 'incomplete', 'Test 8 : régime incomplet à 30% O₂');
    assert.ok(state.metrics.coProduced > 0, 'Test 8 : apparition de CO toxique en régime incomplet');
    assert.ok(
      state.metrics.carbonSootProduced > 0,
      'Test 8 : apparition de suie C en régime incomplet'
    );
    assert.equal(
      completeIncompleteCombustionModel.validateInvariants(
        state.metrics,
        state.progress,
        state.params
      ),
      true,
      'Test 8 : conservation stricte des atomes C, H, O en combustion incomplète'
    );
    results.push(
      '✔ Test 8 — Cours 04 (Combustion complète/incomplète, paramètre O₂ et conservation C/H/O) : OK'
    );
  }

  // ==========================================================================
  // TEST 9 — COURS 06 : FACTEURS CINÉTIQUES (Température T & Surface de contact S)
  // ==========================================================================
  {
    let stateCold = createInitialSimulationState(reactionSpeedScientificModel, {
      initialParams: { temperatureCelsius: 10, surfaceDivisionFactor: 1 },
    });
    let stateRef = createInitialSimulationState(reactionSpeedScientificModel, {
      initialParams: { temperatureCelsius: 25, surfaceDivisionFactor: 1 },
    });
    let stateHotPowder = createInitialSimulationState(reactionSpeedScientificModel, {
      initialParams: { temperatureCelsius: 50, surfaceDivisionFactor: 4 },
    });

    stateCold = startSimulationState(stateCold, reactionSpeedScientificModel);
    stateRef = startSimulationState(stateRef, reactionSpeedScientificModel);
    stateHotPowder = startSimulationState(stateHotPowder, reactionSpeedScientificModel);

    stateCold = stepSimulationByDeltaSeconds(stateCold, reactionSpeedScientificModel, 4);
    stateRef = stepSimulationByDeltaSeconds(stateRef, reactionSpeedScientificModel, 4);
    stateHotPowder = stepSimulationByDeltaSeconds(stateHotPowder, reactionSpeedScientificModel, 4);

    assert.ok(
      stateCold.metrics.advancementPercent < stateRef.metrics.advancementPercent &&
        stateRef.metrics.advancementPercent < stateHotPowder.metrics.advancementPercent,
      'Test 9 : avancement(10°C, ×1) < avancement(25°C, ×1) < avancement(50°C, ×4)'
    );
    assert.ok(
      stateCold.metrics.effectiveCollisionsPerSec <
        stateHotPowder.metrics.effectiveCollisionsPerSec,
      'Test 9 : fréquence des chocs efficaces augmente avec T et S'
    );
    assert.equal(
      reactionSpeedScientificModel.validateInvariants(
        stateHotPowder.metrics,
        stateHotPowder.progress
      ),
      true,
      'Test 9 : invariants cinétiques et conservation du réactif valides'
    );
    results.push(
      '✔ Test 9 — Cours 06 (Facteurs cinétiques : Température T, Surface S et Chocs efficaces) : OK'
    );
  }

  // ==========================================================================
  // TEST 10 — COURS 09 : BILAN ÉNERGÉTIQUE & RENDEMENT η (Conservation E_reçue = E_utile + E_dissipée)
  // ==========================================================================
  {
    // Vérifier les 4 appareils et les valeurs numériques du cours (100 J, 500 J, 800 J, 2000 J)
    const testCases = [
      { deviceType: 1, inputJ: 100, expectedUseful: 30, expectedDiss: 70, expectedEta: 30 },
      { deviceType: 2, inputJ: 500, expectedUseful: 350, expectedDiss: 150, expectedEta: 70 },
      { deviceType: 3, inputJ: 2000, expectedUseful: 1800, expectedDiss: 200, expectedEta: 90 },
      { deviceType: 4, inputJ: 1000, expectedUseful: 650, expectedDiss: 350, expectedEta: 65 },
    ];

    for (const tc of testCases) {
      let state = createInitialSimulationState(energyBalanceScientificModel, {
        initialParams: {
          deviceType: tc.deviceType,
          totalInputEnergyJoules: tc.inputJ,
        },
      });
      state = startSimulationState(state, energyBalanceScientificModel);
      state = stepSimulationByDeltaSeconds(state, energyBalanceScientificModel, 10); // progress = 1.0

      assert.equal(state.metrics.nominalInputJoules, tc.inputJ);
      assert.equal(state.metrics.nominalUsefulJoules, tc.expectedUseful);
      assert.equal(state.metrics.nominalDissipatedJoules, tc.expectedDiss);
      assert.equal(state.metrics.efficiencyPercent, tc.expectedEta);
      assert.equal(
        energyBalanceScientificModel.validateInvariants(
          state.metrics,
          state.progress,
          state.params
        ),
        true,
        `Test 10 : conservation E_reçue = E_utile + E_dissipée valide pour appareil ${tc.deviceType}`
      );
    }
    results.push(
      '✔ Test 10 — Cours 09 (Bilan énergétique : E_reçue = E_utile + E_dissipée et rendement η) : OK'
    );
  }

  // ==========================================================================
  // TEST 11 — REGISTRE, INTÉGRATION DANS LES COURS (C02, C04, C06, C09) & NON-RÉGRESSION MATHS
  // ==========================================================================
  {
    const registeredKeys = Object.keys(simulationRegistry);
    assert.deepEqual(
      registeredKeys,
      [
        'electrolysis-water',
        'complete-incomplete-combustion',
        'reaction-speed',
        'energy-balance',
        'power-energy-conversion',
      ],
      'Test 11 : les 5 simulations (C02, C04, C06, C09, C10) sont enregistrées dans le registre'
    );

    for (const simId of registeredKeys) {
      assert.equal(isSimulationRegistered(simId), true);
      assert.ok(getSimulationFromRegistry(simId) !== null);
    }
    assert.equal(isSimulationRegistered('carbon-combustion'), false);

    // Vérification des 5 questions guidées dans chaque simulation
    assert.equal(electrolysisPedagogicalContent.guidedQuestions.length, 5);
    assert.equal(completeIncompleteCombustionPedagogicalContent.guidedQuestions.length, 5);
    assert.equal(reactionSpeedPedagogicalContent.guidedQuestions.length, 5);
    assert.equal(energyBalancePedagogicalContent.guidedQuestions.length, 5);
    assert.equal(powerConversionPedagogicalContent.guidedQuestions.length, 5);

    // Vérification des 20 cours Physique-Chimie et de la présence des blocs de simulation
    assert.equal(PHYSICS_CHEMISTRY_COURSES.length, 20, 'Test 11 : 20 cours Physique-Chimie présents');

    const expectedCourseSims = [
      { courseId: 'pc-course-02', simId: 'electrolysis-water' },
      { courseId: 'pc-course-04', simId: 'complete-incomplete-combustion' },
      { courseId: 'pc-course-06', simId: 'reaction-speed' },
      { courseId: 'pc-course-09', simId: 'energy-balance' },
      { courseId: 'pc-course-10', simId: 'power-energy-conversion' },
    ];

    for (const item of expectedCourseSims) {
      const course = PHYSICS_CHEMISTRY_COURSES.find((c) => c.id === item.courseId);
      assert.ok(course, `Test 11 : ${item.courseId} présent`);
      assert.equal(course.status, 'populated', `Test 11 : ${item.courseId} est peuplé`);
      const hasSimBlock = course.sections.some((sec) =>
        sec.blocks.some(
          (b) => b.kind === 'simulation' && b.data.simulationId === item.simId
        )
      );
      assert.equal(
        hasSimBlock,
        true,
        `Test 11 : bloc simulation '${item.simId}' présent dans ${item.courseId}`
      );
    }

    // Vérification que le module Maths est intact
    assert.ok(COURSES_DATA.length > 0, 'Test 11 : les cours du module Maths sont intacts');
    results.push(
      '✔ Test 11 — Registre (5 simulations), intégration C02/C04/C06/C09/C10 et non-régression Maths : OK'
    );
  }

  // ==========================================================================
  // TEST 12 — REDUCED MOTION (Accessibilité — fonctionnement sans animation continue)
  // ==========================================================================
  {
    let state = createInitialSimulationState(electrolysisScientificModel, {
      initialReducedMotion: true,
    });
    assert.equal(state.reducedMotion, true, 'Test 12 : reducedMotion activé');

    // Premier clic sur Démarrer en mode reducedMotion : passe directement au palier 50% en pause statique
    state = startSimulationState(state, electrolysisScientificModel);
    assert.equal(state.status, 'paused', 'Test 12 : pas de boucle animée continue en reducedMotion');
    assert.equal(state.progress, 0.5, 'Test 12 : palier 50% atteint clairement');
    assert.equal(state.metrics.volumeH2, 10, 'Test 12 : H₂ = 10 unités à 50%');
    assert.equal(state.metrics.volumeO2, 5, 'Test 12 : O₂ = 5 unités à 50%');

    // Second clic : passe à 100% (état final complet)
    state = startSimulationState(state, electrolysisScientificModel);
    assert.equal(state.status, 'completed', 'Test 12 : état final atteint');
    assert.equal(state.metrics.volumeH2, 20, 'Test 12 : H₂ = 20 unités à 100%');
    assert.equal(state.metrics.volumeO2, 10, 'Test 12 : O₂ = 10 unités à 100%');
    results.push('✔ Test 12 — Reduced Motion (représentation statique par paliers) : OK');
  }

  // ==========================================================================
  // TEST 13 — COURS 10 : PUISSANCE DE CONVERSION D'ÉNERGIE (P = E / t, E = P × t)
  // ==========================================================================
  {
    let state = createInitialSimulationState(powerConversionScientificModel);
    assert.equal(state.params.powerDeviceAWatts, 100, 'Test 13 : P_A = 100 W par défaut');
    assert.equal(state.params.powerDeviceBWatts, 500, 'Test 13 : P_B = 500 W par défaut');
    assert.equal(state.params.operatingDurationSec, 10, 'Test 13 : t = 10 s par défaut');

    // À 100% de la durée (t = 10 s) : E_A = 1000 J et E_B = 5000 J
    state = startSimulationState(state, powerConversionScientificModel);
    state = stepSimulationByDeltaSeconds(state, powerConversionScientificModel, 10);
    assert.equal(state.progress, 1, 'Test 13 : fin de durée atteinte');
    assert.equal(state.metrics.energyAJoules, 1000, 'Test 13 : E_A = 100 × 10 = 1000 J');
    assert.equal(state.metrics.energyBJoules, 5000, 'Test 13 : E_B = 500 × 10 = 5000 J');
    assert.equal(state.metrics.powerRatioBtoA, 5, 'Test 13 : P_B / P_A = 5');

    // Expérience des deux lampes (20 W et 100 W pendant 1 min = 60 s)
    state = setSimulationParameterState(state, powerConversionScientificModel, 'powerDeviceAWatts', 20);
    state = setSimulationParameterState(state, powerConversionScientificModel, 'powerDeviceBWatts', 100);
    state = setSimulationParameterState(state, powerConversionScientificModel, 'operatingDurationSec', 60);
    assert.equal(state.metrics.finalEnergyAJoules, 1200, 'Test 13 : Lampe 20 W × 60 s = 1200 J');
    assert.equal(state.metrics.finalEnergyBJoules, 6000, 'Test 13 : Lampe 100 W × 60 s = 6000 J');
    results.push('✔ Test 13 — Cours 10 (Puissance P = E/t, E = P×t et comparaison d’appareils) : OK');
  }

  console.log('\n============================================================');
  console.log('RÉSULTATS DES TESTS DU SIMULATION FRAMEWORK 3AM (C02, C04, C06, C09, C10)');
  console.log('============================================================');
  for (const line of results) {
    console.log(line);
  }
  console.log('============================================================\n');
}

runAllSimulationTests();
