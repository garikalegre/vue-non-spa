<template functional>
    <div class="suggested-wrapper">
        <v-layout row wpap>
            <v-flex d-flex justify-center xs3 friend-avatar-box>
                <v-avatar :size="`60px`" @click="props.redirectToItem(props.link)" >
                    <img :src="props.url || `/images/main_no_avatar.svg`"/>
                </v-avatar>
            </v-flex>
            <v-flex xs9 news-item-info>
                <div @click="props.redirectToItem(props.link)"><p class="title-names mb-2">{{props.title}}</p></div>
                <div @click="props.redirectToItem(props.link)"><p class="mb-1" v-if="props.date">{{props.date}}</p></div>
                <div @click="props.redirectToItem(props.link)"><p class="mb-1 news-item-location">{{props.location}}</p></div>
                <div @click="props.redirectToItem(props.link)"><p class="mb-1 news-item-sport">{{props.sport}}</p></div>

                <v-btn outline @click="props.clickHandler(props.data)" class="feeds-common-btn" round color="blue">
                    <v-icon>{{props.btnIcon}}</v-icon> &nbsp; {{props.btnText}}
                </v-btn>
            </v-flex>
        </v-layout>
        <hr class="mt-2 mb-2">
    </div>
</template>

<style lang="scss" scoped>
    .news-item-info{
        display: flex;
        flex-direction: column;
    }
</style>