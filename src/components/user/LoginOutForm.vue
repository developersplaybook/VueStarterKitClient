<template>
  <div
    class="modal show"
    tabindex="-1"
    role="dialog"
    aria-labelledby="example-modal-sizes-title-sm"
    :style="modalBackgroundStyle"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <template v-if="!isAuthorized">
              <label>
                <strong>{{ captionText }}</strong>
                <input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  class="form-control mt-2"
                  @keyup.enter="handleLogInOut"
                />
              </label>
            </template>
            <template v-else>
              <strong>Log out</strong>
            </template>
          </h5>
        </div>
        <div class="modal-body">
          <button @click="handleClose" class="btn btn-secondary">Cancel</button>
          <button @click="handleLogInOut" class="btn btn-primary">
            {{ isAuthorized ? 'Log Out' : 'Log In' }}
          </button>
          <button style="border: none; background: none; color: black;">
            <FontAwesomeIcon
              icon="fa-spinner"
              size="2x"
              spin
              :style="{ opacity: loading ? '1' : '0' }"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed} from 'vue';
import { useIsAuthorized, useLoading, useApiAddress, useToken, useShowLoginModal } from '../../providers/useGlobalState';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as apiClient from '../../helpers/ApiHelpers';

export default {
  name: 'LoginOutForm',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const { apiAddress } = useApiAddress();
    const { isAuthorized, setIsAuthorized } = useIsAuthorized();
    const { loading, setLoading } = useLoading();
    const { showLoginModal, setShowLoginModal } = useShowLoginModal();
    const {setToken} = useToken();
    const password = ref('');
    const captionText = ref('Log in');

    const modalBackgroundStyle = computed(() => ({
      background: showLoginModal.value ? 'rgba(0,0,0,0.5)' : 'none',
    }));

    const handleClose = () => {
      if (showLoginModal) {
        setShowLoginModal(false);
      }
    };

    const checkPasswordOnServerAsync = async (password) => {
      try {
        const response = await apiClient.postHelper(`${apiAddress.value}/api/authorization/login`, { Password: password });
        return { data: response };
      } catch (error) {
        console.error('Error in checkPasswordOnServerAsync:', error);
        captionText.value='Wrong password, try again...';
        throw error;
      }
    };

    const logOutUserAsync = async () => {
      try {
        const response = await apiClient.postHelper(`${apiAddress.value}/api/authorization/logout`);
        return { data: response.text };
      } catch (error) {
        console.error('Error in logOutUserAsync:', error);
        throw error;
      }
    };

    const handleLogInOut = async () => {
      setLoading(true);
      try {
        if (isAuthorized.value) {
          const response = await logOutUserAsync();
          if (response.data === 'userLoggedOut' || response.data === 'userAlreadyLoggedOut') {
            setIsAuthorized(false);
            setToken('');
            handleClose();
          }
        } else {
          const response = await checkPasswordOnServerAsync(password.value);
          if (response.data.token) {
            setIsAuthorized(true);
            setToken(response.data.token);
            handleClose();
          } else {
            console.error('Login failed or invalid response');
            captionText.value='Wrong password, try again...';
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    return {
      password,
      isAuthorized,
      loading,
      handleClose,
      handleLogInOut,
      captionText,
      modalBackgroundStyle
    };
  },
};
</script>

<style>
.custom-height-user {
  margin:20px;
}
</style>
