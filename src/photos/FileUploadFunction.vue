<template>
  <div>
    <label for="upload-button">
      <img v-if="image.preview" :src="image.preview" alt="preview" />
      <div
        v-else
        :class="['drag-drop-zone', { 'inside-drag-area': dropState.inDropZone }]"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
      >
        <strong class="text-center">Drag the file here...</strong>
        <br />
        <strong class="text-center">or use file picker!</strong>
      </div>
    </label>
    <input
      type="file"
      id="upload-button"
      style="display: none"
      @change="handleChange"
    />
    <div v-if="image.preview">
      <br />
      <button @click="handleCancel">
        <font-awesome-icon 
        icon="times" 
        size="2x" />
      </button>
      <button v-if="showSave" @click="handleUpload">
        <font-awesome-icon 
        icon="save" 
        size="2x" />
      </button>
      <font-awesome-icon
        icon="spinner"
        size="2x"
        spin
        :style="{ opacity: opacity }"
      />
    </div>
  </div>
</template>


<script>
import { ref, reactive, computed, watch } from 'vue';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress, useToken, useLoading } from '../store/useGlobalState';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'FileUploadFunction',
  components: {
    FontAwesomeIcon,
  },
  props: {
    albumId: {
      type: Number,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    onPhotoAdded: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const image = ref({ preview: '', raw: null });
    const { apiAddress } = useApiAddress();
    const { token } = useToken();
    const { loading, setLoading } = useLoading();
    const opacity = computed(() => (loading.value ? 1 : 0));
    const photoCaption = ref(props.caption);

    watch(() => props.caption, (newCaption) => {
      console.log("FileUplaodFunction newCaption:", newCaption)
      photoCaption.value = newCaption;
    });

    const showSave = computed(()=> photoCaption.value && photoCaption.value.trim()!=='');

    const dropState = reactive({
      dropDepth: 0,
      inDropZone: false,
      fileList: [],
    });

    const updateImage = (files) => {
      if (files.length > 0) {
        image.value = {
          preview: URL.createObjectURL(files[0]),
          raw: files[0],
        };
      }
    };

    const handleChange = (e) => {
      updateImage(e.target.files);
    };

    const handleUpload = async (e) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.append('Image', image.value.raw);
      formData.append('AlbumId', props.albumId);
      formData.append('Caption', photoCaption.value);

      try {
        const response = await apiClient.postImageHelper(
          `${apiAddress.value}/api/photos/add/`,
          formData,
          token.value
        );
        props.onPhotoAdded(response);
        image.value = { preview: '', raw: null };
      } catch (error) {
        alert('Error connecting to server: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    const handleCancel = (e) => {
      e.preventDefault();
      image.value = { preview: '', raw: null };
    };

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropState.dropDepth += 1;
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropState.dropDepth -= 1;
      if (dropState.dropDepth === 0) {
        dropState.inDropZone = false;
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      dropState.inDropZone = true;
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        updateImage(files);
        const existingFileNames = new Set(dropState.fileList.map((f) => f.name));
        const newFiles = files.filter((file) => !existingFileNames.has(file.name));
        dropState.fileList.push(...newFiles);
        dropState.dropDepth = 0;
        dropState.inDropZone = false;
      }
    };

    return {
      photoCaption,
      showSave,
      image,
      dropState,
      loading,
      handleChange,
      handleUpload,
      handleCancel,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      opacity,
    };
  },
};

</script>

<style scoped>
.drag-drop-zone {
  border: 2px dashed #cccccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.inside-drag-area {
  border-color: #00ff00;
}
</style>
