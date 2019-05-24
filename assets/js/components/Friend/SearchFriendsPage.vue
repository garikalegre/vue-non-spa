<template>
    <v-layout row wrap>
        <v-flex xs12>
            <friends-filter :sports="sports" v-on:ffiltering="getParams"/>
        </v-flex>
        <v-flex xs12 friends-list-box v-if="exactList && exactList.length">
            <div class="friends-list">
                <p class="subheading">
                    <span class="length-items">{{exactList.length}}</span> sportifs à proximité aiment les mêmes sports que vous
                </p>
                <v-container>
                    <v-layout row wrap justify-center>
                        <v-flex v-for="item in exactList" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                            <friend-card
                                :user="item"
                                :currentView="currentView(item.id)"
                                :addHandle="addHandle"
                                :sendMessageHandle="sendMessageHandle"
                                :applyHandler="()=>{}"
                                :goProfile="goProfile"
                                :avatarUrl="avatarUrl"
                                :isauth="isauth"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
        <v-flex xs12 v-else v-show="params && (params.latitude || params.longitude || params.sports)">
            <p class="mt-5 subheading text-xs-center">Aucun membres ne correspond à votre recherche. Suggestions: Essayez d'autres sports ou d'autre villes.</p>
        </v-flex>
        <v-flex xs12 friends-list-box v-if="otherList && otherList.length">
            <div class="friends-list">
                <p class="subheading">
                    <span class="length-items">{{otherList.length}}</span> sportifs qui pourraient également vous intéresser
                </p>
                <p class="subheading" v-if="false">
                    <span class="length-items">{{otherList.length}}</span> sportifs trouvés
                </p>
                <v-container>
                    <v-layout row wrap justify-center>
                        <v-flex v-for="item in otherList" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                             <friend-card
                                :user="item"
                                :currentView="currentView(item.id)"
                                :addHandle="addHandle"
                                :sendMessageHandle="sendMessageHandle"
                                :applyHandler="()=>{}"
                                :goProfile="goProfile"
                                :avatarUrl="avatarUrl"
                                :isauth="isauth"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
        <v-flex text-xs-center xs12 no-friends-list-box v-if="!loading && !otherList && !exactList">
            <v-avatar :size="`260px`">
                <img :src="`/images/no_results.svg`">
            </v-avatar>
            <div class="text-xs-center">
                <h3>Pas de résultats</h3>
                <br>
                <h4>Vous n'avez pas encore ajouté d'amis</h4>
                <v-btn color="indigo" large @click="inviteFriends()">
                    Inviter des amis
                </v-btn>
            </div>
        </v-flex>

        <preloader
            v-if="loading"
            :size="70"
            :width="7"/>

    </v-layout>
</template>

<script>
import friendsMixin from '../../mixins/friendsMixin';
import avatarMixin from '../../mixins/avatarMixin';
    export default {
        mixins: [friendsMixin, avatarMixin],
        props:['isauth'],
        data() {
            return {
                sports: [],
                exactList: [],
                otherList: [],
                params: {},
                loading: true,
                friends: null,
                friendsIds: [],
                requestedIds: []
            }
        },
        created() {
            this.getSports();
            this.findFriends();
            if(this.isauth) {
                this.getFriends();
                this.getRequested();
            }
        },
        methods: {
            currentView(id) {
                if (this.friendsIds.includes(id)) {

                    return `message-btn`;
                } else if (this.requestedIds.includes(id)) {

                    return `invite-btn`;
                } else {

                    return `plus-btn`;
                }
            },
            refresh() {
                this.getFriends();
                this.findFriends();
                this.getRequested();
            },
            getSports() {
                this.sports = [];
                this.$http.get('/sport/list').then(response => {
                    if (response && response.data && Array.isArray(response.data)) {
                        response.data.forEach(item => {
                            this.sports.push({
                                name: item.name,
                                id: item.id
                            });
                        });
                    }
                });
            },
            findFriends() {
                this.loading = true;
                this.$http.get('/friends/search', {params: this.params}).then(response => {
                    this.friendsList = [];
                    if (response && response.data) {
                        this.exactList = response.data.exact;
                        this.otherList = response.data.other;
                    }
                    this.loading = false;
                });
            },
            getFriends() {
                this.$http.get('/friends/list').then(response => {
                    this.friends = response.body;
                    this.getFriendsIds();
                });
            },
            getRequested() {
                this.requestedIds = [];
                const requested = [];
                this.$http.get('/friends/requested-users').then(response => {
                    if (response && response.body && Array.isArray(response.body)){
                        response.body.forEach(item => {
                           if (item.accepted === 0) {
                                requested.push(item);
                           }
                        });
                    }
                    this.requested = requested;
                    if (this.requested && Array.isArray(this.requested)) {
                        this.requested.forEach(user => {
                            this.requestedIds.push(user.id);
                        });
                    }
                });
            },
            getParams(params) {
                this.params = params;
                this.findFriends();
            },
            getFriendsIds() {
                this.friendsIds = [];
                if (this.friends && Array.isArray(this.friends)) {
                    this.friends.forEach(friend => {
                        this.friendsIds.push(friend.id);
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .length-items {
        color: $secondary;
    }

    .friends-list {
        margin-top: 20px;
        p.subheading {
            padding: 15px 0 10px 20px;
            margin: 0;
            width: 100%;
            text-align: center;
        }
    }

    @media only screen and (min-width: 1904px) {
        .container {
            max-width: 2060px;
        }
    }

    @media only screen and (min-width: 1264px) and (max-width: 1903px) {
        .container {
            max-width: 1320px;
        }
    }

    @media only screen and (min-width: 960px) and (max-width: 1263px) {
        .container {
            max-width: 980px;
        }
    }

    @media only screen and (min-width: 600px) and (max-width: 959px) {
        .container {
            max-width: 680px;
        }
    }

    @media only screen and (min-width: 400px) and (max-width: 599px) {
        .container {
            max-width: 380px;
            padding: 0;
        }
    }

    @media only screen and (min-width: 350px) and (max-width: 399px) {
        .container {
            max-width: 380px;
            padding: 0;
        }
    }

    @media only screen and (max-width: 349px) {
        .container {
            max-width: 320px;
            padding: 0;
        }
    }

</style>