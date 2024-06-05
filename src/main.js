import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faHouseUser, faLaptopHouse, faMoon, faPersonWalkingDashedLineArrowRight, faPhone, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPhone);
library.add(faCoffee);
library.add(faHouseUser);
library.add(faLaptopHouse);
library.add(faMoon);
library.add(faPersonWalkingDashedLineArrowRight);
library.add(faUmbrellaBeach);

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)

app.mount('#app')