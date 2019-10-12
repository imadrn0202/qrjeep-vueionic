<template>
<ion-grid>
    <form>
            <ion-col>
                <ion-item>
                    <ion-label>Username: </ion-label>
                    <ion-input type="text" name="username"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Password: </ion-label>
                    <ion-input type="text" name="password"></ion-input>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item>
                    <ion-button type="submit" color="primary" expand="block">
                        Login
                    </ion-button>
                </ion-item>
            </ion-col>
    </form>
</ion-grid>
</template>

<script>
export default {
    name: 'Login'
}
</script>