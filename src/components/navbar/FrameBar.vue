<template>
  <div>
    <header
      :style="{
        background: `transparent url('/assets/images/BootstrapHeaderComposed.jpg') 0 -162px`,
        height: '81px',
        margin: '0',
      }"
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div class="container">
        <a class="navbar-brand pb-5 mb-3" href="/">
          <VueSvgIcon text="Vue Starter Kit" :icon="logo" iconClass="logo" />
        </a>
        <button
          ref="elCollapseButton"
          class="navbar-toggler"
          type="button"
          @click="toggleSidebar"
        >
          <span class="navbar-toggler-icon">
            <img :src="hamburger" alt="Hamburger Icon" />
          </span>
        </button>
        <div class="collapse navbar-collapse navbar-nav-container">
          <ul class="navbar-nav navbar-nav-main spriteTabs">
            <li ref="menuRefs.homeLi" class="nav-item">
              <router-link
                to="/"
                class="nav-link no-underline"
                @click="closeSidebar"
                 exact-active-class="active"
                >Home<span
              /></router-link>
            </li>
            <li ref="menuRefs.albumsLi" class="nav-item">
              <router-link
                to="/albums"
                class="nav-link no-underline"
                @click="closeSidebar"
                 exact-active-class="active"
                >Album<span
              /></router-link>
            </li>
          </ul>
          <ul class="navbar-nav navbar-nav-right spriteTabs">
            <li class="nav-item">
              <a
                href="https://www.google.com/maps/place/Statue+of+Liberty/@40.688969,-113.0657959,4z/data=!4m10!1m2!2m1!1sstaue+of+liberty!3m6!1s0x89c25090129c363d:0x40c6a5770d25022b!8m2!3d40.6892494!4d-74.0445004!15sChFzdGF0dWUgb2YgbGliZXJ0eVoTIhFzdGF0dWUgb2YgbGliZXJ0eZIBE2hpc3RvcmljYWxfbGFuZG1hcmvgAQA!16zL20vMDcycDg?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-link no-underline"
                ><span></span>&nbsp;&nbsp;<i class="fas fa-map-marker-alt"></i
                ><span></span
              ></a>
            </li>
            <li class="nav-item">
              <router-link to="#" @click="openShowLoginModal" class="nav-link no-underline"
                ><span></span>&nbsp;<i class="fas fa-user"></i><span></span
              ></router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <div :class="`sidebar ${sidebarOpen ? 'open' : ''}`" ref="sidebarRef">
      <div class="sidebar-header">
        <a
          href="https://www.google.com/maps/place/Statue+of+Liberty/@40.688969,-113.0657959,4z/data=!4m10!1m2!2m1!1sstaue+of+liberty!3m6!1s0x89c25090129c363d:0x40c6a5770d25022b!8m2!3d40.6892494!4d-74.0445004!15sChFzdGF0dWUgb2YgbGliZXJ0eVoTIhFzdGF0dWUgb2YgbGliZXJ0eZIBE2hpc3RvcmljYWxfbGFuZG1hcmvgAQA!16zL20vMDcycDg?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link no-underline"
          ><span></span>&nbsp;&nbsp;<i class="fas fa-map-marker-alt"></i
          ><span></span
        ></a>
        <router-link to="#" @click="openShowLoginModal" class="nav-link"
          ><i class="fas fa-user"></i
        ></router-link>
      </div>
      <div class="nav-list">
        <ul class="navbar-nav">
          <li ref="menuRefs.homeLi" class="nav-item">
            <router-link 
              to="/" 
              class="nav-link" 
              @click="closeSidebar"
              >Home</router-link
            >
          </li>
          <li ref="menuRefs.albumsLi" class="nav-item">
            <router-link 
              to="/albums" 
              class="nav-link" 
              @click="closeSidebar"
              >Album</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div id="main-content" class="content">
      <slot></slot>
    </div>

    <footer
      :style="{
        background: `transparent url('/assets/images/BootstrapHeaderComposed.jpg') 0 -162px`,
        height: '81px',
        margin: '0',
      }"
      class="bg-light text-center text-lg-start"
    >
      <div class="text-center p-3">
        &copy; 2024 Vue Starter Kit. All Rights Reserved.
      </div>
    </footer>
    <LoginOutForm v-if="showLoginModal"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueSvgIcon from "../common/VueSvgIcon.vue";
import LoginOutForm from "../user/LoginOutForm.vue";
import { useShowLoginModal } from '../../providers/useGlobalState';

// Define reactive state
const { showLoginModal, setShowLoginModal } = useShowLoginModal();
const logo = require("@/images/info.png");
const hamburger = require("@/images/Hamburger.png");
const sidebarOpen = ref(false);

// Define methods
const toggleSidebar = ()=> {
  sidebarOpen.value = !sidebarOpen.value;
}

const closeSidebar = ()=> {
  sidebarOpen.value = false;
}

const openShowLoginModal = () => {
  setShowLoginModal(true);
  sidebarOpen.value = false;
};

</script>

<style>
/* Add any necessary styles for active class, e.g., */
.nav-link.active {
  font-weight: bold;
  color: #007bff;
}
</style>
