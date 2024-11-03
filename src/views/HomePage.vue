<template>
  <div class="container">
    <div class="row">
      <div class="row-height">
        <div
          class="col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
          <div class="row">
            <div class="col-md-12">
              <h4 />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-primary center-block">
                <div class="panel-heading text-center">
                  <h3 class="panel-title">Today's photo</h3>
                </div>
                <div class="panel-body">
                  <div class="row text-center">
                    <div class="col-md-12 d-flex justify-content-center" id="divSwirl">
                      <div class="fade-in-animation">
                        <div class="rotate-animation">
                          <div class="scale-animation">
                            <PhotoFrame>
                              <router-link :to="photoDetailsRoute">
                                <img :src="imageUrl" alt="Animated Image"
                                  style="border: 4px solid white; max-height: 100%; max-width: 100%; vertical-align: middle;" />
                              </router-link>
                            </PhotoFrame>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row text-center">
                    <hr />
                    <div id="divText" style="min-height: 60px">Photos</div>
                    <div id="divDownload" style="min-height: 50px">
                      <p>
                        <a :href="downloadUrl">
                          <img src="/assets/images/button-download.gif" alt="download photo" />
                        </a>
                      </p>
                      <hr />
                      <p>
                        See <router-link to="/albums">more photos</router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="divContact" style="min-height: 90px">
                <div class="fade-in-animation">
                    <h4>Contact information</h4>
                    <p>
                      &nbsp;&nbsp;
                      <span class="glyphicon glyphicon-phone-alt" style="color: gray" />
                      &nbsp;010-123 456
                    </p>
                    <p>
                      <img src="/assets/images/mail.png" alt="epost" class="img-responsive" />
                    </p>
                  </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="panel panel-primary">
                    <div class="panel-heading">
                      <h3 class="panel-title text-center">Today's weather</h3>
                    </div>
                    <div class="panel-body panel-height_small">
                      <div id="divWeather" class="opaque">
                          <a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/"
                            data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original">
                            NEW YORK WEATHER
                          </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-md-height">
          <div class="row">
            <div class="col-md-12">
              <h4 />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="panel-title">Welcom to Vue Starter Kit Client</h3>
                </div>
                <div class="panel-body">
                  <InfoMessage/>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="panel-title">Upcoming features</h3>
                </div>
                <div class="panel-body">
                  <UpcomingFeatures/>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h3 class="panel-title">Don't forget to check the other applications</h3>
                </div>
                <div class="panel-body">
                  <OtherApplications/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useApiAddress } from './../providers/useGlobalState';
import PhotoFrame from "../photos/PhotoFrame.vue";
import InfoMessage from '@/components/common/InfoMessage.vue';
import UpcomingFeatures from '@/components/common/UpcomingFeatures.vue';
import OtherApplications from '@/components/common/OtherApplications.vue';

// Access API address from global state
const { apiAddress } = useApiAddress();
const currentTicks = ref(new Date().getTime());

// Compute the image URL dynamically
const imageUrl = computed(() => `${apiAddress.value}/RandomHandler/Index/PhotoID=0/Size=M?${currentTicks.value}`);
const downloadUrl = computed(() => `${apiAddress.value}/RandomHandler/Download/0/Size=M?${currentTicks.value}`);

// Define the details URL using a named route with parameters
const photoDetailsRoute = computed(() => `/photodetails/0`);

// Lifecycle hook to handle mounting behavior
onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://weatherwidget.io/js/widget.min.js";
  script.async = true;

  // Ensure the script has loaded before making the widget visible
  script.onload = () => {
    // Apply a small delay to ensure the widget is fully rendered
    setTimeout(() => {
      const divWeather = document.getElementById("divWeather");
      if (divWeather) {
        divWeather.classList.add("delayed-fade-in-animation");
      }

      currentTicks.value = new Date().getTime();
    }, 1000); // 1-second delay after script loading
  };

  // Handle script loading errors
  script.onerror = () => {
    console.error("Failed to load the weather widget script.");
  };

  document.body.appendChild(script);
});

</script>

