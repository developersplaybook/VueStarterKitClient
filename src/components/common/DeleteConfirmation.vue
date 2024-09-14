<template>
  <div v-if="localShowModal" class="modal-container">
    <!-- Modal Overlay -->
    <div class="modal-overlay"></div>
    
    <!-- Modal Dialog -->
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title h4">Confirm deletion</h5>
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

    // Watch for prop changes to update localShowModal
    watch(() => props.showModal, (newVal) => {
      localShowModal.value = newVal;
    });

    // Watch for localShowModal changes to call hideModal
    watch(() => localShowModal.value, (newVal) => {
      if (!newVal) {
        props.hideModal();
      }
    });

    // Handle modal close
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100; /* Ensure it covers other content */
}

.modal-dialog {
  position: absolute;
  top: 40%; 
  left: inherit;
  transform: translate(-50%, -50%);
  z-index: 101; /* Ensure it is above the overlay */
  width: auto;
  max-width: 90%;
}
</style>

