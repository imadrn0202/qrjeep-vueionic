<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content pulling-icon="arrow-dropdown" pulling-text="Pull to refresh"
                    refreshing-spinner="circles" refreshing-text="Refreshing...">
                </ion-refresher-content>
            </ion-refresher>


            <ion-spinner v-if="$store.state.operator.getDailyReportStatus === 'loading'" name="circles">
            </ion-spinner>
            <ion-grid v-if="$store.state.operator.getDailyReportStatus === 'success'">


<br>
<br>
                  <ion-text v-for="(item, index) in $store.state.operator.dailyReport" :key="index">

                            <div class="ion-text-center">
                            <ion-text class=" secondary">{{item.date}} </ion-text>
                           
                            <br>
                            <ion-text class="fs-09"> Overall Earning: {{formatPrice(item.sum)}} </ion-text>
                            <br>

                            <ion-text class="fs-09" >My Earnings: {{formatPrice(item.sum * 0.65)}}</ion-text>
                            <br>

                            <ion-text class="fs-09" >Driver Earnings: {{formatPrice(item.sum * 0.35)}}</ion-text>
                             </div>

                              
                <ion-card v-for="(result, index) in item.result" :key="index">
                     <router-link class="no-underline" :to="{ path: '/driver/log', query: { driver_id: result.driver_user_id}}">
                    <ion-card-header>
                        <ion-card-subtitle>{{result.first_name}} {{result.last_name}}</ion-card-subtitle>
                        <ion-card-subtitle>Overall Earning: {{formatPrice(result.earnings)}}</ion-card-subtitle>
                        <ion-card-subtitle>My Earnings: {{formatPrice(result.earnings  * 0.65)}}</ion-card-subtitle>
                        <ion-card-subtitle>Driver Earnings: {{formatPrice(result.earnings * 0.35) }}</ion-card-subtitle>
                    </ion-card-header>


                               </router-link>

                </ion-card>
            </ion-text>
            </ion-grid>
        </ion-content>
    </div>
</template>

<script>

    import {
        mapActions
    } from 'vuex';
    export default {

        name: 'DailyReport',
        methods: {
            ...mapActions([
                'onGetDailyReport'
            ]),


            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

            getDailyReport() {
                this.onGetDailyReport();
            },

            doRefresh(event) {
                console.log('Begin async operation');

                setTimeout(() => {
                    console.log('Async operation has ended');
                    this.onGetDailyReport();
                    event.target.complete();
                }, 2000);
            },


        },
        beforeMount() {
            this.getDailyReport()
        },

    }
</script>
<style  scoped>
.fs-09 {
    font-size: 0.9rem;
}

.text-center {
    align-items: center;
}
</style>