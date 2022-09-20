<template>
  <PopUp ref="popup">
    <template #text>
      <p>Вы действительно хотите {{ actionName }}?</p>
    </template>
    <template #actions>
      <button type="button" @click="cancelConfirm">Отменить</button>
      <button type="button" @click="acceptConfirm">Подтвердить</button>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/PopUp.vue';

export default {
  name: 'PopUpConfirm',
  components: { PopUp },
  data() {
    return {
      actionName: '',
      resolvePromise: undefined,
      rejectPromise: undefined,
    };
  },
  methods: {
    requestConfirm(options) {
      this.actionName = options.actionName;
      this.$refs.popup.open();
      return new Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    },
    cancelConfirm() {
      this.$refs.popup.close();
      this.resolvePromise(false);
    },
    acceptConfirm() {
      this.$refs.popup.close();
      this.resolvePromise(true);
    },
  },
};
</script>
