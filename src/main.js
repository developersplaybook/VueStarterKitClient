// main.js
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router'
import store from './store/store';
import '../public/assets/css/app.css'
import '../public/assets/css/dragAndDrop.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../public/assets/css/animation.css'

// Import specific FontAwesome icons
import { faSpinner, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

// Add icons to FontAwesome library
library.add(faSpinner, faSave, faTrash,faTimes);

// Registrera FontAwesome-komponenten globalt
const app = createApp(App);
app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');