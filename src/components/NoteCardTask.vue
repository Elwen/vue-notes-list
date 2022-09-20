<template>
  <div>
    <input
      type="checkbox"
      class="checkbox task-checkbox"
      :checked="done"
      :id="`task-${id}`"
      disabled
    />
    <label :for="`task-${id}`">{{ title }}</label>
  </div>
</template>

<script>
export default {
  name: 'NoteCardTask',
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.task-checkbox {
  margin-right: 0.5rem;
  vertical-align: middle;
}
</style>
