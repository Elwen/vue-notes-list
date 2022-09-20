import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    nextNoteId: 1,
  }),

  persist: true,

  getters: {
    getNotesList: (state) => {
      return state.notes;
    },
    getNoteById: (state) => {
      return (noteId) => state.notes.find(({ id }) => id === noteId);
    },
    getNoteIndex: (state) => {
      return (noteId) => state.notes.findIndex(({ id }) => id === noteId);
    },
    getNextNoteId: (state) => {
      return state.nextNoteId;
    },
  },

  actions: {
    addNote(note) {
      this.notes.push({
        id: this.nextNoteId++,
        title: note.title,
        tasks: note.tasks,
        nextTaskId: note.nextTaskId,
      });
    },
    updateNote(note) {
      this.notes[this.getNoteIndex(note.id)] = note;
    },
    deleteNote(id) {
      this.notes.splice(this.getNoteIndex(id), 1);
    },
    // undoLastEdit() {}, // TODO: вернуться к предыдущей версии
    // redoLastEdit() {}, // TODO: восстановить последнюю версию
  },
});
