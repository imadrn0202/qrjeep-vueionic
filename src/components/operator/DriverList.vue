<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
             <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content pulling-icon="arrow-dropdown" pulling-text="Pull to refresh"
                    refreshing-spinner="circles" refreshing-text="Refreshing...">
                </ion-refresher-content>
            </ion-refresher>

            <ion-spinner v-if="$store.state.operator.getDriverListStatus === 'loading'" name="circles"></ion-spinner>
            <ion-grid v-if="$store.state.operator.getDriverListStatus === 'success'">


                <ion-card v-for="(item, index) in $store.state.operator.drivers" :key="index">

                    <ion-card-header>
                        <ion-card-subtitle>Driver ID: {{item.id}}</ion-card-subtitle>
                        <ion-card-subtitle>{{item.first_name}} {{item.last_name}}</ion-card-subtitle>
                        <ion-card-subtitle>Plate Number: {{item.plate_number}}</ion-card-subtitle>
                         <ion-card-subtitle>Mobile Number: {{item.mobileNumber}}</ion-card-subtitle>
                         <br>
                         <ion-button size="small" color="danger" :disabled="$store.state.operator.deleteDriverStatus === 'loading'" v-on:click="deleteDriver(item.id)">Delete</ion-button>

                           <router-link class="no-underline" :to="{ path: '/operator/editdriver', query: { driver_id: item.id}}">

                          <ion-button size="small" color="primary" >Update</ion-button>
                           </router-link>
                          <ion-spinner v-if="$store.state.operator.deleteDriverStatus === 'loading'" name="circles"></ion-spinner>
                    </ion-card-header>

                </ion-card>


            </ion-grid>
        </ion-content>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: 'DriverList',
        methods: {
            ...mapActions([
                'onDriverList',
                'onDeleteDriver'
            ]),

            deleteDriver(id) {
                this.onDeleteDriver({
                    driver_id: id
                }).then(() => {
                this.getDriverList();
                    
                })

            },


            getDriverList() {
                this.onDriverList()
            },
            doRefresh(event) {
                console.log('Begin async operation');

                setTimeout(() => {
                    console.log('Async operation has ended');
                    this.getDriverList();
                    event.target.complete();
                }, 2000);
            },


        },
        beforeMount() {
            this.getDriverList()
        },

    }
</script>
<style scoped>
    .no-underline {
        text-decoration: none !important;
    }
</style>