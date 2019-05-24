<template functional>
    <div class="banner text-xs-center">
        <h3 class="pl-2 pr-2">Invitez vos amis sportifs à rejoindre Sportialize</h3>
        <img width="250" height="150" :src="`/images/hp_header_clear.svg`">
        <v-btn tag :href="`/tell-friends`" outline round color="blue" class="invite-banner-btn">Invitez vos amis</v-btn>
    </div>
</template>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .banner {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 329px;
        color: $white;
        background-image: linear-gradient(158deg, #001557 3%, #021b60 11%, #062d79 24%, #0b4399 38%, #1c6dc4 67%, #3d87c4 75%, #92cac3 93%, #b4e5c3);
        .invite-banner-btn {
            background: $white !important;
            text-transform: capitalize;
        }
    }
</style>