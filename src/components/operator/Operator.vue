<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
          <OperatorHome />
        </ion-content>

  </div>
</template>

<script>
  /* eslint-disable */
  import OperatorHome from './tabs/OperatorHome'
  export default {
    name: 'Operator',
    components: {
      OperatorHome
    },
  }
</script>