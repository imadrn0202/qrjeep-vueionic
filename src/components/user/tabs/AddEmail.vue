<template>

    <div class="ion-page">

        <ion-content class="ion-padding">
            <ion-grid>

                <ion-row>
                    <ion-col size="12">
                        <ion-item>

                            <ion-label>Email: </ion-label>
                            <ion-input :value="email" @input="email = $event.target.value" type="email" name="email">


                            </ion-input>
                        </ion-item>
                    </ion-col>

                    <ion-col size="12">
                        <ion-item>
                            <ion-button @click="sendEmailCode()" color="primary" expand="block"
                                :disabled="$store.state.addemail.addEmailStatus === 'loading'"> Send Code </ion-button>
                        </ion-item>
                    </ion-col>

                    <ion-col  v-if="$store.state.addemail.verify === true" size="12">
                        <ion-item>
                           <ion-label color="success">Please check your email for the code </ion-label>
                        </ion-item>
                    </ion-col>
                    <ion-col  v-if="$store.state.addemail.addEmailStatus === 'existing'" size="12">
                        <ion-item>
                           <ion-label color="danger">Email already exists </ion-label>
                        </ion-item>
                    </ion-col>
                    <form @submit.prevent="onSubmit">
                        <ion-col size="12">
                            <ion-item>
                                <ion-label>Verification Code: </ion-label>
                                <ion-input :value="code" @input="code = $event.target.value" type="text" name="code">
                                </ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <ion-button type="submit" color="primary" expand="block"
                                    :disabled="$store.state.addemail.verifyEmailStatus === 'loading'">
                                    Verify
                                </ion-button>
                                <ion-text v-if="$store.state.addemail.verifyEmailStatus === 'invalid'" color="danger">
                                    <p>Email Verification Code is Invalid</p>
                                </ion-text>
                                <ion-text v-if="$store.state.addemail.verifyEmailStatus === 'success'" color="success">
                                    <p>Email Verified!</p>
                                </ion-text>
                            </ion-item>
                        </ion-col>
                    </form>
                </ion-row>

            </ion-grid>
        </ion-content>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        name: 'AddEmail',
        data() {
            return {
                code: '',
                email: ''
            }
        },
        methods: {
        ...mapActions([
        'onAddEmailSubmit',
        'onVerifyEmailSubmit'
        ]),
        sendEmailCode() {
            this.onAddEmailSubmit({
                email: this.email
            })
        },

        onSubmit() {
           this.onVerifyEmailSubmit({
             code: this.code
           })
    },
        
    }
}
</script>