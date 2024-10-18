import AlbumsPage from "@/views/AlbumsPage.vue";
import PhotosPage from "@/views/PhotosPage.vue";
import PhotoDetailsPage from "@/views/PhotoDetailsPage.vue";
import HomePage from "@/views/HomePage.vue";
import LoginOutForm from "@/components/user/LoginOutForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/user",
    name: "User",
    component: LoginOutForm,
  },
  {
    path: "/albums",
    name: "Albums",
    component: AlbumsPage,
  },
  {
    path: "/photos/:albumId",
    name: "Photos",
    component: PhotosPage,
  },
  {
    path: "/photodetails/:photoId",
    name: "Details",
    component: PhotoDetailsPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
