<template>
  <h1 class="title">Заметка</h1>

  <form class="form" @submit.prevent="saveNote">
    <div class="form__row">
      <label for="title" class="form__label">Заголовок</label>
      <textarea
        class="input input--textarea"
        id="title"
        v-model.trim="note.title"
        required
      ></textarea>
    </div>

    <div class="form__tasks">
      <span class="form__label">Задачи</span>
      <button
        type="button"
        class="btn btn--with-icon"
        title="Добавить задачу"
        @click="createTask"
      >
        <IconPlus height="16" />
        <span>добавить</span>
      </button>

      <div class="form__tasks-list" v-if="tasks">
        <FormTask
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @updateStatus="updateTaskStatus"
          @updateTitle="updateTaskTitle"
          @deleteTask="deleteTask"
        />
      </div>
    </div>

    <div class="form__actions">
      <button
        type="button"
        class="btn btn--with-icon"
        title="Отменить правки"
        @click="cancelUpdate"
      >
        <IconCancel height="16" />
        <span>отменить</span>
      </button>

      <button
        type="button"
        class="btn btn--with-icon"
        title="Удалить заметку"
        v-if="method === 'update'"
        @click="removeNote"
      >
        <IconDelete height="16" />
        <span>удалить</span>
      </button>

      <button
        type="submit"
        class="btn btn--with-icon"
        title="Сохранить заметку"
      >
        <IconSave height="16" />
        <span>сохранить</span>
      </button>
    </div>
  </form>

  <PopupConfirm ref="confirmation"></PopupConfirm>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useNotesStore } from '@/stores/notes.js';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconSave from '@/components/icons/IconSave.vue';
import FormTask from '@/components/FormTask.vue';
import PopupConfirm from '@/components/PopupConfirm.vue';

export default {
  name: 'NoteForm',
  components: {
    IconPlus,
    IconCancel,
    IconDelete,
    IconSave,
    FormTask,
    PopupConfirm,
  },
  setup() {
    const store = useNotesStore();
    return { getNoteById: store.getNoteById };
  },
  data() {
    return {
      method: 'add',
      note: {},
      tasks: [],
    };
  },
  computed: {
    ...mapState(useNotesStore, {
      nextNoteId: 'getNextNoteId',
    }),
  },
  mounted() {
    if (this.$route.query?.id) {
      this.method = 'update';
      this.note = { ...this.getNoteById(+this.$route.query.id) };
      if (!Object.keys(this.note).length) {
        this.goToNotesList();
      }
      this.tasks = [...this.note.tasks];
    }
    this.note.nextNoteId = 0;
  },
  methods: {
    ...mapActions(useNotesStore, ['addNote', 'updateNote', 'deleteNote']),
    goToNotesList() {
      this.$router.push({ name: 'home' });
    },
    createTask() {
      this.note.nextTaskId = this.note.nextTaskId || 0;
      this.tasks = [
        ...this.tasks,
        {
          id: this.note.nextTaskId++,
          title: '',
          done: false,
        },
      ];
    },
    getTaskIndex(taskId) {
      return this.tasks.findIndex(({ id }) => id === taskId);
    },
    updateTaskStatus(value, id) {
      const index = this.getTaskIndex(id);
      this.tasks[index].done = value;
    },
    updateTaskTitle(value, id) {
      const index = this.getTaskIndex(id);
      this.tasks[index].title = value;
    },
    deleteTask(id) {
      this.tasks.splice(
        this.tasks.findIndex((task) => task.id === id),
        1,
      );
    },
    saveNote() {
      this.note.tasks = this.tasks;
      if (this.method === 'update') {
        this.updateNote(this.note);
      } else {
        this.addNote(this.note);
        this.method = 'update';
        this.$router.replace({ query: { id: this.nextNoteId - 1 } });
      }
    },
    async removeNote() {
      const ok = await this.$refs.confirmation.requestConfirm({
        actionName: 'удалить заметку',
      });
      if (ok) {
        this.deleteNote(this.id);
        this.goToNotesList();
      }
    },
    async cancelUpdate() {
      // Если форма пустая, то сразу возвращаемся к списоку заметок
      if (Object.keys(this.note).length) {
        const ok = await this.$refs.confirmation.requestConfirm({
          actionName: 'отменить правки',
        });
        if (ok) {
          this.goToNotesList();
        }
      }
      this.goToNotesList();
    },
  },
};
</script>

<style scoped>
.form {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--base-gap);
}
.form__row {
  display: flex;
  flex-direction: column;
}
.form__label {
  display: inline-block;
  margin-right: var(--base-gap);
  margin-bottom: 0.5rem;
}
.form__tasks {
  margin-top: var(--base-gap);
}
.form__tasks-list {
  display: flex;
  flex-direction: column;
  gap: var(--base-gap);
}
.form__actions {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: var(--base-gap);
  margin-top: var(--base-gap);
}
@media screen and (min-width: 40em) {
  .form__actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}
@media screen and (min-width: 64em) {
  .form__row {
    flex-direction: row;
    align-items: center;
  }
  .form__label {
    min-width: 5.1rem;
    margin-bottom: 0;
  }
  .form__tasks-list {
    margin-left: calc(5.1rem + var(--base-gap));
  }
}
</style>
