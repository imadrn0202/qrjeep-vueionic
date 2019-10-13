<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>User Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <UserHome />
        </ion-content>
    </div>
</template>

<script>
import { Plugins } from '@capacitor/core'
import UserHome from './tabs/UserHome'
    export default {
        name: 'User',
        components: {
            UserHome
        },
    }
</script>