<template>
    <div class="ion-page">


    <ion-content class="ion-padding">
            <ion-grid>
            
            <ion-item>
                <ion-label>
                    <ion-label>Enter as</ion-label>
                </ion-label>

            </ion-item>


            <ion-item>
                <router-link to="/operator" >
                <ion-button expand="block" :href="'operator'">
                    <ion-label color="white">Operator</ion-label>
                </ion-button>
                </router-link>

            </ion-item>

            <ion-item>
                <router-link to="/user" >
                 <ion-button expand="block">
                    <ion-label color="white">User</ion-label>
                </ion-button>
                 </router-link>
            </ion-item>

            <ion-item>
                <router-link to="/driver/home" >
                 <ion-button expand="block">
                    <ion-label color="white">Driver</ion-label>
                </ion-button>
                 </router-link>
            </ion-item>

        </ion-grid>
    </ion-content>

   
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'UserType',
    }
</script>