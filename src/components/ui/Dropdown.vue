<template>
  <div class="dropdown">
    <div class="selected" @click="isMenuOpen = !isMenuOpen">
      <div class="selected-option option">
        <img
          class="selected-option-icon icon"
          v-show="selected.img"
          :src="selected.img"
          :alt="`${selected.text} icon`"
        />
        {{ selected.text }}
      </div>
      <DropdownIcon class="icon" />
    </div>
    <div class="list" v-show="isMenuOpen">
      <div
        class="list-option option"
        v-for="option in options"
        :key="option"
        v-show="options.length"
        @click="selectOption(option)"
      >
        <img
          class="list-option-icon icon"
          v-show="option.img"
          :src="option.img"
          :alt="`${option.text} icon`"
        />
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  name: 'Dropdown',
  components: {
    DropdownIcon,
  },
  data() {
    return {
      selected: {
        id: '',
        img: '',
        text: '',
      },
      isMenuOpen: false,
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: [],
    },
  },
  methods: {
    selectOption(option) {
      this.selected = option
      this.isMenuOpen = false
    },
  },
  created() {
    this.selected = this.placeholder
  },
}
</script>

<style scoped>
.dropdown {
  position: relative;
  min-height: 100%;
}

.selected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  background-color: var(--color-bg);
}

.icon {
  height: 2rem;
  width: 2rem;
}

.option {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.list {
  background-color: var(--color-bg-dark);
  border: 1px solid red;
  position: absolute;
  width: 100%;
}

.list-option:hover {
  background-color: var(--color-raised-bg);
}
</style>
