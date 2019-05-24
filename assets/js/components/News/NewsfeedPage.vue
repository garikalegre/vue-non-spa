<template>
    <v-container grid-list-md newsfeed-page>
        <v-layout row wrap>
            <v-flex d-flex hidden-md-and-down lg3>
                <news-left
                        :user="user"
                        :renderDate="renderDate"
                        :parseSport="parseSport"
                        :avatarUrl="avatarUrl"
                />
            </v-flex>
            <v-flex d-flex md8 lg6 xl7>
                <news-main
                        :user="user"
                        :news="news"
                        :sendHandler="sendPostHandler"
                        :sendComment="sendComment"
                        :infiniteHandler="infiniteHandler"
                        :loading="loading"
                />
            </v-flex>
            <v-flex d-flex hidden-sm-and-down md4 lg3 xl2>
                <news-right
                        :suggestedFriends="suggestedFriends"
                        :suggestedEvents="suggestedEvents"
                        :countAllSuggestedFriends="allSuggestedFriends"
                        :countAllSuggestedEvents="allSuggestedEvents"
                        :addHandler="addHandler"
                        :goToEvent="goToEvent"
                        :renderDate="renderDate"
                        :renderLocation="renderLocation"
                        :redirectToItem="redirectToItem"
                />
            </v-flex>
        </v-layout>
        <v-snackbar
                :timeout="5000"
                :color="`green accent-4`"
                v-model="snackbar"
        >
            {{ text }}
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import moment from 'moment';
    import {EventBus} from '../../main';
    import avatarMixin from '../../mixins/avatarMixin';

    export default {
        props: ['user'],
        mixins: [avatarMixin],
        data() {
            return {
                text: null,
                snackbar: false,
                suggestedFriends: [],
                allSuggestedFriends: null,
                suggestedEvents: [],
                allSuggestedEvents: null,
                news: [],
                allNewsCount: 0,
                page: 1,
                loading: false
            }
        },
        created() {
            this.getSuggestedFriends();
            this.getSuggestedEvents();
        },
        methods: {
            getSuggestedFriends() {
                this.$http.get('/newsfeed/suggested-friends').then(response => {
                    this.suggestedFriends = [];
                    if (response && response.body && Array.isArray(response.body.data)) {
                        const suggestedFriends = response.body.data;
                        suggestedFriends.forEach(friend => {
                            if (!this.friendsIds.includes(friend.id) && this.suggestedFriends.length < 4) {
                                this.suggestedFriends.push(friend);
                            }
                        });
                        this.allSuggestedFriends = response.body.count;
                    }
                });
            },
            getSuggestedEvents() {
                this.$http.get('/newsfeed/suggested-events').then(response => {
                    if (response && response.body && Array.isArray(response.body.data)) {
                        this.suggestedEvents = response.body.data.slice(0, 5);
                        this.allSuggestedEvents = response.body.count;
                    }
                });
            },
            addHandler(item) {
                this.$http.post(`/friends/request/friend/${item.id}`).then(response => {
                    this.text = `Invitation envoyée à ${item.username}`;
                    this.snackbar = true;
                    this.getSuggestedFriends();
                });
            },
            goToEvent(data){
                window.location.href = `/event/${data.slug}`;
            },
            renderDate(date) {

                return moment(date).locale('fr').format('LL');
            },
            renderLocation(data) {
                const loc = data.split(',');

                return loc[0];
            },
            getNews() {
                this.$http.get('/newsfeed/list').then(response => {
                    if (response && response.data && response.data.news) {
                        this.news = response.data.news;
                        this.allNewsCount = response.data.count;
                        this.loading = false;
                    }
                });
            },
            sendPostHandler(data) {
                const fd = new FormData;
                if (data.files.length) {
                    data.files.forEach((file) => {
                        fd.append('file[]', file.file, file.name);
                    });
                }
                if (data.text) {
                    fd.append('content', data.text);
                }
                if (data.giphy) {
                    fd.append('gif', data.giphy);
                }
                this.$http.post('/post/store', fd).then(response => {
                    this.getNews();
                    this.loading = true;
                });
            },
            sendComment(data) {
                const fd = new FormData;
                if (data.text) {
                    fd.append('content', data.text);
                }
                if (data.giphy) {
                    fd.append('gif', data.giphy);
                }
                if (data.file && data.file.name) {
                    fd.append('file', data.file.file, data.file.name);
                }
                this.$http.post(`/feed/${data.id}/comment/store`, fd).then(response => {
                    this.getNews();
                    EventBus.$emit('commented');
                });
            },
            infiniteHandler($state) {
                if (this.news && this.allNewsCount > this.news.length || this.allNewsCount === 0) {
                    this.$http.get('/newsfeed/list', {
                        params: {
                            // page: Math.ceil((this.news.length) / 15) + 1
                            page: this.page
                        }
                    }).then(response => {
                        if (response && response.data && response.data.news) {
                            this.allNewsCount = response.data.count;
                            this.news = this.news.concat(response.data.news);
                            this.page += 1;
                            $state.loaded();
                        }
                    }, response => {
                        $state.complete();
                    });
                } else {
                    $state.complete();
                }
            },
            parseSport(data) {
                if (data && Array.isArray(data)) {
                    const sports = [];
                    data.forEach((sport) => { sports.push(sport.name); });
                    if (sports.length < 4) {
                        return sports.join(', ');
                    } else {
                        return sports.slice(0, 3).join(', ');
                    }

                }
            },
            redirectToItem(link){
                window.location.href = link;
            }
        },
        computed: {
            friendsIds() {
                const friendsIds = [];
                if (this.user && this.user.friends && this.user.friends.length) {
                    if (this.friends && Array.isArray(this.friends)) {
                        this.user.friends.forEach(friend => {
                            friendsIds.push(friend.id);
                        });
                    }
                }

                return friendsIds;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        max-width: 1200px !important;
    }
    .newsfeed-page{
        margin-top: 50px;
    }
    @media screen and (max-width: 600px) {
        .newsfeed-page{
            margin-top: 25px;
        }
    }
</style>