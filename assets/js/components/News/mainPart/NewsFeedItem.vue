<template>
    <v-card color="white" class="news-common-card">
        <v-layout row wrap>
            <v-flex d-flex justify-center xs1 news-item-avatar-box>
                <v-avatar @click="gotoProfile(newsFeed.user)">
                    <img :src="avatarUrl(newsFeed.user)"/>
                </v-avatar>
            </v-flex>
            <v-flex xs11>
                <div class="text-box">
                    <div class="title-box">
                        <h6 @click="titleRedirect(newsFeed)" class="title-names mb-2">{{newsFeed.user.username}}
                            {{newsFeed.content.title ? newsFeed.content.title : ''}}
                            <span class="title-date">{{parseDate(newsFeed.created)}}</span>
                        </h6>
                        <span class="type-label" :style="{background: typeLabel}">{{renderType(newsFeed.type)}}</span>
                    </div>

                    <p class="mt-2 description">{{newsFeed.content.content}}</p>
                    <img v-if="newsFeed && newsFeed.type === 'Post' && newsFeed.content && newsFeed.content.giphy" :src="newsFeed.content.giphy" class="max-width-img">
                    <p v-if="newsFeed.content.location" class="mt-2 news-item-location">
                        {{newsFeed.content.location}}</p>
                    <p class="mt-2 news-item-sport">{{parseSport(newsFeed.user.sports_full)}}</p>
                    <img v-if="newsFeed.content.images.length" v-for="item in newsFeed.content.images" :src="item"
                         class="feed-item-image max-width-img"/>
                </div>
                <div class="action-box">
                    <div class="comment-button-box" @click="commentHandler()">
                        <v-btn fab small color="blue">
                            <v-icon color="white">chat_bubble</v-icon>
                        </v-btn>
                        <span class="common-button-text"> {{commentsNumber}} {{commentsNumber | pluralize('commentaire')}}</span>
                    </div>
                    <div v-if="liked" class="like-button-box" @click="unlikeHandler()">
                        <v-btn fab small color="blue">
                            <v-icon color="white">favorite_border</v-icon>
                        </v-btn>
                        <span class="common-button-text"> {{likedNumber}} {{likedNumber | pluralize('like')}}</span>
                    </div>
                    <div v-else class="like-button-box" @click="likeHandler()">
                        <v-btn fab small color="blue">
                            <v-icon color="white">favorite</v-icon>
                        </v-btn>
                        <span class="common-button-text"> {{likedNumber}} {{likedNumber | pluralize('like')}}</span>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <hr v-if="commentsNumber > 0 || collapse">
        <news-comment
                v-if="commentsNumber > 0"
                v-for="(item, index) in newsFeed.comment"
                :key="index"
                :comment="item"
                :parseDate="parseDate"
                :profileClickHandler="gotoProfile"
                :avatarUrl="avatarUrl"
        />
        <news-comment-form
                :sendHandler="sendComment"
                :user="user"
                :feedId="newsFeed.id"
        />
    </v-card>
</template>

<script>
    import moment from 'moment';
    import {EventBus} from '../../../main';
    import avatarMixin from '../../../mixins/avatarMixin';

    export default {
        props: ['newsFeed', 'user', 'sendComment'],
        mixins: [avatarMixin],
        data() {
            return {
                liked: false,
                likedNumber: 0,
                commentsNumber: 0,
                collapse: false,
                typeLabel: `red`
            }
        },
        mounted(){
            EventBus.$on('commented', ()=>{this.commentsNumber += 1});
        },
        methods: {
            likeHandler() {
                this.$http.post(`/feed/${this.newsFeed.id}/like/store`).then(response => {
                    this.liked = true;
                    this.likedNumber += 1;
                });
            },
            unlikeHandler() {
                this.$http.post(`/feed/${this.newsFeed.id}/like/remove`).then(response => {
                    this.liked = false;
                    this.likedNumber -= 1;
                });
            },
            commentHandler() {
                this.collapse = !this.collapse;
            },
            parseDate(date) {
                return moment(date).locale('fr').format('LLL');
            },
            parseSport(data) {
                if (data && data.length) {
                    const sports = [];
                    data.forEach((sport) => { sports.push(sport.name); });
                    if (sports.length < 4) {
                        return sports.join(', ');
                    } else {
                        return sports.slice(0, 3).join(', ');
                    }

                }
            },
            renderType(type) {
                if (type == 'Post') {
                    this.typeLabel = '#4a90e2';
                    return 'What\'s hot';
                } else if (type == 'Event') {
                    this.typeLabel = '#7ed321';
                    return 'Evénement';
                } else {
                    this.typeLabel = '#f8e71c';
                    return 'Sportif';
                }
            },
            gotoProfile(user){
                window.location.href = `/profile/${user.username}/${user.id}`;
            },
            titleRedirect(newsFeed){
                if (newsFeed.type == 'Event') {
                    window.location.href = `/event/${newsFeed.content.slug}`;
                } else {
                    this.gotoProfile(newsFeed.user);
                }
            }
        },
        created() {
            this.liked = this.newsFeed.liked;
            this.likedNumber = this.newsFeed.like.length;
            this.commentsNumber = this.newsFeed.comment.length;
        }
    }
</script>
<style lang="scss" scoped>
    @import '~VariablesStyles';

    .description {
        font-size: 12px;
        text-align: left;
        color: $black;
    }

    .text-box {
        margin-left: 10px;
        .title-box {
            display: flex;
            justify-content: space-between;
            h6 {
                display: table;
                font-size: 14px;
                .title-date {
                    color: $newsitemdate;
                }
            }
            .type-label {
                padding: 4px 15px;
                height: 20px;
                border-radius: 4px;
                font-size: 12px;
                text-align: left;
                color: #55474f;
            }
        }
    }

    .news-item-location {
        font-size: 12px;
        font-weight: normal;
        font-style: oblique;
    }

    .action-box {
        display: flex;
        button {
            height: 31px;
            width: 31px;
            font-size: 14px;
        }
    }

    .common-button-text {
        font-size: 12px;
        cursor: pointer;
    }

    img.feed-item-image {
        max-width: 100%;
        max-height: 400px;
    }

    @media screen and (max-width: 600px) {
        .title-box {
            flex-direction: column;
            .type-label {
                width: max-content;
            }
        }
        /deep/ div.avatar{
            height: 40px !important;
            width: 40px !important;
            margin-left: 10px;
        }
    }
</style>