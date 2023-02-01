<template>
  <img
    v-if="src"
    ref="img"
    :class="`avatar size-${size} ${circle ? 'circle' : ''} ${
      noShadow ? 'no-shadow' : ''
    }`"
    :src="src"
    :alt="alt"
    :loading="loading"
  />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'sm',
      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value)
      },
    },
    circle: {
      type: Boolean,
      default: false,
    },
    noShadow: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: String,
      default: 'eager',
    },
  },
  mounted() {
    // smthin
  },
}
</script>

<style scoped></style>
