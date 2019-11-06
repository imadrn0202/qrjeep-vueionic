<template>
    <ion-grid>
    <ion-col>
           <ion-item>
                <router-link :to="{ name: 'farematrix', query: {type: 'regular' } }" >
                <ion-button expand="block">
                    <ion-label color="white">Regular</ion-label>
                </ion-button>
                </router-link>

            </ion-item>
    </ion-col>
    <ion-col>
           <ion-item>
                <router-link :to="{ name: 'farematrix', query: {type: 'student' } }" >
                <ion-button expand="block">
                    <ion-label color="white">Student</ion-label>
                </ion-button>
                </router-link>

            </ion-item>
    </ion-col>
    <ion-col>
           <ion-item>
                <router-link :to="{ name: 'farematrix', query: {type: 'senior' } }" >
                <ion-button expand="block">
                    <ion-label color="white">Senior</ion-label>
                </ion-button>
                </router-link>

            </ion-item>
    </ion-col>
    <ion-col>
           <ion-item>
                <router-link :to="{ name: 'farematrix', query: {type: 'pwd' } }" >
                <ion-button expand="block">
                    <ion-label color="white">PWD</ion-label>
                </ion-button>
                </router-link>

            </ion-item>
    </ion-col>
</ion-grid>
  
</template>

<script>
export default {

}
</script>

<style>

</style>