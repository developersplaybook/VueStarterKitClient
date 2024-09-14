<template>
  <td class="item">
    <div v-if="isUpdateOldAlbum" style="display: flex; justify-content: center; align-items: center; color: black;">
      <font-awesome-icon icon="save" 
      @click="!isDisabledForAddAndUpdate && handleUpdate(albumId, cap)" 
      :style="{
      fontSize: '2em',
      margin: '0 50px 0 80px',
      cursor: isDisabledForAddAndUpdate ? 'not-allowed' : 'pointer',
      opacity: isDisabledForAddAndUpdate ? 0.5 : 1
    }" />
      <font-awesome-icon icon="trash" 
      @click="!isDisabledForDelete && handleDelete(albumId)" 
      :style="{
      fontSize: '2em',
      margin: '0 150px 0 30px',
      cursor: isDisabledForDelete ? 'not-allowed' : 'pointer',
      opacity: isDisabledForDelete ? 0.5 : 1
    }" />
    </div>
    <div v-if="isAddNewAlbum" style="align-items: center; color: black;">
      <font-awesome-icon icon="save"  
      @click="!isDisabledForAddAndUpdate && handleAdd(cap)" 
      :style="{
      fontSize: '2em',
      margin: '0 50px 0 100px',
      cursor: isDisabledForAddAndUpdate ? 'not-allowed' : 'pointer',
      opacity: isDisabledForAddAndUpdate ? 0.5 : 1
    }" />
    </div>
    <table cellpadding="0" cellspacing="0" class="album-frame">
      <tbody>
        <tr>
          <td class="topx----">
            <img alt="" src="/assets/images/album-l1.gif"
              style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
          <td class="top-x---">
            <img alt="" src="/assets/images/album-mtl.gif"
              style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
          <td class="top--x--"></td>
          <td class="top---x-">
            <img alt="" src="/assets/images/album-mtr.gif"
              style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
          <td class="top----x">
            <img alt="" src="/assets/images/album-r1.gif"
              style="max-height: 100%; max-width: 100%; vertical-align: top;" />
          </td>
        </tr>
        <tr>
          <td class="mtpx----">
            <img alt="" src="/assets/images/album-l2.gif"
              style="max-height:100%; max-width:100%; vertical-align: top" />
          </td>
          <td colSpan="3" rowSpan="3">
            <div class="fade-in-animation">
              <div v-if="isAddNewAlbum">
                <img src="/assets/images/default-image-small.png" class="photo_198"
                  style="border:'4px solid white'; max-height:100%; max-width: 100%"
                  alt="Sample Photo from Album" />
              </div>
              <div v-else>
                <div v-if="albumId && cap && apiAddress">
                  <router-link :to="`/photos/${albumId}/${cap}`">
                    <img :src="albumImageUrl" class="photo_198"
                      style="border: '4px solid white'; max-height: 100%; max-width: 100% " alt="Sample Photo" />
                  </router-link>
                </div>
              </div>
            </div>
          </td>
          <td class="mtp----x">
            <img alt="" src="/assets/images/album-r2.gif"
              style="max-height: 100%; max-width:100%; vertical-align: top" />
          </td>
        </tr>
        <tr>
          <td class="midx----"></td>
          <td class="mid----x"></td>
        </tr>
        <tr>
          <td class="mbtx----">
            <img alt="" src="/assets/images/album-l3.gif"
              style=" max-height: 100%; max-width: 100%; vertical-align: top" />
          </td>
          <td class="mbt----x">
            <img alt="" src="/assets/images/album-r3.gif"
              style=" max-height: 100%; max-width: 100%; vertical-align: top" />
          </td>
        </tr>
        <tr>
          <td class="botx----">
            <img alt="" src="/assets/images/album-l4.gif"
              style=" max-height: 100%; max-width: 100%; vertical-align: top " />
          </td>
          <td class="bot-x---" style=" textAlign: 'left' ">
            <img alt="" src="/assets/images/album-mbl.gif"
              style="max-height: 100%; max-width: 100%; vertical-align: top " />
          </td>
          <td class="bot--x--"></td>
          <td class="bot---x-" style=" textAlign: 'right' ">
            <img alt="" src="/assets/images/album-mbr.gif"
              style=" max-height: 100%; max-width: 100%; vertical-align: top " />&nbsp;&nbsp;
          </td>
          <td class="bot----x">
            <img alt="" src="/assets/images/album-r4.gif"
              style=" max-height: 100%; max-width: 100%; vertical-align: top " />
          </td>
        </tr>
      </tbody>
    </table>
    <h4 v-if="isUpdateOldAlbum">
      <div style="color: rgb(152, 0, 0);">
        <TextAreaInput v-model="cap" placeholder="Enter caption" />
      </div>
    </h4>
    <h4 v-else>
      <router-link :to="`/photos/${albumId}/${cap}`">{{ cap }} </router-link>
    </h4>
    <h4 v-if="isAddNewAlbum">
      <div style="color: rgb(152, 0, 0);">
        <TextAreaInput v-model="cap" placeholder="Enter caption" />
      </div>
    </h4>
    <div>{{ photoCount }} images</div>
  </td>
</template>

<script>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TextAreaInput from '../common/TextAreaInput.vue';
import { useApiAddress, useIsAuthorized } from '../../providers/useGlobalState';

export default {
  name: "AlbumFrame",
  components: {
    FontAwesomeIcon,
    TextAreaInput
  },
  props: {
    albumId: {
      type: Number,
      required: false
    },
    caption: {
      type: String,
      required: false
    },
    photoCount: {
      type: Number,
      required: false
    },
    isPublic: {
      type: Boolean,
      required: false
    },
    itemCount: {
      type: Number,
      required: true
    },
    delete: {
      type: Function,
      required: false
    },
    update: {
      type: Function,
      required: false
    },
    add: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const { apiAddress } = useApiAddress();
    const { isAuthorized } = useIsAuthorized();
    const isAddNewAlbum = computed(() => props.albumId === 0);
    const cap = ref(props.caption);

    const isUpdateOldAlbum = computed(() => isAuthorized.value && !isAddNewAlbum.value);
    const isDisabledForAddAndUpdate = computed(() => (cap.value || '').trim() === '');
    const isDisabledForDelete = computed(() => props.photoCount > 0);
    const albumImageUrl = `${apiAddress.value}/Handler/Index/AlbumID=${props.albumId}/Size=M?timestamp=${Date.now()}`;

    // Return only the necessary items, including props directly
    return {
      apiAddress,
      albumImageUrl,
      isAddNewAlbum,
      cap,
      isUpdateOldAlbum,
      isDisabledForAddAndUpdate,
      isDisabledForDelete,
      handleDelete: props.delete,
      handleUpdate: props.update,
      handleAdd: props.add
    };
  }
};
</script>




