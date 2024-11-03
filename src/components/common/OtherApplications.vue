<template>
  <div :style="styles">
    <p>Other applications:</p>
    <ul :style="listStyles">
      <li>ServerAPI with Angular, React, and Blazor clients</li>
      <li>WebAPI Data Traffic with NServiceBus</li>
      <li>Data Traffic with Custom Data Queue</li>
      <li>Add Services to WebAPI</li>
      <li>Hangfire, Postman and Swagger</li>
      <li>Docker, Docker Orchestration and Docker-Compose</li>
      <li>Orchestration with Kubernetes</li>
      <li>Security in Web Applications</li>
      <li>State Machine</li>
      <li>Broadcast Messaging in Angular</li>
      <li>Ramanujan's Factorial Approximation</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OtherApplications',
  data() {
    return {
      styles: {
        backgroundColor: 'rgb(20, 0, 80)',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      },
      listStyles: {
        listStyleImage: 'none',
        listStyleType: 'disc',
        paddingLeft: '20px',
      },
    };
  },
};
</script>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
