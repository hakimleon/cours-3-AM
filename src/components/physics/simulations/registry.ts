import {
  RegisteredSimulationId,
  SimulationId,
  SimulationRegistryEntry,
} from './types';
import {
  electrolysisPedagogicalContent,
  electrolysisScientificModel,
} from './pilots/electrolysisWaterModel';
import { ElectrolysisWaterStage } from './pilots/ElectrolysisWaterStage';
import {
  completeIncompleteCombustionModel,
  completeIncompleteCombustionPedagogicalContent,
} from './pilots/completeIncompleteCombustionModel';
import { CompleteIncompleteCombustionStage } from './pilots/CompleteIncompleteCombustionStage';
import {
  reactionSpeedPedagogicalContent,
  reactionSpeedScientificModel,
} from './pilots/reactionSpeedModel';
import { ReactionSpeedStage } from './pilots/ReactionSpeedStage';
import {
  energyBalancePedagogicalContent,
  energyBalanceScientificModel,
} from './pilots/energyBalanceModel';
import { EnergyBalanceStage } from './pilots/EnergyBalanceStage';
import {
  powerConversionPedagogicalContent,
  powerConversionScientificModel,
} from './pilots/powerConversionModel';
import { PowerConversionStage } from './pilots/PowerConversionStage';

/**
 * Registre centralisé des simulations scientifiques Physique-Chimie 3AM.
 *
 * Contient les simulations à haute valeur pédagogique :
 * - Cours 02 (`electrolysis-water`) : التحليل الكهربائي للماء
 * - Cours 04 (`complete-incomplete-combustion`) : الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني
 * - Cours 06 (`reaction-speed`) : العوامل المؤثرة في التفاعل الكيميائي (درجة الحرارة وسطح التلامس)
 * - Cours 09 (`energy-balance`) : الحصيلة الطاقوية ومبدأ انحفاظ الطاقة والمردود (η)
 * - Cours 10 (`power-energy-conversion`) : استطاعة تحويل الطاقة (P = E / t ، مقارنة جهازين والمنحنى E = f(t))
 */
export const simulationRegistry: Record<
  RegisteredSimulationId,
  SimulationRegistryEntry<any, any>
> = {
  'electrolysis-water': {
    id: 'electrolysis-water',
    courseNumero: '02',
    pedagogy: electrolysisPedagogicalContent,
    scientificModel: electrolysisScientificModel,
    StageComponent: ElectrolysisWaterStage,
  },
  'complete-incomplete-combustion': {
    id: 'complete-incomplete-combustion',
    courseNumero: '04',
    pedagogy: completeIncompleteCombustionPedagogicalContent,
    scientificModel: completeIncompleteCombustionModel,
    StageComponent: CompleteIncompleteCombustionStage,
  },
  'reaction-speed': {
    id: 'reaction-speed',
    courseNumero: '06',
    pedagogy: reactionSpeedPedagogicalContent,
    scientificModel: reactionSpeedScientificModel,
    StageComponent: ReactionSpeedStage,
  },
  'energy-balance': {
    id: 'energy-balance',
    courseNumero: '09',
    pedagogy: energyBalancePedagogicalContent,
    scientificModel: energyBalanceScientificModel,
    StageComponent: EnergyBalanceStage,
  },
  'power-energy-conversion': {
    id: 'power-energy-conversion',
    courseNumero: '10',
    pedagogy: powerConversionPedagogicalContent,
    scientificModel: powerConversionScientificModel,
    StageComponent: PowerConversionStage,
  },
};

/**
 * Vérifie si un identifiant de simulation correspond à une simulation réellement enregistrée.
 */
export function isSimulationRegistered(
  id: SimulationId | string
): id is RegisteredSimulationId {
  return Object.prototype.hasOwnProperty.call(simulationRegistry, id);
}

/**
 * Récupère l'entrée du registre pour un identifiant donné, ou `null` si elle n'est pas encore implémentée.
 */
export function getSimulationFromRegistry(
  id: SimulationId | string
): SimulationRegistryEntry<any, any> | null {
  if (isSimulationRegistered(id)) {
    return simulationRegistry[id];
  }
  return null;
}
