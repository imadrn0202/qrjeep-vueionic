<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
          <DriverHome />
        </ion-content>

  </div>
</template>

<script>
  /* eslint-disable */
  import DriverHome from './tabs/DriverHome'
  export default {
    name: 'Driver',
    components: {
      DriverHome
    },
  }
</script>