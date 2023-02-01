<template>
  <button
    v-for="guild in guilds"
    v-show="new RegExp(`${searchInput}`, 'i').test(guild.name)"
    :key="guild"
    class="item"
    :class="{ selected: selected === guild.id }"
    @click="toggleItem(guild)"
  >
    <img
      :src="guildIconUrl(guild)"
      :alt="`Server icon for server ${guild.name}`"
    />
    <span>{{ guild.name }}</span>
  </button>
</template>

<script>
import { useGuildStore } from '@/stores/guild'
import placeholderImage from '@/assets/images/utils/icon_placeholder.png'

export default {
  name: 'GuildListItem',
  setup() {
    const guildStore = useGuildStore()
    return { guildStore }
  },
  data() {
    return {
      selected: null,
    }
  },
  props: {
    guilds: {
      default: [],
      required: true,
      type: Array,
    },
    searchInput: {
      default: '',
      type: String,
    },
  },
  methods: {
    guildIconUrl(guild) {
      return guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
        : placeholderImage
    },
    toggleItem(guild) {
      this.selected = guild.id
    },
  },
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-bg);
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 0.5rem;
}

.item:hover {
  cursor: pointer;
  background-color: var(--color-raised-bg);
  transition: background-color 0.15s ease-in-out;
}

.item > img {
  border-radius: var(--size-rounded-xs);
  height: 2.5rem;
  width: 2.5rem;
}

.item > span {
  margin-left: 0.5rem;
  color: var(--color-text-dark);
}

.selected {
  background-color: var(--color-raised-bg);
}
</style>
