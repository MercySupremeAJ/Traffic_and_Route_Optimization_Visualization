/**
 * useAlgorithm — Core animation engine hook
 * Manages the state machine for algorithm visualization:
 * IDLE → RUNNING → PAUSED → COMPLETE
 * Uses useReducer for predictable state transitions.
 */
import { useReducer, useEffect, useCallback, useRef } from 'react';

// States
export const STATES = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETE: 'COMPLETE',
};

// Actions
const ACTIONS = {
  SET_STEPS: 'SET_STEPS',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  RESET: 'RESET',
  STEP_FORWARD: 'STEP_FORWARD',
  STEP_BACKWARD: 'STEP_BACKWARD',
  TICK: 'TICK',
  SET_SPEED: 'SET_SPEED',
  COMPLETE: 'COMPLETE',
};

const initialState = {
  status: STATES.IDLE,
  steps: [],
  currentStepIndex: 0,
  speed: 500, // ms between steps (lower = faster)
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STEPS:
      return {
        ...state,
        steps: action.payload,
        currentStepIndex: 0,
        status: STATES.IDLE,
      };

    case ACTIONS.PLAY:
      if (state.steps.length === 0) return state;
      return {
        ...state,
        status: STATES.RUNNING,
        currentStepIndex: state.status === STATES.COMPLETE ? 0 : state.currentStepIndex,
      };

    case ACTIONS.PAUSE:
      return { ...state, status: STATES.PAUSED };

    case ACTIONS.RESUME:
      return { ...state, status: STATES.RUNNING };

    case ACTIONS.RESET:
      return {
        ...state,
        status: STATES.IDLE,
        currentStepIndex: 0,
      };

    case ACTIONS.STEP_FORWARD: {
      if (state.steps.length === 0) return state;
      const nextIndex = Math.min(state.currentStepIndex + 1, state.steps.length - 1);
      const isDone = nextIndex === state.steps.length - 1;
      return {
        ...state,
        currentStepIndex: nextIndex,
        status: isDone ? STATES.COMPLETE : (state.status === STATES.IDLE ? STATES.PAUSED : state.status),
      };
    }

    case ACTIONS.STEP_BACKWARD: {
      if (state.steps.length === 0) return state;
      const prevIndex = Math.max(state.currentStepIndex - 1, 0);
      return {
        ...state,
        currentStepIndex: prevIndex,
        status: state.status === STATES.COMPLETE ? STATES.PAUSED : state.status,
      };
    }

    case ACTIONS.TICK: {
      const nextIndex = state.currentStepIndex + 1;
      if (nextIndex >= state.steps.length) {
        return { ...state, status: STATES.COMPLETE, currentStepIndex: state.steps.length - 1 };
      }
      return { ...state, currentStepIndex: nextIndex };
    }

    case ACTIONS.SET_SPEED:
      return { ...state, speed: action.payload };

    case ACTIONS.COMPLETE:
      return { ...state, status: STATES.COMPLETE };

    default:
      return state;
  }
}

export function useAlgorithm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef(null);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Manage the animation loop
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (state.status === STATES.RUNNING) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, state.speed);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.status, state.speed]);

  const setSteps = useCallback((steps) => {
    dispatch({ type: ACTIONS.SET_STEPS, payload: steps });
  }, []);

  const play = useCallback(() => {
    dispatch({ type: ACTIONS.PLAY });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  const stepForward = useCallback(() => {
    if (state.status === STATES.RUNNING) {
      dispatch({ type: ACTIONS.PAUSE });
    }
    dispatch({ type: ACTIONS.STEP_FORWARD });
  }, [state.status]);

  const stepBackward = useCallback(() => {
    if (state.status === STATES.RUNNING) {
      dispatch({ type: ACTIONS.PAUSE });
    }
    dispatch({ type: ACTIONS.STEP_BACKWARD });
  }, [state.status]);

  const setSpeed = useCallback((speed) => {
    dispatch({ type: ACTIONS.SET_SPEED, payload: speed });
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.status === STATES.RUNNING) {
      pause();
    } else if (state.status === STATES.PAUSED) {
      resume();
    } else {
      play();
    }
  }, [state.status, play, pause, resume]);

  // Derived values
  const currentStep = state.steps[state.currentStepIndex] || null;
  const progress = state.steps.length > 0
    ? (state.currentStepIndex / (state.steps.length - 1)) * 100
    : 0;
  const totalSteps = state.steps.length;
  const isPlaying = state.status === STATES.RUNNING;
  const isPaused = state.status === STATES.PAUSED;
  const isComplete = state.status === STATES.COMPLETE;
  const isIdle = state.status === STATES.IDLE;

  return {
    // State
    status: state.status,
    currentStep,
    currentStepIndex: state.currentStepIndex,
    steps: state.steps,
    speed: state.speed,
    progress,
    totalSteps,
    isPlaying,
    isPaused,
    isComplete,
    isIdle,

    // Actions
    setSteps,
    play,
    pause,
    resume,
    reset,
    stepForward,
    stepBackward,
    setSpeed,
    togglePlayPause,
  };
}
