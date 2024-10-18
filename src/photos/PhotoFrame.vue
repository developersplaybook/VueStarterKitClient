<template>
  <table
    class="photo-frame"
    :style="{
      minHeight: '200px',
      visibility: hidden ? 'hidden' : 'visible',
      backgroundImage: defaultImage
        ? 'url(/assets/images/default-image.png)'
        : null,
      backgroundPosition: defaultImage ? 'center' : null,
    }"
  >
    <tbody>
      <tr>
        <td class="topx--"></td>
        <td class="top-x-"></td>
        <td class="top--x"></td>
      </tr>
      <tr>
        <td class="midx--"></td>
        <td><slot ></slot></td>
        <td class="mid--x"></td>
      </tr>
      <tr>
        <td class="botx--"></td>
        <td class="bot-x-"></td>
        <td class="bot--x"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PhotoFrame", // Corrected this line
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
    defaultImage: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

