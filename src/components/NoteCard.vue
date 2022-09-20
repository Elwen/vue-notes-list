<template>
  <div class="card">
    <div class="card__header">
      <h2 class="card__title">{{ title }}</h2>

      <div class="card__events">
        <button
          type="button"
          class="btn btn--icon"
          title="Редактировать заметку"
          @click="editNote"
        >
          <IconEdit height="16" />
        </button>

        <button
          type="button"
          class="btn btn--icon"
          title="Удалить заметку"
          @click="removeNote"
        >
          <IconDelete height="16" />
        </button>
      </div>
    </div>

    <div v-if="tasks.length">
      <NoteCardTask
        v-for="task in previewedTasks"
        :id="task.id"
        :key="task.id"
        :title="task.title"
        :done="task.done"
      />
    </div>
  </div>

  <PopupConfirm ref="confirmation"></PopupConfirm>
</template>

<script>
import { mapActions } from 'pinia';
import { useNotesStore } from '@/stores/notes.js';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import NoteCardTask from '@/components/NoteCardTask.vue';
import PopupConfirm from '@/components/PopupConfirm.vue';

export default {
  name: 'NoteCard',
  components: { IconEdit, IconDelete, NoteCardTask, PopupConfirm },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      previewedTasksCount: 2,
    };
  },
  computed: {
    previewedTasks() {
      return this.tasks.slice(0, this.previewedTasksCount);
    },
  },
  methods: {
    ...mapActions(useNotesStore, ['deleteNote']),
    editNote() {
      this.$router.push({ name: 'note', query: { id: this.id } });
    },
    async removeNote() {
      const ok = await this.$refs.confirmation.requestConfirm({
        actionName: 'удалить заметку',
      });
      if (ok) this.deleteNote(this.id);
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem 0.75rem;
}
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.125rem;
}
.card__title {
  margin-right: var(--base-gap);
  font-size: 1.25rem;
  line-height: 1.2;
}
.card__events {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
@media screen and (min-width: 64em) {
  .card__title {
    font-size: 1.5rem;
    line-height: 1.2;
  }
}
</style>
