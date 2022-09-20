<template>
  <div class="form-task">
    <input
      type="checkbox"
      class="checkbox"
      v-model="localTask.done"
      @change="updateDone"
    />
    <textarea
      class="input input--textarea"
      v-model.trim="localTask.title"
      @change="updateTitle"
      required
    ></textarea>
    <button
      type="button"
      class="btn btn--icon"
      title="Удалить заметку"
      @click="deleteTask"
    >
      <IconDelete height="16" />
    </button>
  </div>
</template>

<script>
import IconDelete from '@/components/icons/IconDelete.vue';

export default {
  name: 'FormTask',
  components: { IconDelete },
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localTask: {},
    };
  },
  created() {
    this.localTask = { ...this.task };
  },
  methods: {
    updateDone(e) {
      this.$emit('updateStatus', e.target.checked, this.task.id);
    },
    updateTitle(e) {
      this.$emit('updateTitle', e.target.value, this.task.id);
    },
    deleteTask() {
      this.$emit('deleteTask', this.task.id);
    },
  },
};
</script>

<style scoped>
.form-task {
  display: flex;
  gap: 1rem;
}
.form-task__checkbox {
  accent-color: var(--vt-c-green-light);
}
</style>
