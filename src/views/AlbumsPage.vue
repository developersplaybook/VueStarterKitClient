handleAdd<template>
  <div class="container">
    <div class="row">
      <div class="row-height col">
        <div
          class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4>Photo albums</h4>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-md-height">
          <div class="row">
            <font-awesome-icon icon="spinner" size="2x" spin style="text-align:center" :style="{ opacity: opacity }" />
            <table class="album-frame" style="font-size: 10px; font-family: verdana, arial, helvetica, sans-serif;">
              <tbody>
                <tr v-for="(row, index) in albumRows" :key="index">
                  <td v-for="(album, idx) in row" :key="album.albumID">
                    <album-frame :album-id="album.albumID" :photo-count="album.photoCount" :caption="album.caption"
                      :item-count="idx" :delete="() => handleDelete(album.albumID)"
                      :update="(caption) => handleUpdate(album.albumID, caption)"
                      :add="(caption) => handleAdd(album.albumID, caption)" :hasError="!!errorStates[album.albumID]"
                      :onCaptionChange="(newCaption) => handleCaptionChange(album.albumID, newCaption)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import * as apiClient from '../helpers/ApiHelpers';
import { useApiAddress, useIsAuthorized, useLoading, useToken } from '../store/useGlobalState';
import AlbumFrame from '../components/albums/AlbumFrame.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'AlbumsPage',
  components: {
    AlbumFrame,
    FontAwesomeIcon
  },
  setup() {
    // Using hooks
    const albums = ref([]);
    const setAlbums = (newAlbums) => {
      albums.value = newAlbums;
    }

    const { apiAddress } = useApiAddress();
    const { isAuthorized } = useIsAuthorized();
    const { token } = useToken();
    const { loading, setLoading } = useLoading();
    const errorStates = reactive({}); // Object to manage error state for each album

    // Lifecycle hooks
    onMounted(() => {
      getAlbumsWithPhotoCount();
    });

    const initializeErrorStates = (albumsArray) => {
      albumsArray.forEach(album => {
        setErrorStates(album.albumID, false);
      });
    };

    // Function to set error states
    const setErrorStates = (albumId, hasError) => {
      errorStates[albumId] = hasError;
    };


    const noEmptyAlbumsExists = (albums) => {
      return albums.every(album => album.photoCount > 0);
    };

    // Function to fetch albums
    const getAlbumsWithPhotoCount = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getHelper(`${apiAddress.value}/api/albums`);
        setAlbums(response);
        if (isAuthorized.value && noEmptyAlbumsExists(response)) {
          const album = { albumID: 0, photoCount: 0, caption: '', isPublic: true };
          setAlbums([...albums.value, album]);
        }

        initializeErrorStates(albums.value);
      } catch (error) {
        alert('ServerAPI must be started. Please read the book for info!');
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (albumID) => {
      try {
        setLoading(true);
        await apiClient.deleteHelper(`${apiAddress.value}/api/albums/delete/${albumID}`, token.value);
        getAlbumsWithPhotoCount(); // Refresh albums after deletion
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleUpdate = async (albumId, newCaption) => {
      try {
        setLoading(true);
        await apiClient.putHelper(`${apiAddress.value}/api/albums/update/${albumId}`, newCaption, token.value);
        getAlbumsWithPhotoCount(); // Refresh albums after update
      } catch (error) {
        console.error('Update failed:', error);
        setErrorStates(albumID, true);
      } finally {
        setLoading(false);
      }
    };

    const handleAdd = async (albumId, newCaption) => {
      try {
        setLoading(true);
        await apiClient.postHelper(`${apiAddress.value}/api/albums/add`, newCaption, token.value);
        getAlbumsWithPhotoCount(); // Refresh albums after addition
      } catch (error) {
        console.error('Add failed:', error);
        setErrorStates(albumId, true);
      } finally {
        setLoading(false);
      }
    };

    const getAlbumRows = () => {
      const rows = [];
      for (let i = 0; i < albums.value.length; i += 2) {
        rows.push(albums.value.slice(i, i + 2));
      }
      return rows;
    };

    // Reactive computed property for album rows
    const albumRows = computed(() => getAlbumRows());

    const opacity = computed(() => (loading.value ? 1 : 0));

    const handleCaptionChange = (albumID) => {
      setErrorStates(albumID, false);
    };

    watch(
      () => isAuthorized.value,
      async () => {
        getAlbumsWithPhotoCount();
      },
      { immediate: true } // Trigger immediately on component mount
    );


    return {
      opacity,
      handleUpdate,
      handleDelete,
      handleAdd,
      albumRows,
      errorStates,
      handleCaptionChange
    };
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
