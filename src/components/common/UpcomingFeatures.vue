<template>
  <div :style="styles">
    <p>Planned features:</p>
    <ul :style="listStyles">
      <li>React with Typescript</li>
      <li>Vite as an alternative to react-scripts for building React applications</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UpcomingFeatures',
  data() {
    return {
      styles: {
        backgroundColor: 'rgb(20, 0, 80)',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      },
      listStyles: {
        listStyleImage: 'none',
        listStyleType: 'disc',
        paddingLeft: '20px'
      }
    };
  }
};
</script>

<style scoped>
/* You can add scoped CSS styles here if needed */
</style>
