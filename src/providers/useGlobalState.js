// useGlobalState.js
import { inject, computed, reactive } from 'vue';

// Define keys for providing/injecting
export const GlobalStateKey = Symbol('GlobalState');
export const GlobalDispatchKey = Symbol('GlobalDispatch');

const initialState = {
  loading: false,
  apiAddress: process.env.VUE_APP_API_ADDRESS || 'default value',
  isAuthorized: false,
  token: null,
};

// Action types
export const SET_LOADING = 'SET_LOADING';
export const SET_APIADDRESS = 'SET_APIADDRESS';
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
export const SET_TOKEN = 'SET_TOKEN';

// Create the global state and reducer-like function
export function createGlobalState() {
  const state = reactive({ ...initialState });

  function dispatch(action) {
    switch (action.type) {
      case SET_LOADING:
        state.loading = action.payload;
        break;
      case SET_APIADDRESS:
        state.apiAddress = action.payload;
        break;
      case SET_IS_AUTHORIZED:
        state.isAuthorized = action.payload;
        break;
      case SET_TOKEN:
        state.token = action.payload;
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  return { state, dispatch };
}


// Custom hook to use global state
export function useGlobalState() {
  const state = inject(GlobalStateKey);
  if (!state) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
}

// Custom hook to use global dispatch
export function useGlobalDispatch() {
  const dispatch = inject(GlobalDispatchKey);
  if (!dispatch) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
}

// Custom hooks for specific state and dispatch actions
export function useLoading() {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return {
    loading: computed(() => state.loading),
    setLoading: (value) => dispatch({ type: SET_LOADING, payload: value }),
  };
}

export function useApiAddress() {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return {
    apiAddress: computed(() => state.apiAddress),
    setApiAddress: (address) => dispatch({ type: SET_APIADDRESS, payload: address }),
  };
}

export function useIsAuthorized() {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return {
    isAuthorized: computed(() => state.isAuthorized),
    setIsAuthorized: (isAuthorized) => dispatch({ type: SET_IS_AUTHORIZED, payload: isAuthorized }),
  };
}

export function useToken() {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  return {
    token: computed(() => state.token),
    setToken: (token) => dispatch({ type: SET_TOKEN, payload: token }),
  };
}
