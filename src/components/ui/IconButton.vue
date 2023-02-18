<template>
  <div class="button-wrapper">
    <div
      v-if="type === 'button'"
      @mouseover="isMouseHovering = true"
      @focus="isMouseHovering = true"
      @mouseleave="isMouseHovering = false"
    >
      <button class="clickable-element">
        <slot>Missing icon component</slot>
      </button>
    </div>
    <div
      v-else-if="type === 'link'"
      @mouseover="isMouseHovering = true"
      @focus="isMouseHovering = true"
      @mouseleave="isMouseHovering = false"
    >
      <a :href="href" class="clickable-element">
        <slot>Missing icon component</slot>
      </a>
    </div>
    <div v-if="alt" v-show="isMouseHovering" class="tooltip">{{ alt }}</div>
  </div>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    type: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      isMouseHovering: false,
    }
  },
}
</script>

<style scoped>
.button-wrapper {
  /* Positioning and sizing */
  display: flex;
  justify-content: center;
  position: relative;
}

.clickable-element {
  /* Positioning and sizing */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  /* Element styles */
  color: var(--color-text);
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 50%;

  /* Padding and margins */
  padding: 0.25rem;

  /* Animations */
  transition: transform 0.25s ease-in-out;
  transition: background-color 0.15s ease-in-out;
}

.clickable-element:hover {
  /* Element styling */
  cursor: pointer;
  background-color: var(--color-raised-bg);
}

.clickable-element:active {
  /* Animations */
  transform: scale(0.9);
}

.tooltip {
  /* Positioning and sizing */
  position: absolute;
  top: 3rem;

  /* Element styling */
  background-color: var(--color-raised-bg);
  border: 1px solid var(--color-text);
  border-radius: 0.25rem;

  /* Font styling */
  font-size: var(--font-size-xs);
  white-space: nowrap;

  /* Padding and margins */
  padding: 0.5rem;
}
</style>
