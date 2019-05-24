<template functional>
    <v-card>
        <div class="no-result-card">
            <v-avatar :size="props.sizeImg">
                <img :src="props.imagePath">
            </v-avatar>
            <h4 class="text-xs-center">{{props.text}}</h4>
            <v-btn color="indigo" @click="props.customClickHandler()">{{props.btnText}}</v-btn>
        </div>
    </v-card>
</template>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .no-result-card{
        background-color: $white;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
            min-width: 280px;
            border-radius: 0;
            color: $white;
        }
        /deep/ .avatar {
            margin-bottom: 25px;
        }
    }

    @media only screen and (max-width: 349px) {
        .no-result-card {
            button {
                min-width: 260px;
            }
        }
    }

</style>