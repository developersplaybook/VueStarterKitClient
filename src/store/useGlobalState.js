import { computed } from 'vue';
import { useStore } from 'vuex';

export function useLoading() {
  const store = useStore();

  return {
    loading: computed(() => store.getters.loading),
    setLoading: (value) => store.dispatch('setLoading', value),
  };
}

export function useShowLoginModal() {
  const store = useStore();

  return {
    showLoginModal: computed(() => store.getters.showLoginModal),
    setShowLoginModal: (value) => store.dispatch('setShowLoginModal', value),
  };
}

export function useApiAddress() {
  const store = useStore();

  return {
    apiAddress: computed(() => store.getters.apiAddress),
    setApiAddress: (address) => store.dispatch('setApiAddress', address),
  };
}

export function useIsAuthorized() {
  const store = useStore();

  return {
    isAuthorized: computed(() => store.getters.isAuthorized),
    setIsAuthorized: (isAuthorized) => store.dispatch('setIsAuthorized', isAuthorized),
  };
}

export function useToken() {
  const store = useStore();

  return {
    token: computed(() => store.getters.token),
    setToken: (token) => store.dispatch('setToken', token),
  };
}
