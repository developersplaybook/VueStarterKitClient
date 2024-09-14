// main.js
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import GlobalStateProvider from './providers/GlobalStateProvider.vue';
import router from './router'
import '../public/assets/css/app.css'
import '../public/assets/css/dragAndDrop.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../public/assets/css/animation.css'

// Importera de specifika ikoner du vill använda
import { faSpinner, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

// Lägg till ikonerna i biblioteket
library.add(faSpinner, faSave, faTrash,faTimes);

// Registrera FontAwesome-komponenten globalt
const app = createApp(App);
app.use(GlobalStateProvider)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router); 
app.mount('#app');