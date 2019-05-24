<template>
    <v-card class="friend-card elevation-0">
        <v-card-media class="friend-card__avatar-box">
            <a
                class="friend-card__avatar-image"
                :title="user.username"
                :href="`/profile/${user.username}/${user.id}`"
                @click="goProfile(user)">
                    <v-avatar :size="`130px`">
                        <img :src="avatarUrl(user)"/>
                    </v-avatar>
            </a>
            <friend-type-label :type="user.level"/>
        </v-card-media>
        <v-card-title class="d-flex friend-card__about">
            <a :href="`/profile/${user.username}/${user.id}`" class="friend-card__name">
                {{ user.username }}
            </a>
            <a :href="`/profile/${user.username}/${user.id}`" class="friend-card__location">
                {{ user.location || user.geolocation }}
            </a>
            <div class="friend-card__description">
                {{ user.description }}
            </div>
            <div
                class="friend-card__sport"
                @click="goProfile(user)">
                    <friend-sports-list :sports="user.sports"/>
            </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex friend-card__button-box">
            <component
                v-if="isauth"
                :is="currentView"
                :addHandle="addHandle"
                :userID="user.id"
                :username="user.username"
                :sendMessageHandle="sendMessageHandle"
                :applyHandler="applyHandler"
            />
            <v-btn v-else outline round color="blue" @click="dialog = true">ajouter</v-btn>
        </v-card-actions>
        <v-dialog v-model="dialog" width="350">
            <v-card class="px-3 py-3">
                <v-card-text class="text-xs-center">Cette action est réservée aux membres connectés.</v-card-text>
                <v-card-actions class="guest-dialog-box">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" outline round tag href="/register" flat="flat">inscription</v-btn>
                    <v-btn color="blue darken-1" outline round tag href="/login" flat="flat">connexion</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default {
    props:{
        isauth:{
            type: Boolean,
            default: true
        },
        currentView: String,
        addHandle: Function,
        user: Object,
        sendMessageHandle: Function,
        applyHandler: Function,
        goProfile: Function,
        avatarUrl: Function
    },
    data(){
        return {
            dialog: false
        }
    }
}
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .friend-card {
        display: flex;
        flex-direction: column;
        width: 300px;
        min-width: 280px;
        max-width: 320px;
        margin: 20px;
        padding: 20px;
        background-color: $white;
    }

    .friend-card__avatar-box {
        position: relative;
    }

    .friend-card__avatar-image {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
    }

    .friend-card__button-box {
        width: 75%;
        align-self: center;
        padding: 0;
        margin: 16px 0 12px 0;
    }

    .friend-card__about {
        flex-direction: column;
        padding: 0;
    }

    .friend-card__name {
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        color: $newstitlenames;
        padding: 10px 0 5px 0;
    }

    .friend-card__location {
        text-decoration: none;
        font-size: 14px;
        color: $newsitemdate;
    }

    .friend-card__description {
        font-size: 13px;
        padding: 10px 0 10px 0;
        cursor: default;
    }

    .friend-card__sport {
        color: $gray-sports-list-text;
        cursor: pointer;
        width: 100%;
        max-height: 43px;
        overflow: hidden;
    }

    /deep/ .chip__content{
        z-index: 0;
    }

    @media only screen and (min-width: 600px) and (max-width: 959px) {
        .friend-card {
            margin: 10px;
            min-width: 270px;
        }
    }

    @media only screen and (min-width: 400px) and (max-width: 599px) {
        .friend-card {
            margin: 10px auto;
            min-width: 380px;
        }
    }

    @media only screen and (min-width: 350px) and (max-width: 399px) {
        .friend-card {
            margin: 10px auto;
            min-width: 330px;
        }
    }

    @media only screen and (max-width: 349px) {
        .container {
            margin: 10px auto;
            min-width: 310px;
        }
    }

</style>