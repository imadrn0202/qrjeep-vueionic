<template>
  <div id="app">
    <ion-app>
     
      
       <menu-left v-if="!$route.meta.operator && !$route.meta.hideNavigation"/>

       <operator-menu-left v-if="$route.meta.operator && !$route.meta.hideNavigation"/>

       <side-bar v-if="!$route.meta.hideNavigation"> </side-bar>


      <ion-vue-router v-if="$route.meta.hideNavigation"/>

    </ion-app>
    
    <ion-menu-controller  v-if="!$route.meta.hideNavigation" ></ion-menu-controller>

  </div>
</template>


<script>
import SideBar from "./components/SideBar"
import MenuLeft from "./components/MenuLeft"
import OperatorMenuLeft from "./components/OperatorMenuLeft"

export default {
  components : { SideBar, MenuLeft, OperatorMenuLeft },

}
</script>