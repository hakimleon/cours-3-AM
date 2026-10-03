import React, { useState } from 'react';
import {
  PhysicsSimulationBlockData,
  SimulationFallbackData,
  SimulationRegistryEntry,
  SimulationRepresentationMode,
  SimulationScientificStep,
  SimulationSpeed,
} from './types';
import { getSimulationFromRegistry } from './registry';
import { useSimulationEngine } from './useSimulationEngine';
import { Course01SchemaRenderer } from '../Course01Schemas';
import { ChemPhysText, ChemicalFormula } from '../ChemPhysText';
import { usePhysicsDomainTheme } from '../domainThemeTokens';
import {
  Play,
  Pause,
  RotateCcw,
  FlaskConical,
  Eye,
  Lightbulb,
  CheckCircle2,
  Compass,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Gauge,
  Layers,
  Accessibility,
  SlidersHorizontal,
} from 'lucide-react';

const AVAILABLE_SPEEDS: SimulationSpeed[] = [0.5, 1, 1.5, 2];

const DEFAULT_SCIENTIFIC_STEPS: SimulationScientificStep[] = [
  { step: 1, ar: '1. شغّل واضبط العامل', fr: 'Manipuler' },
  { step: 2, ar: '2. لاحظ الظاهرة', fr: 'Observer' },
  { step: 3, ar: '3. قِس المقادير', fr: 'Mesurer' },
  { step: 3, ar: '4. قارن الحالات', fr: 'Comparer' },
  { step: 4, ar: '5. استنتج القانون', fr: 'Conclure' },
];

/**
 * Composant de repli (Fallback — Section 20)
 * Affiché automatiquement si la simulation ne peut pas être initialisée
 * ou si l'identifiant demandé n'est pas encore implémenté.
 */
export const SimulationFallbackView: React.FC<{
  fallback: SimulationFallbackData;
}> = ({ fallback }) => {
  return (
    <div
      className="my-5 bg-[#FFFFFF] rounded-[16px] border-2 border-[#0F766E]/30 p-4 sm:p-6 space-y-4"
      dir="rtl"
      data-testid="simulation-fallback"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[#0F766E]" />
          <h3 className="text-base font-bold text-[#1A1A1A]">{fallback.titleArabic}</h3>
        </div>
        <span
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
          className="text-xs font-mono font-semibold text-[#0F766E] bg-[#F0FDFA] px-2.5 py-1 rounded-[8px] border border-[#99F6E4]"
        >
          {fallback.titleFrench}
        </span>
      </div>

      {fallback.staticSchemaType && (
        <Course01SchemaRenderer type={fallback.staticSchemaType} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {fallback.keyValues.map((kv, idx) => (
          <div
            key={idx}
            className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-1"
          >
            <div className="text-xs font-bold text-[#4A4A4A]">{kv.labelArabic}</div>
            <div
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-xs font-mono font-bold text-[#0F766E] text-left"
            >
              {kv.valueLtr}
            </div>
          </div>
        ))}
      </div>

      <div
        dir="ltr"
        style={{ unicodeBidi: 'isolate' }}
        className="p-3 rounded-[10px] bg-[#F6F0EB] border border-[#E2D9D0] text-center"
      >
        <ChemicalFormula formula={fallback.equationLtr} size="lg" />
      </div>

      <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
        <ChemPhysText text={fallback.shortExplanationArabic} />
      </p>
    </div>
  );
};

/**
 * ErrorBoundary pour garantir qu'en cas d'erreur d'exécution imprévue dans le rendu interactif,
 * le cours bascule automatiquement sur la vue statique de secours sans planter.
 */
class SimulationErrorBoundary extends React.Component<
  { fallback: SimulationFallbackData; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: SimulationFallbackData; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <SimulationFallbackView fallback={this.props.fallback} />;
    }
    return this.props.children;
  }
}

/**
 * Cœur interactif générique d'une simulation scientifique 3AM.
 */
const SimulationInteractiveCore: React.FC<{
  entry: SimulationRegistryEntry<any, any>;
  blockData: PhysicsSimulationBlockData;
}> = ({ entry, blockData }) => {
  const { pedagogy, scientificModel, StageComponent } = entry;
  const theme = usePhysicsDomainTheme();

  const supportedRepresentations: SimulationRepresentationMode[] =
    pedagogy.supportedRepresentations ?? ['macroscopic', 'microscopic', 'both'];

  const initialRep = supportedRepresentations.includes(
    blockData.defaultRepresentation ?? 'both'
  )
    ? blockData.defaultRepresentation ?? 'both'
    : supportedRepresentations[0] ?? 'macroscopic';

  const {
    containerRef,
    state,
    start,
    pause,
    reset,
    setSpeed,
    setParameter,
    setRepresentationMode,
    setInteractionMode,
    toggleReducedMotion,
    setGuidedStepIndex,
    jumpToProgress,
  } = useSimulationEngine(scientificModel, {
    defaultRepresentation: initialRep,
    defaultInteractionMode: blockData.defaultInteractionMode ?? 'exploration',
  });

  // État du tiroir (fermé par défaut — s'ouvre à la demande de l'élève)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const next = !prev;
      if (!next && state.status === 'running') {
        pause();
      }
      return next;
    });
  };

  // Suivi des réponses révélées dans le mode « Observation guidée »
  const [revealedGuidedIds, setRevealedGuidedIds] = useState<string[]>([]);

  const toggleRevealGuidedAnswer = (questionId: string) => {
    setRevealedGuidedIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  // Observations dynamiques actives selon la progression actuelle
  const activeObservations = pedagogy.dynamicObservations.filter(
    (obs) => state.progress >= obs.minProgress
  );
  const currentObservation =
    activeObservations[activeObservations.length - 1] || pedagogy.dynamicObservations[0];

  const currentGuidedQuestion =
    pedagogy.guidedQuestions[state.guidedStepIndex] || pedagogy.guidedQuestions[0];

  // Étape active dans la démarche scientifique (MANIPULER → OBSERVER → MESURER → COMPARER → CONCLURE)
  const activePedagogicalPhase =
    state.progress === 0
      ? 1 // MANIPULER
      : state.progress < 0.35
      ? 2 // OBSERVER
      : state.progress < 0.75
      ? 3 // MESURER & COMPARER
      : 4; // CONCLURE

  const scientificSteps = pedagogy.scientificSteps ?? DEFAULT_SCIENTIFIC_STEPS;
  const startButtonLabel =
    pedagogy.controlLabels?.startArabic ?? 'تشغيل المحاكاة (Démarrer)';
  const progressLabelArabic =
    pedagogy.controlLabels?.progressLabelArabic ??
    'تقدم التفاعل التجريبي (يمكنك أيضًا تحريك المؤشر للمقارنة عند أي لحظة) :';
  const progressAriaLabel =
    pedagogy.controlLabels?.progressAriaLabel ?? 'شريط تقدم المحاكاة العلمية';
  const relationBadgeLtr =
    pedagogy.keyRelationBadgeLtr ?? pedagogy.volumeRelationLtr ?? pedagogy.equationLtr;

  const applyGuidedTarget = (targetProgress: number, targetParams?: Record<string, number>) => {
    if (targetParams) {
      for (const [paramKey, paramVal] of Object.entries(targetParams)) {
        setParameter(paramKey, paramVal);
      }
    }
    jumpToProgress(targetProgress);
  };

  return (
    <section
      ref={containerRef}
      aria-label={blockData.titleArabic || pedagogy.titleArabic}
      className="my-2 bg-[#FDF2F8] rounded-[18px] border-2 border-[#F472B6]/70 shadow-xs overflow-hidden transition-all p-1 pb-3 sm:pb-3.5"
      dir="rtl"
      data-testid={`simulation-container-${entry.id}`}
    >
      {/* ================================================================== */}
      {/* BARRE-TIROIR CLIQUABLE (FERMÉE PAR DÉFAUT — OUVERTURE À LA DEMANDE) */}
      {/* ================================================================== */}
      <button
        type="button"
        onClick={toggleDrawer}
        aria-expanded={isDrawerOpen}
        data-testid="sim-drawer-toggle"
        className="w-full text-right rounded-[14px] bg-gradient-to-l from-[#FCE7F3] via-[#FDF2F8] to-[#F0F9FF] hover:from-[#FBCFE8] hover:via-[#FCE7F3] hover:to-[#E0F2FE] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer"
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[#C94BA6] text-white text-xs font-bold shadow-2xs">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>مخبر المحاكاة التفاعلية · Simulation 3AM</span>
            </span>
            <span className="text-xs font-semibold text-[#6B6B6B]">
              {pedagogy.levelBadge}
            </span>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[6px] border bg-white/90 text-[#9D174D] border-[#F9A8D4]"
            >
              {blockData.titleFrench || pedagogy.titleFrench}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#831843]">
            {blockData.titleArabic || pedagogy.titleArabic}
          </h3>
          <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
            {pedagogy.objectiveArabic}
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border text-xs sm:text-sm font-bold shadow-2xs transition-all ${
              isDrawerOpen
                ? 'bg-white text-[#C94BA6] border-[#C94BA6]'
                : 'bg-[#C94BA6] text-white border-[#C94BA6]'
            }`}
          >
            <FlaskConical className="w-4 h-4 shrink-0" />
            <span>
              {isDrawerOpen
                ? 'إغلاق المحاكاة التفاعلية (Fermer)'
                : 'فتح المحاكاة التفاعلية (Ouvrir)'}
            </span>
            {isDrawerOpen ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </span>
        </div>
      </button>

      {/* ================================================================== */}
      {/* CONTENU DU TIROIR DE SIMULATION (RENDU UNIQUEMENT QUAND OUVERT)     */}
      {/* ================================================================== */}
      {isDrawerOpen && (
        <div className="p-4 sm:p-6 border-t border-[#F9A8D4] bg-[#FDF2F8]/80 space-y-5">
          {/* 1. SÉLECTEURS DE MODES & DÉMARCHE SCIENTIFIQUE */}
          <div className="bg-white rounded-[14px] border border-[#F9A8D4] p-4 space-y-3">
            {/* Barre de sélection : Mode d'interaction & Niveau de représentation */}
            <div className="no-pdf flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Mode d'interaction : Exploration libre vs Observation guidée */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#4A4A4A] ml-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" style={{ color: theme.primaryHex }} />
              <span>نمط التعلم :</span>
            </span>
            <button
              type="button"
              onClick={() => setInteractionMode('exploration')}
              aria-pressed={state.interactionMode === 'exploration'}
              style={
                state.interactionMode === 'exploration'
                  ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex }
                  : undefined
              }
              className={`px-3 py-1.5 rounded-[8px] text-xs font-bold border transition-all cursor-pointer ${
                state.interactionMode === 'exploration'
                  ? 'text-white'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0]'
              }`}
            >
              وضع الاستكشاف الحر (Exploration)
            </button>
            <button
              type="button"
              onClick={() => setInteractionMode('guided')}
              aria-pressed={state.interactionMode === 'guided'}
              style={
                state.interactionMode === 'guided'
                  ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex }
                  : undefined
              }
              className={`px-3 py-1.5 rounded-[8px] text-xs font-bold border transition-all cursor-pointer ${
                state.interactionMode === 'guided'
                  ? 'text-white'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0]'
              }`}
            >
              الملاحظة الموجهة (Observation guidée)
            </button>
          </div>

          {/* Niveau de représentation : affiché uniquement si plusieurs modes sont pertinents */}
          {supportedRepresentations.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-[#4A4A4A] ml-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>مستوى التمثيل :</span>
              </span>
              {(
                [
                  { id: 'macroscopic', label: 'العياني (Macro)' },
                  { id: 'microscopic', label: 'المجهري المبسط (Micro)' },
                  { id: 'both', label: 'عرض مزدوج (العياني + المجهري)' },
                ] as { id: SimulationRepresentationMode; label: string }[]
              )
                .filter((rep) => supportedRepresentations.includes(rep.id))
                .map((rep) => (
                  <button
                    key={rep.id}
                    type="button"
                    onClick={() => setRepresentationMode(rep.id)}
                    aria-pressed={state.representationMode === rep.id}
                    className={`px-2.5 py-1.5 rounded-[8px] text-xs font-bold border transition-all cursor-pointer focus:outline-2 focus:outline-[#C2410C] ${
                      state.representationMode === rep.id
                        ? 'bg-[#C2410C] text-white border-[#C2410C]'
                        : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0] hover:border-[#C2410C]'
                    }`}
                  >
                    {rep.label}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Bandeau de démarche scientifique (MANIPULER → OBSERVER → MESURER → COMPARER → CONCLURE) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 border-t border-[#F1ECE6]">
          {scientificSteps.map((item, idx) => {
            const isActive = activePedagogicalPhase >= item.step;
            return (
              <div
                key={idx}
                style={
                  isActive
                    ? {
                        backgroundColor: theme.softBgHex,
                        borderColor: theme.primaryHex,
                        color: theme.primaryHex,
                      }
                    : undefined
                }
                className={`px-2.5 py-1.5 rounded-[8px] border text-center transition-colors ${
                  isActive ? 'font-bold' : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#6B6B6B]'
                }`}
              >
                <div className="text-[11px]">{item.ar}</div>
                <div className="text-[9.5px] font-mono opacity-80" dir="ltr">
                  {item.fr}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================== */}
      {/* 1b. PANNEAU DE PARAMÈTRES SCIENTIFIQUES MANIPULABLES (SI PRÉSENTS)  */}
      {/* ================================================================== */}
      {scientificModel.parameters && scientificModel.parameters.length > 0 && (
        <div
          className="bg-white rounded-[14px] border-2 border-[#E2D9D0] p-4 space-y-3"
          role="region"
          aria-label="العوامل العلمية القابلة للضبط"
          data-testid="sim-parameters-panel"
        >
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-2">
            <div
              style={{ color: theme.primaryHex }}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold"
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span>العوامل العلمية القابلة للضبط (Paramètres expérimentaux)</span>
            </div>
            <span className="text-[11px] text-[#6B6B6B]">
              غيّر العامل ولاحظ أثره المباشر على الظاهرة والنواتج
            </span>
          </div>

          <div
            className={`grid grid-cols-1 ${
              scientificModel.parameters.length > 1 ? 'lg:grid-cols-2' : ''
            } gap-4`}
          >
            {scientificModel.parameters.map((param) => {
              const currentValue =
                state.params[param.id] !== undefined
                  ? state.params[param.id]
                  : param.defaultValue;
              const activePreset = param.presets?.find(
                (pr) => Math.abs(pr.value - currentValue) < 1e-6
              );

              return (
                <div
                  key={param.id}
                  className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                        {param.labelArabic}
                      </div>
                      {param.labelFrench && (
                        <div
                          dir="ltr"
                          style={{ unicodeBidi: 'isolate' }}
                          className="text-[11px] font-mono text-[#6B6B6B]"
                        >
                          {param.labelFrench}
                        </div>
                      )}
                    </div>
                    <span
                      dir="ltr"
                      style={{
                        unicodeBidi: 'isolate',
                        backgroundColor: theme.softBgHex,
                        color: theme.primaryHex,
                        borderColor: theme.softBorderHex,
                      }}
                      className="px-2.5 py-1 rounded-[8px] border font-mono text-xs sm:text-sm font-extrabold"
                      data-testid={`sim-param-val-${param.id}`}
                    >
                      {activePreset && param.presetsOnly
                        ? activePreset.labelFrench || `${currentValue}`
                        : `${currentValue}${param.unit ? ` ${param.unit}` : ''}`}
                    </span>
                  </div>

                  {/* Boutons de paliers scientifiques (Presets) */}
                  {param.presets && param.presets.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {param.presets.map((preset) => {
                        const isSelected = Math.abs(currentValue - preset.value) < 1e-6;
                        return (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => setParameter(param.id, preset.value)}
                            aria-pressed={isSelected}
                            data-testid={`sim-preset-${param.id}-${preset.value}`}
                            style={
                              isSelected
                                ? {
                                    backgroundColor: theme.primaryHex,
                                    borderColor: theme.primaryHex,
                                  }
                                : undefined
                            }
                            className={`px-3 py-1.5 rounded-[8px] text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? 'text-white shadow-2xs'
                                : 'bg-white text-[#4A4A4A] border-[#E2D9D0] hover:border-[#94A3B8]'
                            }`}
                          >
                            <span>{preset.labelArabic}</span>
                            {preset.labelFrench && (
                              <span
                                dir="ltr"
                                style={{ unicodeBidi: 'isolate' }}
                                className="mr-1.5 font-mono text-[10.5px] opacity-90"
                              >
                                ({preset.labelFrench})
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Slider continu (sauf si presetsOnly est activé) */}
                  {!param.presetsOnly && (
                    <div className="space-y-1 pt-0.5">
                      <input
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={currentValue}
                        onChange={(e) => setParameter(param.id, Number(e.target.value))}
                        aria-label={param.labelArabic}
                        data-testid={`sim-slider-${param.id}`}
                        style={{ accentColor: theme.primaryHex }}
                        className="w-full cursor-pointer h-2 bg-[#E2D9D0] rounded-lg"
                      />
                      <div
                        dir="ltr"
                        className="flex items-center justify-between text-[10px] font-mono text-[#6B6B6B]"
                      >
                        <span>
                          {param.min}
                          {param.unit ? ` ${param.unit}` : ''}
                        </span>
                        <span>
                          {param.max}
                          {param.unit ? ` ${param.unit}` : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 2. SCÈNE GRAPHIQUE, MESURES EN TEMPS RÉEL & GRAPHIQUE DYNAMIQUE     */}
      {/* ================================================================== */}
      <StageComponent
        state={state}
        pedagogy={pedagogy}
        onStart={start}
        onPause={pause}
        onReset={reset}
        onParameterChange={setParameter}
      />

      {/* ================================================================== */}
      {/* 3. CONTRÔLES INTERACTIFS (Play / Pause / Reset / Vitesse / Motion)  */}
      {/* ================================================================== */}
      <div
        className="no-pdf bg-white rounded-[14px] border border-[#E2D9D0] p-4 space-y-3"
        role="region"
        aria-label="أدوات التحكم في المحاكاة"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Boutons principaux : Démarrer / Pause / Réinitialiser */}
          <div className="flex flex-wrap items-center gap-2">
            {state.status !== 'running' ? (
              <button
                type="button"
                onClick={start}
                aria-label="تشغيل المحاكاة (Démarrer la simulation)"
                data-testid="sim-btn-start"
                style={{ backgroundColor: theme.primaryHex }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer hover:opacity-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {state.status === 'paused' && state.progress > 0 && state.progress < 1
                    ? 'متابعة التشغيل (Reprendre)'
                    : state.status === 'completed'
                    ? 'إعادة التشغيل (Relancer)'
                    : startButtonLabel}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={pause}
                aria-label="إيقاف مؤقت للمحاكاة (Mettre en pause)"
                data-testid="sim-btn-pause"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>إيقاف مؤقت (Pause)</span>
              </button>
            )}

            <button
              type="button"
              onClick={reset}
              aria-label="إعادة ضبط المحاكاة إلى الحالة الابتدائية (Réinitialiser)"
              data-testid="sim-btn-reset"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] bg-[#FAF7F4] hover:bg-[#F1ECE6] text-[#1A1A1A] border border-[#E2D9D0] text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة ضبط (Réinitialiser)</span>
            </button>
          </div>

          {/* Sélecteur de vitesse (0.5x, 1x, 1.5x, 2x) & Reduced Motion */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#FAF7F4] px-2.5 py-1.5 rounded-[10px] border border-[#E2D9D0]">
              <Gauge className="w-3.5 h-3.5" style={{ color: theme.primaryHex }} />
              <span className="text-xs font-bold text-[#4A4A4A] ml-1">السرعة :</span>
              {AVAILABLE_SPEEDS.map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setSpeed(spd)}
                  aria-label={`سرعة المحاكاة ${spd}x`}
                  aria-pressed={state.speed === spd}
                  data-testid={`sim-speed-${spd}`}
                  dir="ltr"
                  style={
                    state.speed === spd ? { backgroundColor: theme.primaryHex } : undefined
                  }
                  className={`px-2 py-1 rounded-[6px] font-mono text-xs font-bold transition-all cursor-pointer ${
                    state.speed === spd
                      ? 'text-white'
                      : 'bg-white text-[#4A4A4A] border border-[#E2D9D0]'
                  }`}
                >
                  {spd}×
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={state.reducedMotion}
              aria-label="تبديل وضع تقليل الحركة (Mode statique / Reduced motion)"
              data-testid="sim-btn-reduced-motion"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                state.reducedMotion
                  ? 'bg-[#1E40AF] text-white border-[#1E40AF]'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0] hover:border-[#1E40AF]'
              }`}
            >
              <Accessibility className="w-3.5 h-3.5" />
              <span>{state.reducedMotion ? 'وضع ثابت مفعل' : 'تقليل الحركة'}</span>
            </button>
          </div>
        </div>

        {/* Barre de progression interactive permettant aussi d'inspecter un instant précis */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
            <span>{progressLabelArabic}</span>
            <span
              dir="ltr"
              style={{ color: theme.primaryHex }}
              className="font-mono font-bold"
            >
              {Math.round(state.progress * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={Math.round(state.progress * 100)}
            onChange={(e) => jumpToProgress(Number(e.target.value) / 100)}
            aria-label={progressAriaLabel}
            style={{ accentColor: theme.primaryHex }}
            className="w-full cursor-pointer h-2 bg-[#E2D9D0] rounded-lg"
          />
        </div>
      </div>

      {/* ================================================================== */}
      {/* 4. ZONE PÉDAGOGIQUE : EXPLORATION (« ماذا تلاحظ؟ » & « استنتج »)     */}
      {/*    OU OBSERVATION GUIDÉE (5 questions progressives)                */}
      {/* ================================================================== */}
      {state.interactionMode === 'exploration' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* A. Zone « ماذا تلاحظ؟ » (Observations dynamiques) */}
          <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-2">
              <div
                style={{ color: theme.primaryHex }}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold"
              >
                <Eye className="w-4 h-4 shrink-0" />
                <span>ماذا تلاحظ؟ · Que remarques-tu ?</span>
              </div>
              <span
                style={{
                  backgroundColor: theme.softBgHex,
                  color: theme.primaryHex,
                  borderColor: theme.softBorderHex,
                }}
                className="text-[11px] font-semibold px-2 py-0.5 rounded border"
              >
                ملاحظة آنية ({activeObservations.length} / {pedagogy.dynamicObservations.length})
              </span>
            </div>

            {/* Observation principale de l'étape courante */}
            <div
              style={{ borderColor: `${theme.primaryHex}4D` }}
              className="p-3.5 rounded-[12px] bg-[#FAF7F4] border space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  {currentObservation.titleArabic}
                </span>
                {currentObservation.titleFrench && (
                  <span
                    dir="ltr"
                    style={{ unicodeBidi: 'isolate', color: theme.primaryHex }}
                    className="text-[11px] font-mono"
                  >
                    {currentObservation.titleFrench}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                {currentObservation.descriptionArabic}
              </p>
              {currentObservation.scientificFormula && (
                <div
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate', color: theme.primaryHex }}
                  className="p-2 rounded-[8px] bg-white border border-[#E2D9D0] text-center font-mono text-xs font-bold"
                >
                  {currentObservation.scientificFormula}
                </div>
              )}
            </div>

            {/* Liste récapitulative des observations franchies */}
            <div className="space-y-1.5 pt-1">
              {pedagogy.dynamicObservations.map((obs) => {
                const isReached = state.progress >= obs.minProgress;
                return (
                  <div
                    key={obs.id}
                    style={
                      isReached
                        ? {
                            backgroundColor: theme.softBgHex,
                            borderColor: theme.softBorderHex,
                            color: theme.darkTextHex,
                          }
                        : undefined
                    }
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-[8px] text-xs border ${
                      isReached
                        ? 'font-semibold'
                        : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#8C8C8C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        style={isReached ? { color: theme.primaryHex } : undefined}
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isReached ? '' : 'text-[#CBD5E1]'
                        }`}
                      />
                      <span>{obs.titleArabic}</span>
                    </div>
                    <span dir="ltr" className="font-mono text-[10px]">
                      {Math.round(obs.minProgress * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. Zone « استنتج » (Conclusion scientifique) */}
          <div
            style={{ borderColor: theme.primaryHex }}
            className="bg-white rounded-[14px] border-2 p-4 sm:p-5 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div
                style={{ borderColor: theme.softBorderHex }}
                className="flex items-center justify-between border-b pb-2"
              >
                <div
                  style={{ color: theme.primaryHex }}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold"
                >
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>استنتج · Conclusion scientifique</span>
                </div>
                <span
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate', color: theme.primaryHex }}
                  className="text-[11px] font-mono font-bold"
                >
                  {relationBadgeLtr}
                </span>
              </div>

              <ul className="space-y-2 pr-4 list-disc text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                {pedagogy.conclusionArabic.map((line, idx) => (
                  <li key={idx} className="font-medium">
                    <ChemPhysText text={line} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              {pedagogy.conclusionFormulasLtr.map((formula, idx) => (
                <div
                  key={idx}
                  dir="ltr"
                  style={{
                    unicodeBidi: 'isolate',
                    backgroundColor: theme.softBgHex,
                    borderColor: theme.softBorderHex,
                    color: theme.primaryHex,
                  }}
                  className="p-2.5 rounded-[10px] border text-center font-mono text-sm font-bold"
                >
                  {formula}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================================================================== */
        /* MODE « OBSERVATION GUIDÉE » (5 questions successives)              */
        /* ================================================================== */
        <div
          style={{ borderColor: theme.primaryHex }}
          className="bg-white rounded-[14px] border-2 p-4 sm:p-5 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
            <div
              style={{ color: theme.primaryHex }}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold"
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>وضع الملاحظة الموجهة خطوة بخطوة (Observation guidée)</span>
            </div>

            {/* Indicateurs des questions */}
            <div className="flex items-center gap-1.5">
              {pedagogy.guidedQuestions.map((gq, idx) => (
                <button
                  key={gq.id}
                  type="button"
                  onClick={() => {
                    setGuidedStepIndex(idx);
                    if (gq.targetParams || state.progress < gq.targetProgress) {
                      applyGuidedTarget(
                        Math.max(state.progress, gq.targetProgress),
                        gq.targetParams
                      );
                    }
                  }}
                  aria-label={`السؤال ${gq.number}`}
                  style={
                    state.guidedStepIndex === idx
                      ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex }
                      : revealedGuidedIds.includes(gq.id)
                      ? {
                          backgroundColor: theme.softBgHex,
                          color: theme.primaryHex,
                          borderColor: theme.softBorderHex,
                        }
                      : undefined
                  }
                  className={`w-7 h-7 rounded-[8px] font-mono text-xs font-bold border transition-all cursor-pointer ${
                    state.guidedStepIndex === idx
                      ? 'text-white'
                      : revealedGuidedIds.includes(gq.id)
                      ? ''
                      : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0]'
                  }`}
                >
                  {gq.number}
                </button>
              ))}
            </div>
          </div>

          {currentGuidedQuestion && (
            <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  style={{ backgroundColor: theme.primaryHex }}
                  className="px-2.5 py-1 rounded-[6px] text-white text-xs font-bold"
                >
                  السؤال {currentGuidedQuestion.number} من {pedagogy.guidedQuestions.length}
                </span>
                {currentGuidedQuestion.questionFrench && (
                  <span
                    dir="ltr"
                    style={{ unicodeBidi: 'isolate' }}
                    className="text-xs font-mono text-[#6B6B6B]"
                  >
                    {currentGuidedQuestion.questionFrench}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                {currentGuidedQuestion.questionArabic}
              </h4>

              <p className="text-xs text-[#6B6B6B] bg-white p-2.5 rounded-[8px] border border-[#E2D9D0]">
                💡 <strong>توجيه للملاحظة :</strong> {currentGuidedQuestion.observationHintArabic}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    applyGuidedTarget(
                      currentGuidedQuestion.targetProgress,
                      currentGuidedQuestion.targetParams
                    )
                  }
                  style={{ color: theme.primaryHex, borderColor: theme.primaryHex }}
                  className="px-3 py-1.5 rounded-[8px] bg-white text-xs font-bold border transition-colors cursor-pointer"
                >
                  معاينة هذه المرحلة في المحاكاة ({Math.round(currentGuidedQuestion.targetProgress * 100)}%)
                </button>

                <button
                  type="button"
                  onClick={() => toggleRevealGuidedAnswer(currentGuidedQuestion.id)}
                  style={{ backgroundColor: theme.primaryHex }}
                  className="px-3.5 py-1.5 rounded-[8px] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {revealedGuidedIds.includes(currentGuidedQuestion.id)
                    ? 'إخفاء الإجابة العلمية'
                    : 'تحقق من ملاحظتك (إظهار الإجابة)'}
                </button>
              </div>

              {revealedGuidedIds.includes(currentGuidedQuestion.id) && (
                <div
                  style={{
                    backgroundColor: theme.softBgHex,
                    borderColor: theme.softBorderHex,
                  }}
                  className="p-3.5 rounded-[10px] border space-y-2"
                >
                  <div
                    style={{ color: theme.primaryHex }}
                    className="text-xs font-bold"
                  >
                    الإجابة والملاحظة العلمية :
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                    {currentGuidedQuestion.answerArabic}
                  </p>
                  {currentGuidedQuestion.formulaLtr && (
                    <div
                      dir="ltr"
                      style={{
                        unicodeBidi: 'isolate',
                        borderColor: theme.softBorderHex,
                        color: theme.primaryHex,
                      }}
                      className="p-2 rounded bg-white border text-center font-mono text-xs font-bold"
                    >
                      {currentGuidedQuestion.formulaLtr}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Précédent / Suivant entre les questions guidées */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              disabled={state.guidedStepIndex === 0}
              onClick={() => {
                const prevIdx = Math.max(0, state.guidedStepIndex - 1);
                setGuidedStepIndex(prevIdx);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E2D9D0] bg-[#FAF7F4] text-xs font-bold text-[#4A4A4A] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السؤال السابق</span>
            </button>

            <button
              type="button"
              disabled={state.guidedStepIndex >= pedagogy.guidedQuestions.length - 1}
              onClick={() => {
                const nextIdx = Math.min(
                  pedagogy.guidedQuestions.length - 1,
                  state.guidedStepIndex + 1
                );
                setGuidedStepIndex(nextIdx);
                const nextQ = pedagogy.guidedQuestions[nextIdx];
                if (nextQ && (nextQ.targetParams || state.progress < nextQ.targetProgress)) {
                  applyGuidedTarget(
                    Math.max(state.progress, nextQ.targetProgress),
                    nextQ.targetParams
                  );
                }
              }}
              style={{ backgroundColor: theme.primaryHex }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] text-white text-xs font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>السؤال التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Conclusion progressive en fin de parcours guidé */}
          {(state.guidedStepIndex === pedagogy.guidedQuestions.length - 1 ||
            revealedGuidedIds.length >= 3) && (
            <div
              style={{
                backgroundColor: theme.softBgHex,
                borderColor: theme.primaryHex,
              }}
              className="p-4 rounded-[12px] border-2 space-y-2"
            >
              <div
                style={{ color: theme.primaryHex }}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold"
              >
                <Lightbulb className="w-4 h-4" />
                <span>الاستنتاج النهائي من الملاحظة الموجهة :</span>
              </div>
              {pedagogy.conclusionArabic.map((line, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
                  • {line}
                </p>
              ))}
              <div
                dir="ltr"
                style={{
                  unicodeBidi: 'isolate',
                  borderColor: theme.softBorderHex,
                  color: theme.primaryHex,
                }}
                className="p-2.5 rounded-[8px] bg-white border text-center font-mono text-xs sm:text-sm font-bold"
              >
                {pedagogy.conclusionFormulasLtr.join('   |   ')}
              </div>
            </div>
          )}
        </div>
      )}
        </div>
      )}
    </section>
  );
};

/**
 * Composant public `SimulationScientifique`.
 * Récupère la simulation depuis le registre centralisé et l'encapsule dans
 * un ErrorBoundary avec Fallback automatique.
 */
export const SimulationScientifique: React.FC<{
  blockData: PhysicsSimulationBlockData;
}> = ({ blockData }) => {
  const entry = getSimulationFromRegistry(blockData.simulationId);

  if (!entry) {
    return (
      <SimulationFallbackView
        fallback={{
          titleArabic: blockData.titleArabic || 'محاكاة علمية تفاعلية',
          titleFrench: blockData.titleFrench || 'Simulation scientifique interactive',
          equationLtr: 'Modèle scientifique 3AM',
          keyValues: [
            { labelArabic: 'الحالة الابتدائية', valueLtr: 't = 0 s (État initial)' },
            { labelArabic: 'الملاحظة والقياس', valueLtr: 'Observation & Mesure' },
            { labelArabic: 'الاستنتاج العلمي', valueLtr: 'Loi de conservation' },
          ],
          shortExplanationArabic:
            blockData.subtitleArabic ||
            'عرض ثابت احتياطي للمحاكاة العلمية التفاعلية.',
        }}
      />
    );
  }

  return (
    <SimulationErrorBoundary fallback={entry.pedagogy.fallback}>
      <SimulationInteractiveCore entry={entry} blockData={blockData} />
    </SimulationErrorBoundary>
  );
};
