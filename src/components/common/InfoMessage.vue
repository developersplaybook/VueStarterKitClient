<template>
  <div :style="styles">
    <p>
      Thank you for purchasing <em>The Aspiring Full Stack Developer's Playbook: From AI to Microservices and Kubernetes</em>.
      I hope you find the book and the accompanying code both enjoyable and practically useful.
    </p>
    <p :style="redStyles">Don't forget to leave a review on Amazon!</p>
    <p>
      If you have any questions or feedback, feel free to email me&mdash;my contact information is in the book.
    </p>
    <p>Please check:</p>
    <ul :style="{ listStyleImage: 'none', listStyleType: 'disc', paddingLeft: '20px' }">
      <li>Authorization with JSON WebToken</li>
      <li>File upload with drag & drop</li>
      <li>State Management with Vuex</li>
      <li>Storage of passwords and secret keys</li>
      <li>Unobtrusive validation</li>
      <li>SQLite database</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styles: {
        backgroundColor: 'rgb(20, 0, 80)',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      },
      redStyles: {
        backgroundColor: 'rgb(20, 0, 80)',
        color: 'red',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }
    };
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
