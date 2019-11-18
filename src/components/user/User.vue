<template>
  <div class="ion-page">
  
        <ion-content class="ion-padding">
          <UserHome />
        </ion-content>
    
  </div>
</template>

<script>
  import UserHome from './tabs/UserHome'
  export default {
    name: 'User',
    components: {
      UserHome
    },
  }
</script>