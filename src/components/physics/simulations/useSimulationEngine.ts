import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SimulationInteractionMode,
  SimulationRepresentationMode,
  SimulationRuntimeState,
  SimulationScientificModel,
  SimulationSpeed,
} from './types';

export interface SimulationEngineOptions<
  TParams extends Record<string, number> = Record<string, number>,
> {
  defaultRepresentation?: SimulationRepresentationMode;
  defaultInteractionMode?: SimulationInteractionMode;
  initialReducedMotion?: boolean;
  initialParams?: Partial<TParams>;
}

/**
 * Clamp un nombre dans l'intervalle [0, 1].
 */
export function clampProgress(value: number): number {
  if (Number.isNaN(value) || value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * Résout le dictionnaire initial des paramètres scientifiques à partir du modèle.
 */
export function resolveInitialParameters<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  model: SimulationScientificModel<TMetrics, TParams>,
  overrides?: Partial<TParams>
): TParams {
  const base: Record<string, number> = {};
  if (model.parameters) {
    for (const p of model.parameters) {
      base[p.id] = p.defaultValue;
    }
  }
  if (model.getInitialParameters) {
    Object.assign(base, model.getInitialParameters());
  }
  if (overrides) {
    for (const [k, v] of Object.entries(overrides)) {
      if (typeof v === 'number' && !Number.isNaN(v)) {
        base[k] = v;
      }
    }
  }
  return base as TParams;
}

/**
 * Construit l'historique échantillonné de 0 jusqu'à `progress` (en 20 paliers max)
 * de manière purement déterministe à partir du modèle scientifique et des paramètres actifs.
 */
export function buildDeterministicHistory<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  model: SimulationScientificModel<TMetrics, TParams>,
  progress: number,
  params?: TParams
) {
  const clamped = clampProgress(progress);
  const resolvedParams = params ?? resolveInitialParameters(model);
  const steps = 20;
  const currentStep = Math.floor(clamped * steps);
  const points = [];

  for (let i = 0; i <= currentStep; i++) {
    const p = i / steps;
    const m = model.computeMetricsAtProgress(p, resolvedParams);
    points.push({
      progress: p,
      elapsedSeconds: Number((p * model.nominalDurationSeconds).toFixed(2)),
      values: model.extractHistoryValues(m, resolvedParams),
    });
  }

  if (clamped > currentStep / steps) {
    const m = model.computeMetricsAtProgress(clamped, resolvedParams);
    points.push({
      progress: clamped,
      elapsedSeconds: Number((clamped * model.nominalDurationSeconds).toFixed(2)),
      values: model.extractHistoryValues(m, resolvedParams),
    });
  }

  return points;
}

/**
 * Crée l'état initial exact de la simulation (status = 'stopped', progress = 0).
 */
export function createInitialSimulationState<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  model: SimulationScientificModel<TMetrics, TParams>,
  options?: SimulationEngineOptions<TParams>
): SimulationRuntimeState<TMetrics, TParams> {
  const initialParams = resolveInitialParameters(model, options?.initialParams);
  const initialMetrics = model.getInitialMetrics(initialParams);
  return {
    status: 'stopped',
    progress: 0,
    elapsedTime: 0,
    speed: 1,
    representationMode: options?.defaultRepresentation ?? 'both',
    interactionMode: options?.defaultInteractionMode ?? 'exploration',
    reducedMotion: options?.initialReducedMotion ?? false,
    guidedStepIndex: 0,
    params: initialParams,
    metrics: initialMetrics,
    history: [
      {
        progress: 0,
        elapsedSeconds: 0,
        values: model.extractHistoryValues(initialMetrics, initialParams),
      },
    ],
  };
}

/**
 * Fonctions pures de transition d'état (utilisées par le hook React et par les tests unitaires).
 */
export function startSimulationState<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>,
  model: SimulationScientificModel<TMetrics, TParams>
): SimulationRuntimeState<TMetrics, TParams> {
  const baseProgress = prev.progress >= 1 ? 0 : prev.progress;

  // En mode reducedMotion, un clic sur Démarrer avance d'un palier pédagogique net (ou à 100% si proche de la fin)
  if (prev.reducedMotion) {
    const nextProgress = clampProgress(baseProgress === 0 ? 0.5 : baseProgress < 1 ? 1 : 0.5);
    const nextMetrics = model.computeMetricsAtProgress(nextProgress, prev.params);
    return {
      ...prev,
      status: nextProgress >= 1 ? 'completed' : 'paused',
      progress: nextProgress,
      elapsedTime: Number((nextProgress * model.nominalDurationSeconds).toFixed(2)),
      metrics: nextMetrics,
      history: buildDeterministicHistory(model, nextProgress, prev.params),
    };
  }

  const metrics = model.computeMetricsAtProgress(baseProgress, prev.params);
  return {
    ...prev,
    status: 'running',
    progress: baseProgress,
    elapsedTime: Number((baseProgress * model.nominalDurationSeconds).toFixed(2)),
    metrics,
    history: buildDeterministicHistory(model, baseProgress, prev.params),
  };
}

export function pauseSimulationState<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>
): SimulationRuntimeState<TMetrics, TParams> {
  if (prev.status !== 'running') return prev;
  return {
    ...prev,
    status: 'paused',
  };
}

export function resetSimulationState<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>,
  model: SimulationScientificModel<TMetrics, TParams>
): SimulationRuntimeState<TMetrics, TParams> {
  const initialMetrics = model.getInitialMetrics(prev.params);
  return {
    ...prev,
    status: 'stopped',
    progress: 0,
    elapsedTime: 0,
    metrics: initialMetrics,
    history: [
      {
        progress: 0,
        elapsedSeconds: 0,
        values: model.extractHistoryValues(initialMetrics, prev.params),
      },
    ],
  };
}

export function setSimulationSpeedState<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>,
  speed: SimulationSpeed
): SimulationRuntimeState<TMetrics, TParams> {
  return {
    ...prev,
    speed,
  };
}

/**
 * Met à jour un paramètre scientifique manipulable et recalcule immédiatement
 * les grandeurs et l'historique de façon déterministe.
 */
export function setSimulationParameterState<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>,
  model: SimulationScientificModel<TMetrics, TParams>,
  paramId: string,
  rawValue: number
): SimulationRuntimeState<TMetrics, TParams> {
  const paramDef = model.parameters?.find((p) => p.id === paramId);
  let clampedVal = rawValue;
  if (paramDef) {
    clampedVal = Math.max(paramDef.min, Math.min(paramDef.max, rawValue));
  }

  const nextParams = {
    ...prev.params,
    [paramId]: clampedVal,
  } as TParams;

  const nextMetrics =
    prev.progress === 0
      ? model.getInitialMetrics(nextParams)
      : model.computeMetricsAtProgress(prev.progress, nextParams);

  return {
    ...prev,
    params: nextParams,
    metrics: nextMetrics,
    history: buildDeterministicHistory(model, prev.progress, nextParams),
  };
}

export function stepSimulationByDeltaSeconds<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>,
  model: SimulationScientificModel<TMetrics, TParams>,
  deltaRealSeconds: number
): SimulationRuntimeState<TMetrics, TParams> {
  if (prev.status !== 'running') return prev;
  if (deltaRealSeconds <= 0) return prev;

  const effectiveDeltaSeconds = deltaRealSeconds * prev.speed;
  const deltaProgress = effectiveDeltaSeconds / model.nominalDurationSeconds;
  const nextProgress = clampProgress(prev.progress + deltaProgress);
  const nextMetrics = model.computeMetricsAtProgress(nextProgress, prev.params);
  const nextStatus = nextProgress >= 1 ? 'completed' : 'running';

  return {
    ...prev,
    status: nextStatus,
    progress: nextProgress,
    elapsedTime: Number((nextProgress * model.nominalDurationSeconds).toFixed(2)),
    metrics: nextMetrics,
    history: buildDeterministicHistory(model, nextProgress, prev.params),
  };
}

export function jumpToSimulationProgress<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  prev: SimulationRuntimeState<TMetrics, TParams>,
  model: SimulationScientificModel<TMetrics, TParams>,
  targetProgress: number
): SimulationRuntimeState<TMetrics, TParams> {
  const clamped = clampProgress(targetProgress);
  const nextMetrics =
    clamped === 0
      ? model.getInitialMetrics(prev.params)
      : model.computeMetricsAtProgress(clamped, prev.params);
  return {
    ...prev,
    status: clamped === 0 ? 'stopped' : clamped >= 1 ? 'completed' : 'paused',
    progress: clamped,
    elapsedTime: Number((clamped * model.nominalDurationSeconds).toFixed(2)),
    metrics: nextMetrics,
    history: buildDeterministicHistory(model, clamped, prev.params),
  };
}

/**
 * Hook React générique du moteur de simulation.
 * Gère proprement requestAnimationFrame, le nettoyage des boucles, les paramètres
 * scientifiques manipulables, prefers-reduced-motion et la mise en pause hors écran.
 */
export function useSimulationEngine<
  TMetrics,
  TParams extends Record<string, number> = Record<string, number>,
>(
  model: SimulationScientificModel<TMetrics, TParams>,
  options?: SimulationEngineOptions<TParams>
) {
  const [state, setState] = useState<SimulationRuntimeState<TMetrics, TParams>>(() =>
    createInitialSimulationState(model, options)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const cancelAnimationLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    lastFrameTimeRef.current = null;
  }, []);

  // Détection système de prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setState((prev) => ({ ...prev, reducedMotion: true }));
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setState((prev) => ({
        ...prev,
        reducedMotion: e.matches,
        status: e.matches && prev.status === 'running' ? 'paused' : prev.status,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Arrêt automatique de l'animation lorsque la simulation sort de l'écran (Section 20)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          setState((prev) => (prev.status === 'running' ? pauseSimulationState(prev) : prev));
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Boucle d'animation principale (requestAnimationFrame)
  useEffect(() => {
    if (state.status !== 'running' || state.reducedMotion) {
      cancelAnimationLoop();
      return;
    }

    const tick = (timestamp: number) => {
      if (!isVisibleRef.current) {
        cancelAnimationLoop();
        return;
      }

      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const deltaMs = Math.min(100, Math.max(0, timestamp - lastFrameTimeRef.current));
      lastFrameTimeRef.current = timestamp;
      const deltaSeconds = deltaMs / 1000;

      if (deltaSeconds > 0) {
        setState((prev) => stepSimulationByDeltaSeconds(prev, model, deltaSeconds));
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationLoop();
  }, [state.status, state.reducedMotion, model, cancelAnimationLoop]);

  const start = useCallback(() => {
    setState((prev) => startSimulationState(prev, model));
  }, [model]);

  const pause = useCallback(() => {
    setState((prev) => pauseSimulationState(prev));
  }, []);

  const reset = useCallback(() => {
    cancelAnimationLoop();
    setState((prev) => resetSimulationState(prev, model));
  }, [model, cancelAnimationLoop]);

  const setSpeed = useCallback((speed: SimulationSpeed) => {
    setState((prev) => setSimulationSpeedState(prev, speed));
  }, []);

  const setParameter = useCallback(
    (paramId: string, value: number) => {
      setState((prev) => setSimulationParameterState(prev, model, paramId, value));
    },
    [model]
  );

  const setRepresentationMode = useCallback((representationMode: SimulationRepresentationMode) => {
    setState((prev) => ({ ...prev, representationMode }));
  }, []);

  const setInteractionMode = useCallback((interactionMode: SimulationInteractionMode) => {
    setState((prev) => ({ ...prev, interactionMode }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setState((prev) => {
      const nextReduced = !prev.reducedMotion;
      return {
        ...prev,
        reducedMotion: nextReduced,
        status: nextReduced && prev.status === 'running' ? 'paused' : prev.status,
      };
    });
  }, []);

  const setGuidedStepIndex = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      guidedStepIndex: Math.max(0, index),
    }));
  }, []);

  const jumpToProgress = useCallback(
    (targetProgress: number) => {
      cancelAnimationLoop();
      setState((prev) => jumpToSimulationProgress(prev, model, targetProgress));
    },
    [model, cancelAnimationLoop]
  );

  return {
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
  };
}
