<template functional>
    <div
        v-if="props.type === 'amateur'"
        class="friend-card__user-type friend-card__user-type_yellow">
            {{ 'Sportif amateur' }}
    </div>
    <div
        v-else-if="props.type === 'professional'"
        class="friend-card__user-type friend-card__user-type_blue">
            {{ 'Sportif pro' }}
    </div>
    <div
        v-else-if="props.type === 'coach'"
        class="friend-card__user-type friend-card__user-type_red">
            {{ 'Coach' }}
    </div>
    <div
        v-else-if="props.type === 'fitness trainer'"
        class="friend-card__user-type friend-card__user-type_purple">
            {{ 'Préparateur' }}
    </div>
    <div
        v-else-if="props.type === 'nutritionist'"
        class="friend-card__user-type friend-card__user-type_green">
            {{ 'Nutritionniste' }}
    </div>
</template>

<style lang="scss">

    .friend-card__user-type {
        position: absolute;
        top: 20px;
        right: 0;
        font-size: 12px;
        font-style: italic;
        line-height: 20px;
        background-image: url('/images/user_type_label.svg');
    }

    .friend-card__user-type_yellow {
        padding-left: 28px;
        padding-right: 11px;
        background-position: 95% 0;
    }

    .friend-card__user-type_blue {
        padding-left: 28px;
        padding-right: 10px;
        background-position: 98% 25%;
        color: #fff;
    }

    .friend-card__user-type_red {
        padding: 0 10px;
        background-position: 108% 101%;
        color: #fff;
    }

    .friend-card__user-type_green {
        padding-left: 28px;
        padding-right: 10px;
        background-position: 50% center;
        color: #fff;
    }

    .friend-card__user-type_purple {
        padding-left: 24px;
        padding-right: 12px;
        background-position: 135% 76%;
        color: #fff;
    }

</style>