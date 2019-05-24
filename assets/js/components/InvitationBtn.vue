<template functional>
    <div class="invite-box text-xs-center">
        <div class="icon-ok">
            <v-icon>done</v-icon>
        </div>
        <div class="text-info-box d-flex">
            <span>Invitation envoyée</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '~VariablesStyles';

.invite-box {
    .icon-ok {
        display: inline-flex;
    }
    .text-info-box {
        display: inline-flex;
        transform: translateY(-8px);
        span {
            font-size: 12px;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: -0.4px;
            text-align: center;
            color: #898989;
        }
    }
}

</style>