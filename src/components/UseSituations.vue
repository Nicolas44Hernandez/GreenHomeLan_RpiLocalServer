<script setup>
</script>
<template>  
    <h1>ORCHESTRATOR USE SITUATIONS</h1>
    <div class="use-situations-container">
        <div id="us-button-presence-day" @click="onClickUseSituation('PRESENCE_DAY_LOW_CONSUMPTION')" class="btn-use-situation">
          <font-awesome-icon icon="house-user" id="us-icon-presence-day" class="icon-use-situation"/>
        </div> 
        <div id="us-button-presence-home-office" @click="onClickUseSituation('PRESENCE_HOME_OFFICE')" class="btn-use-situation">
          <font-awesome-icon icon="laptop-house" id="us-icon-home-office" class="icon-use-situation" />
        </div> 
        <div id="us-button-presence-night" @click="onClickUseSituation('PRESENCE_NIGHT_LOW_CONSUMPTION')" class="btn-use-situation">
          <font-awesome-icon icon="moon" id="us-icon-night" class="icon-use-situation" />
        </div> 
    </div>
    <div class="use-situations-container">
        <div id="us-button-absence" @click="onClickUseSituation('ABSENCE_LOW_CONSUMPTION')" class="btn-use-situation">
          <font-awesome-icon icon="person-walking-dashed-line-arrow-right" id="us-icon-absence" class="icon-use-situation" />
        </div> 
        <div id="us-button-deep-sleep" @click="onClickUseSituation('DEEP_SLEEP')" class="btn-use-situation">
          <font-awesome-icon icon="umbrella-beach" id="us-icon-deep-sleep" class="icon-use-situation" />
        </div> 
    </div>
</template>
<script>
import config from '@/config.js';
import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      current_use_situation: "",
      setting_use_situation: true,
      icon_presence_day: null,
      icon_home_office: null,
      icon_night: null,
      icon_absence: null,
      icon_deep_sleep: null,
    };
  },
  mounted() {
    // in startup
    console.log("in mounted UseSituations Vue");
    this.loadIcons()
    this.getCurrentUseSituation();
    setInterval(this.getCurrentUseSituation, config.USE_SITUATION_REFRESH_PERIOD_IN_SECS*1000);    
  },
  methods: {
    loadIcons(){
      this.icon_presence_day = document.getElementById('us-icon-presence-day');
      this.icon_home_office = document.getElementById('us-icon-home-office');
      this.icon_night = document.getElementById('us-icon-night');
      this.icon_absence = document.getElementById('us-icon-absence');
      this.icon_deep_sleep = document.getElementById('us-icon-deep-sleep');
    },
    getCurrentUseSituation() {
      //TODO: complete
      console.log("Getting current use situation");      
      // Geting current use situation from backend
      // --------------FOR TEST-----------
      //const url ='http://localhost:5000/use_situations/current/'
      const url ='http://192.168.144.68/api/use_situations/current' // Orchestrator connected to prpl box
      // --------------------------------
      //const url = "/api/use_situations/current";
      axios.get(url)
        .then(response => {  
          console.log("Current use situation:" + response.data.use_situation);
          this.current_use_situation = response.data.use_situation; 
          this.updateIconsStatus(); 
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickUseSituation(use_situation){
      this.clearIcons();
      this.setUseSituation(use_situation);
    },
    setUseSituation(use_situation){
      const data = {
        use_situation: use_situation,
      };
      const queryString = qs.stringify(data);
      // --------------FOR TEST-----------
      //const url =`http://localhost:5000/use_situations/current?${queryString}`;
      const url = `http://192.168.144.68/api/use_situations/current?${queryString}`; // Orchestrator connected to prpl box
      // --------------------------------
      //const url = `/api/use_situations/current?${queryString}`;

      console.log(url);
      axios.post(url)
        .then(response => {          
          console.log("Setting use situation: "+ use_situation);
          this.blinkIcon(use_situation);          
        })
        .catch(error => {
          console.log(error);
          this.inValidToken(error);
        });

    },
    clearIcons(){
      this.icon_home_office.style.color = "rgb(255, 255, 255)" ;
      this.icon_presence_day.style.color = "rgb(255, 255, 255)" ;
      this.icon_night.style.color = "rgb(255, 255, 255)" ;
      this.icon_absence.style.color = "rgb(255, 255, 255)" ;
      this.icon_deep_sleep.style.color = "rgb(255, 255, 255)" ;
    },
    blinkIcon(use_situation){    

      var blinkingIcon = null;  
      switch (use_situation) {        
        case "PRESENCE_HOME_OFFICE":          
          blinkingIcon = this.icon_home_office;
          break;
        case "PRESENCE_DAY_LOW_CONSUMPTION":
          blinkingIcon = this.icon_presence_day;
          break;
        case "PRESENCE_NIGHT_LOW_CONSUMPTION":
          blinkingIcon = this.icon_night;
          break;
        case "ABSENCE_LOW_CONSUMPTION":
          blinkingIcon = this.icon_absence;
          break;
        case "DEEP_SLEEP":
          blinkingIcon = this.icon_deep_sleep;          
          break;
        default:
          console.error("Unknown use situation");
          return;
      }      

      let visible = true;
      const intervalId = setInterval(() => {
        blinkingIcon.style.visibility = visible ? 'hidden' : 'visible';
        visible = !visible;
      }, 250);

      setTimeout(() => {
        clearInterval(intervalId); 
        blinkingIcon.style.visibility = 'visible';
      }, 3000);
    },
    updateIconsStatus(){
      console.log("Current use situation: " + this.current_use_situation);      
      switch (this.current_use_situation) {
        case "PRESENCE_HOME_OFFICE":
          this.icon_home_office.style.color = "rgb(224, 124, 41)" ;
          break;
        case "PRESENCE_DAY_LOW_CONSUMPTION":
          this.icon_presence_day.style.color = "rgb(224, 124, 41)" ;
          break;
        case "PRESENCE_NIGHT_LOW_CONSUMPTION":
          this.icon_night.style.color = "rgb(224, 124, 41)" ;
          break;
        case "ABSENCE_LOW_CONSUMPTION":
          this.icon_absence.style.color = "rgb(224, 124, 41)" ;
          break;
        case "DEEP_SLEEP":
          this.icon_deep_sleep.style.color = "rgb(224, 124, 41)" ;
          break;
        default:
          // Code to execute if content does not match any case
          console.log("Unknown use situation");
          break;
      }
    }
  },
}
</script>

<style scoped>
.btn-use-situation {
  cursor: pointer;
  margin:5%; 
  padding: 5%;
}
.icon-use-situation{
    font-size: 5em;
    color: rgb(255, 255, 255);
}
.use-situations-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Add additional styles as needed */
}
</style>