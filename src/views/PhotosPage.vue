<template>
  <div class="container">
    <div class="row">
      <div class="row-height col">
        <div
          class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4>{{ albumCaption }}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-md-height">
          <div class="row">
            <div class="buttonbar buttonbar-top">
              <router-link to="/albums">
                <img alt="" src="/assets/images/button-gallery.gif" />
              </router-link>
            </div>
            <div class="row justify-content-md-center">
              <div class="col-xs-6"></div>
              <div class="col-md-auto">
                <font-awesome-icon icon="spinner" size="2x" spin :style="{ opacity: opacity }" />
              </div>
            </div>
            <div class="col-md-12">
              <table class="view" style="border-collapse: collapse;">
                <tbody>
                  <!-- Check if photoRows is empty -->
                  <tr v-if="!isAuthorized && photoRows.length === 0">
                    <td>
                      <h4>Album empty</h4>
                    </td>
                  </tr>

                  <!-- Display rows if photoRows is not empty -->
                  <tr v-for="(row, rowIndex) in photoRows" :key="rowIndex">
                    <td v-for="(photo, index) in row" :key="5 * rowIndex + index">
                      <!-- Calculate newIndex -->
                      <template v-if="photo.photoID === 0">
                        <TextAreaInput v-model="dragAndDropPhotoCaption" placeholder="Enter caption" :hasError="false"
                          @textChanged="(value) => handleDragAndDropPhotoCaptionChanged(value)" />
                        <photo-frame :defaultImage="true">
                          <file-upload-function :albumId="albumId" :caption="dragAndDropPhotoCaption"
                            :onPhotoAdded="handlePhotoAdded" />
                        </photo-frame>
                      </template>

                      <!-- Default case for regular photos -->
                      <template v-else>
                        <div v-if="isAuthorized">
                          <TextAreaInput v-model="captions[5 * rowIndex + index]" placeholder="Enter caption"
                            :hasError="false"
                            @textChanged="(value) => handleCaptionChange(value, 5 * rowIndex + index)" />
                        </div>
                        <div v-else>{{ captions[5 * rowIndex + index] }}</div>

                        <photo-frame>
                          <div class="fade-in-animation">
                            <router-link :to="`/photodetails/${photo.photoID}`">
                              <img :src="imageUrl(photo)" alt="" style="border: 4px solid white" />
                            </router-link>
                          </div>
                        </photo-frame>

                        <div v-if="isAuthorized">
                          <a @click="toggleDelete(5 * rowIndex + index)" style="margin-right: 10px;">
                            <font-awesome-icon icon="trash" size="1x" />
                          </a>

                          <!-- Delete Confirmation Modal -->
                          <delete-confirmation v-if="showDeleteConfirmationModals[5 * rowIndex + index]"
                            :key="5 * rowIndex + index" :showModal="showDeleteConfirmationModals[5 * rowIndex + index]"
                            :confirmModal="() => handleDelete(5 * rowIndex + index)"
                            :hideModal="() => toggleDelete(5 * rowIndex + index)"
                            :message="`Do you want to remove ${photo.caption}?`" />

                          <a @click="handleUpdate(5 * rowIndex + index)" style="margin-left: 10px;">
                            <font-awesome-icon icon="save" size="1x" />
                          </a>
                        </div>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import PhotoFrame from '../photos/PhotoFrame.vue';
  import FileUploadFunction from '../photos/FileUploadFunction.vue';
  import TextAreaInput from '../components/common/TextAreaInput.vue';
  import DeleteConfirmation from '../components/common/DeleteConfirmation.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { useApiAddress, useIsAuthorized, useLoading, useToken } from '../providers/useGlobalState';
  import * as apiClient from '../helpers/ApiHelpers';
  
  export default {
    name: 'PhotosPage',
    components: {
      PhotoFrame,
      FileUploadFunction,
      TextAreaInput,
      DeleteConfirmation,
      FontAwesomeIcon
    },
    setup() {
      // Global state hooks
      const { apiAddress } = useApiAddress();
      const { isAuthorized } = useIsAuthorized();
      const { token } = useToken();
      const { loading, setLoading } = useLoading();

      // Reactive states
      const opacity = computed(() => (loading.value ? 1 : 0));
      const imageUrl = (photo) => {
        return `${apiAddress.value}/RandomHandler/Index/PhotoID=${photo.photoID}/Size=M`;
      };


      // Local state
      const route = useRoute();
      const albumId = ref(parseInt(route.params.albumId));
      const albumCaption = ref('');;
      const photos = ref([]);
      const captions = ref([]);
      const showDeleteConfirmationModals = ref([]);
      const dragAndDropPhotoCaption = ref('');
      const selectedIndex = ref(-1);

      // Fetch photos on mount
      const fetchPhotos = async () => {
        setLoading(true);
        let response = await apiClient.getHelper(`${apiAddress.value}/api/photos/album/${albumId.value}`);
        if (isAuthorized.value) {
          response = addDefaultImage(response)
        }
        photos.value = response;
        captions.value = response.map(p => p.caption);

        if (response.length > 0) {
          albumCaption.value = response[0]?.albumCaption ?? 'No album caption available';
        } else {
          if (albumId.value > 0) {
            const album = await apiClient.getHelper(`${apiAddress.value}/api/albums/${albumId.value}`);
            albumCaption.value = album.caption;
          }
        }

        showDeleteConfirmationModals.value = response.map(() => false);

        setLoading(false);
      };
  
      onMounted(fetchPhotos);
   
      // Handle caption change
      const handleCaptionChange = (value, index) => {
        captions.value[index] = value;
      };
  
      // Handle photo addition
      const handlePhotoAdded = async () => {
        await fetchPhotos();
        dragAndDropPhotoCaption.value = '';
      };
  
      // Handle new caption input
      const handleDragAndDropPhotoCaptionChanged = (value) => {
        dragAndDropPhotoCaption.value = value;
      };
  
      // Handle photo deletion
      const handleDelete = async (index) => {
        setLoading(true);
        await apiClient.deleteHelper(`${apiAddress.value}/api/photos/delete/${photos.value[index].photoID}`, token.value);
        photos.value.splice(index, 1);
        captions.value.splice(index, 1);
        showDeleteConfirmationModals.value.splice(index, 1);
        setLoading(false);
      };
  
      // Toggle delete confirmation modal
      const toggleDelete = (index) => {
        showDeleteConfirmationModals.value[index] = !showDeleteConfirmationModals.value[index];
      };
  
      // Handle photo update
      const handleUpdate = async (index) => {
        selectedIndex.value = index;
        setLoading(true);
        await apiClient.putHelper(`${apiAddress.value}/api/photos/update/${photos.value[index].photoID}`, captions.value[index], token.value);
        setLoading(false);
      };
  
      // Compute photo rows
      const photoRows = computed(() => {
        const rows = [];
        for (let i = 0; i < photos.value.length; i += 5) {
          rows.push(photos.value.slice(i, i + 5));
        }

        return rows;
      });

      const addDefaultImage = (responsePhotos) => {
          const emptyPhoto = { "photoID": 0, "albumID": albumId.value, "caption": "", "albumCaption":"" };
          responsePhotos = [...responsePhotos, emptyPhoto];
          return responsePhotos;
      };

      watch(
      () => isAuthorized.value,
      async () => {
        await fetchPhotos();
      },
      { immediate: true } // Trigger immediately on component mount
    );
  
      return {
        albumId,
        albumCaption,
        photos,
        captions,
        showDeleteConfirmationModals,
        dragAndDropPhotoCaption,
        selectedIndex,
        handleCaptionChange,
        handleDragAndDropPhotoCaptionChanged,
        handlePhotoAdded,
        handleUpdate,
        handleDelete,
        toggleDelete,
        photoRows,
        apiAddress,
        isAuthorized,
        opacity,
        imageUrl
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  