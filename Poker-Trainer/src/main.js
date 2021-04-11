import Vue from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import VuePlayingCard from "vue-playing-card";
import firebase from 'firebase';
import '../firebase';
import './components/firebaseInit';

Vue.use(VuePlayingCard);
Vue.config.productionTip = false;
let app;
firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    });
  }
});


Vue.component("loading", { template: "<div>Loading!</div>" });
router.beforeEach((to, from, next) => {
  app.loading = true;
  next();
});
router.afterEach(() => {
  setTimeout(() => ((app.loading = false), 1500)); // timeout for demo purposes
});
