<!-- GlobalStateProvider.vue -->
<template>
  <slot />
</template>

<script setup>
import { provide } from 'vue';
import { createGlobalState, GlobalStateKey, GlobalDispatchKey } from './useGlobalState.js';

// Create and provide the global state and dispatch
const { state, dispatch } = createGlobalState();
provide(GlobalStateKey, state);
provide(GlobalDispatchKey, dispatch);
</script>
