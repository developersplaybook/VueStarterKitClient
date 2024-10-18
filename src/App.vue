<template>
  <GlobalStateProvider>
    <FrameBar>
      <router-view></router-view>
    </FrameBar>
  </GlobalStateProvider>
</template>

<script setup>

import GlobalStateProvider from "./providers/GlobalStateProvider.vue";
import FrameBar from "./components/navbar/FrameBar.vue";
</script>
