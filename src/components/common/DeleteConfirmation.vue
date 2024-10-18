<template>
  <div v-if="localShowModal" class="modal-overlay">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title h4">
            Confirm deletion
          </div>
        </div>
        <div class="alert alert-danger">
            {{ message }}
          </div>
        <div class="modal-body">
          <button @click="handleClose" class="btn btn-secondary">Cancel</button>
          <button @click="confirmModal" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'DeleteConfirmation',
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    confirmModal: {
      type: Function,
      required: true,
    },
    hideModal: {
      type: Function,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const localShowModal = ref(props.showModal);

    watch(() => props.showModal, (newVal) => {
      localShowModal.value = newVal;
    });

    watch(() => localShowModal.value, (newVal) => {
      if (!newVal) {
        props.hideModal();
      }
    });

    const handleClose = () => {
      localShowModal.value = false;
    };

    return {
      localShowModal,
      handleClose,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1); /* Lighter opacity for the background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-dialog {
  z-index: 10000; /* higher than the overlay */
}
</style>
