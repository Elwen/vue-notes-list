<template>
  <div class="popup" v-if="isVisible">
    <slot name="text"></slot>
    <div class="popup__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background-mute);
  padding: 0.75rem 1rem 1rem;
  text-align: center;
  z-index: 1;
}
.popup__actions {
  display: flex;
  justify-content: center;
  gap: var(--base-gap);
  margin-top: 0.75rem;
}
</style>
