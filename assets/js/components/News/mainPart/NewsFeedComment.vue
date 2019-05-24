<template functional>
    <v-layout row wrap comment-box>
        <v-flex d-flex justify-center xs1>
            <v-avatar @click="props.profileClickHandler(props.comment.user)">
                <img :src="props.avatarUrl(props.comment.user)"/>
            </v-avatar>
        </v-flex>
        <v-flex xs10>
            <div class="text-box">
                <h6 @click="props.profileClickHandler(props.comment.user)" class="title-names">
                    {{props.comment.user.username}}
                    <span class="title-date">{{props.parseDate(props.comment.created.date)}}</span>
                </h6>
                <p class="mt-2 description">{{props.comment.content}}</p>
                <img v-if="props.comment.giphy" :src="props.comment.giphy" class="max-width-img" />
                <img v-if="props.comment.image" :src="props.comment.image" class="max-width-img" />
            </div>
        </v-flex>
        <v-divider></v-divider>
    </v-layout>
</template>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .comment-box {
        padding-top: 15px;
        .text-box {
            margin-left: 10px;
            .description {
                font-size: 12px;
                text-align: left;
                color: $black;
            }
        }
    }

    .text-box {
        margin-left: 10px;
        h6 {
            display: table;
            font-size: 14px;
            .title-date {
                color: $newsitemdate;
            }
        }
    }
</style>