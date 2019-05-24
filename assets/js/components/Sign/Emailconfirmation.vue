<template functional>
    <v-card class="main-page-card">
        <v-avatar :size="`260px`">
            <img :src="`/images/no_user.svg`">
        </v-avatar>
        <br>
        <h2 class="text-xs-center"><b>Merci de confirmer votre adresse email.</b></h2>
        <p class="text-xs-justify"> Nous venons de vous envoyer un email, il vous suffit de cliquer sur le lien de confirmation pour valider votre compte et rejoindre la communauté Sportialize.</p>
    </v-card>
</template>

<style lang="scss" scoped>
    .main-page-card {
        padding: 30px;
    }
</style>