<template functional>
    <div class="banner text-xs-center">
        <h3 class="pl-2 pr-2">Créez et gérez vos événements sportifs gratuitement</h3>
        <img width="200" height="150" :src="`/images/hp_events.svg`">
        <v-btn tag :href="`/event/create`" outline round color="blue" class="invite-banner-btn">Créer mon événement</v-btn>
    </div>
</template>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .banner {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 329px;
        color: $white;
        background-image: linear-gradient(136deg, #3023ae, #c86dd7);
        .invite-banner-btn {
            background: $white !important;
            text-transform: capitalize;
        }
    }
</style>