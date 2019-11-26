<template>
    <div class="ion-page">

        <ion-content class="ion-padding">
            <ion-grid>
                
                <ion-text v-if="$store.state.operator.createDriverStatus === 'error'" color="danger">
                    <p>Mobile Number Exists</p>
                </ion-text>

                <form  @submit.prevent="onSubmit">
                    <ion-col>
                        <ion-item>
                            <ion-label>Firstname: </ion-label>
                            <ion-input :value="$store.state.operator.driverByUserId.first_name" @input="firstName = $event.target.value" type="text" name="s">
                            </ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <ion-label>Lastname: </ion-label>
                            <ion-input :value="$store.state.operator.driverByUserId.last_name" @input="lastName = $event.target.value" type="text" name="a">
                            </ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <ion-label>Plate Number: </ion-label>
                            <ion-input :value="$store.state.operator.driverByUserId.plate_number" @input="plateNumber = $event.target.value" type="text"
                                name="d"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <ion-label>Mobile Number: </ion-label>
                            <ion-input :value="$store.state.operator.driverByUserId.user.mobile_number" @input="mobileNumber = $event.target.value" type="text"
                                name="mobile_number"></ion-input>

                        </ion-item>
                        <ion-item v-if="validateMobile == false">

                            <ion-text color="danger">
                                <p>{{validationMessage}}</p>
                            </ion-text>

                        </ion-item>
                        

                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <ion-button
                                :disabled="validateMobile == false || $store.state.operator.createDriverStatus === 'loading'"
                                type="submit" color="primary" expand="block">
                                Update Driver
                            </ion-button>
                        </ion-item>
                    </ion-col>
                </form>
            </ion-grid>
        </ion-content>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'EditDriver',
        data() {
            return {
                driver_id: this.$route.query.driver_id
            }
        },
        beforeMount() {
            this.getDriver();
            console.log(this.firstName);         
        },

  
        computed: {

      
            ...mapState([
                'status',
            ]),
            validationMessage: function () {
                var re = /^(639)\d{9}$/g;


                if (re.test(this.mobileNumber)) {
                    // eslint-disable-next-line
                    this.validateMobile = true
                    return;

                } else {
                    // eslint-disable-next-line
                    this.validateMobile = false
                    return 'ex: 639231622739';
                }


            },

        },
        methods: {
            ...mapActions([
                'onUpdateDriver',
                'onGetDriverByDriverUserId'
            ]),

            getDriver() {
                this.onGetDriverByDriverUserId({
                    driver_user_id: this.$route.query.driver_id
                })
            },

            onSubmit() {

                this.onUpdateDriver({
                    driver_user_id: this.$route.query.driver_id,
                    first_name: this.firstName,
                    last_name: this.lastName,
                    plate_number: this.plateNumber,
                    mobile_number: this.mobileNumber
                });


            }


        }
    }
</script>