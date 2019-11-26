<template>
      <div class="ion-page">

<ion-header>
          <ion-toolbar>
            <ion-title>BITSAI</ion-title>
          </ion-toolbar>
        </ion-header>
        
            <ion-content class="ion-padding">

    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <div class="ion-text-center">
            <ion-text color="primary">
               <!--  <h1 v-if="$store.state.pin.hasPinStatus === 'success'"> New Pin </h1> -->
                 <h1> {{ validationMessage }} </h1>
              <h1>{{ pin }}</h1>
              <ion-text v-if="$store.state.pin.status === 'wrongPin'" color="danger">
                    <p>Wrong pin</p>
              </ion-text>
              <ion-text v-if="$store.state.pin.status === 'locked'" color="danger">
                  <p>Locked Until: {{$store.state.pin.locked_until}}</p>
              </ion-text>
               <ion-text v-if="$store.state.pin.status === 'locked_until'" color="danger">
                  <p>Your account has been locked for 1 minute</p>
              </ion-text>
           
            </ion-text>
          </div>
            </ion-col>
        </ion-row>
          
      <form @submit.prevent="onSubmit">
      <ion-row>
        <ion-col>
          <ion-button @click="addPin(1)" > 1</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="addPin(2)" >2</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="addPin(3)" >3</ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="addPin(4)" >4</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="addPin(5)" >5</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="addPin(6)" >6</ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="addPin(7)" >7</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="addPin(8)" >8</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="addPin(9)" >9</ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>

        </ion-col>
        <ion-col>
          <ion-button @click="addPin(0)" >0</ion-button>
        </ion-col>
        <ion-col>

        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button @click="clearPin()" >Clear</ion-button>
        </ion-col>
        <ion-col>

        </ion-col>
        <ion-col>
          <ion-button :disabled="buttonDisabled || $store.state.pin.status === 'loading'" type="submit"> Next </ion-button>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
                <ion-button :disabled="$store.state.pin.hasVerifiedEmailStatus === 'loading'" @click="resetPin()" >Reset Pin</ion-button>
        </ion-col>
      </ion-row>
      
      <ion-row>
      <ion-col>
                <ion-item>
                <ion-text v-if="$store.state.pin.hasVerifiedEmailStatus === 'unverified'" color="danger">
                    <p>Please add and verify your email</p>
                  </ion-text>
                </ion-item>
        </ion-col>
         </ion-row>


      </form>
    </ion-grid>
            </ion-content>
  </div>
</template>

<script>
 import {mapActions, mapState } from 'vuex';

export default {
name: 'Pin',
    data() {
      return {
        pin: '',
      }
    },
    computed: {
       ...mapState([
        'status',
        'locked_until'
      ]),
      validationMessage: function ()  {
        if (this.pin.length != 5 ) {
          return 'Please input 5 digit pin';
        }

        return 'Now Click Next';
      },

      buttonDisabled: function() {
          return this.pin.length < 5;
      }
    },
    methods: {
      ...mapActions([
        'onPinSubmit',
        'onCheckVerifiedEmailSubmit',
        'hasPin'
      ]),
      onSubmit() {
           this.onPinSubmit({
             pin: this.pin
           })
      },

      resetPin() {
        this.onCheckVerifiedEmailSubmit();
      },

      addPin(value) {
        if (this.pin.length != 5) {
        this.pin += value;
        }

      },
      clearPin() {
        this.pin = '';
      }
  },
  beforeMount() {
      this.hasPin()
  }

}
</script>
