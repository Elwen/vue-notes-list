<template>
  <h1 class="title">Список заметок</h1>

  <div v-if="notes.length" class="notes-list">
    <NoteCard
      v-for="note in notes"
      :id="note.id"
      :key="note.id"
      :title="note.title"
      :tasks="note.tasks"
    />
  </div>

  <div class="text-center">
    <button
      type="button"
      class="btn btn--with-icon btn--bordered"
      @click="$router.push({ name: 'note' })"
    >
      <IconPlus height="16" />
      <span>добавить заметку</span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useNotesStore } from '@/stores/notes.js';
import IconPlus from '@/components/icons/IconPlus.vue';
import NoteCard from '@/components/NoteCard.vue';

export default {
  name: 'NotesList',
  components: { IconPlus, NoteCard },
  computed: {
    ...mapState(useNotesStore, { notes: 'getNotesList' }),
  },
};
</script>

<style scoped>
.notes-list {
  display: flex;
  flex-direction: column;
  gap: var(--base-gap);
  margin-top: var(--base-gap);
  margin-bottom: var(--base-gap);
}
</style>
