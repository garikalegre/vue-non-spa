<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 v-if="requests && requests.length">
                <div class="friends-list">
                    <p class="subheading"><span class="length-items">{{requests.length}}</span> invitations reçues</p>
                    <v-container>
                        <v-layout row wrap justify-center>
                            <v-flex v-for="item in requests" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                                <friend-card
                                    :user="item"
                                    :currentView="`requests-btn`"
                                    :addHandle="()=>{}"
                                    :avatarUrl="avatarUrl"
                                    :sendMessageHandle="()=>{}"
                                    :applyHandler="applyHandler" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
            <v-flex xs6 offset-xs3 do-button v-show="!loading" v-if="(friends && friends.length) || (requested && requested.length)">
                <v-btn color="indigo" large @click="inviteFriends()">
                    Inviter des amis
                </v-btn>
            </v-flex>
            <v-flex xs12 v-if="friends && friends.length">
                <div class="friends-list">
                    <p class="subheading"><span class="length-items">{{friends.length}}</span> amis</p>
                    <v-container>
                        <v-layout row wrap justify-center>
                            <v-flex v-for="item in friends" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                                <friend-card
                                    :user="item"
                                    :currentView="`message-btn`"
                                    :addHandle="()=>{}"
                                    :sendMessageHandle="sendMessageHandle"
                                    :applyHandler="()=>{}"
                                    :avatarUrl="avatarUrl"
                                    :goProfile="goProfile" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
            <v-flex text-xs-center xs12 no-friends-list-box v-else-if="!requested.length" v-show="!loading">
                <v-avatar :size="`260px`">
                    <img :src="`/images/no_results.svg`">
                </v-avatar>
                <div class="text-xs-center">
                    <h3>Pas de résultats</h3>
                    <br>
                    <h4>Vous n'avez pas encore ajouté d'amis</h4>
                    <v-btn color="indigo" large  tag href="/friend/search">Rechercher des partenaires</v-btn>
                    <v-btn color="indigo" large @click="inviteFriends()">
                        Inviter des amis
                    </v-btn>
                </div>
            </v-flex>
            <v-flex v-if="requested && requested.length">
                <div class="friends-list">
                    <p class="subheading"><span class="length-items">{{requested.length}}</span> {{requested.length > 1 ? `invitations envoyées` : `invitation envoyée`}} </p>
                    <v-container>
                        <v-layout row wrap justify-center>
                            <v-flex v-for="item in requested" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                                <friend-card
                                    :user="item"
                                    :currentView="`invite-btn`"
                                    :avatarUrl="avatarUrl"
                                    :addHandle="()=>{}"
                                    :sendMessageHandle="()=>{}"
                                    :applyHandler="()=>{}"
                                    :goProfile="goProfile" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>

            <preloader
                v-if="loading"
                :size="70"
                :width="7"/>

        </v-layout>
        <v-snackbar
            :timeout="5000"
            :color="`green accent-4`"
            v-model="snackbar">
                {{ text }}
                <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import friendsMixin from '../../mixins/friendsMixin';
    import avatarMixin from '../../mixins/avatarMixin';
    export default {
        mixins: [friendsMixin, avatarMixin],
        data() {
            return {
                requested: null,
                requests: null,
                friends: null,
                loading: false,
                snackbar: false,
                text: ''
            }
        },
        created() {
            this.getFriends();
            this.getRequests();
            this.getRequested();
        },
        methods: {
            applyHandler(option) {
                if (option && option.type) {
                    this.$http.get(`/friend_request/from/${option.id}/positive`);
                    this.text = `Vous êtes maintenant ami avec ${option.name}`;
                    this.snackbar = true;
                    this.refresh();
                } else {
                    this.$http.get(`/friend_request/from/${option.id}/negative`);
                    this.text = `Invitation refusée`;
                    this.snackbar = true;
                    this.refresh();
                }
            },
            refresh(){
                this.getFriends();
                this.getRequests();
                this.getRequested();
            },
            getFriends() {
                this.loading = true;
                this.$http.get('/friends/list').then(response => {
                    this.friends = response.body;
                    this.loading = false;
                });
            },
            getRequests() {
                this.loading = true;
                this.$http.get('/friends/request').then(response => {
                    this.requests = response.body;
                    this.loading = false;
                });
            },
            getRequested() {
                this.loading = true;
                let requested = [];
                this.$http.get('/friends/requested-users').then(response => {
                    if (response && response.body && response.body.length){
                        response.body.forEach(item => {                            
                           if (item.accepted === 0) {
                                requested.push(item);
                           }
                        });
                    }
                    this.requested = requested;
                    this.loading = false;                    
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .filters-box {
        margin-top: 5px;
    }

    .do-button {
        margin-top: 45px;
        color: $white;
    }

    button {
        width: 100%;
    }

    .length-items {
        color: $secondary;
    }

    .friends-list {
        margin-top: 20px;
        p.subheading {
            padding: 15px 0 0 20px;
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