<template>
    <v-container>
        <v-layout column wrap event-page v-if="event">
            <v-flex xs12 md10 offset-md1>
                <v-card class="common-box event-info-box">
                    <v-flex xs12 sm5>
                        <img :src="event.photoPath || `/images/noevent.jpeg`" >
                    </v-flex>
                    <v-flex xs12 sm6 offset-sm1 v-if="event && event.location && event.start">
                        <h2 class="text-xs-center">{{event.name}}</h2>
                        <div class="date-location-box">
                            <div>
                                <v-icon>event </v-icon>
                               {{formattingDate(event.start.date)}}
                            </div>
                            <div>
                                <v-icon>location_on </v-icon>
                                {{event.location}}
                            </div>
                            <div>
                                <v-icon>supervisor_account</v-icon>
                                À la recherche de: {{event.partnerAmount}} personnes
                            </div>
                            <v-btn v-if="isJoined" color="indigo" @click="unJoinEvent()">Je me désincris</v-btn>
                            <v-btn v-else color="indigo" @click="joinEvent()">
                                Je m'inscris
                            </v-btn>
                        </div>
                    </v-flex>
                </v-card>
                <v-card v-if="event && event.description" class="common-box event-description-box">
                    <h3 class="text-xs-center">Description</h3>
                    <v-divider></v-divider>
                    <div v-html="event.description"></div>
                </v-card>
                <v-card class="common-box event-members-box">
                    <h3 class="text-xs-center">
                        {{users.length}} sportifs inscrits
                    </h3>
                    <v-divider></v-divider>
                    <div class="avatars-wrap">
                        <div class="avatar-box" v-for="user in users" :key="user.id">
                            <user-avatar :user="user" :avatarUrl="avatarUrl" :avatarSize="`60px`" :show="true"/>
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <v-dialog v-model="dialog" scrollable max-width="300px">
                        <v-btn outline color="indigo" large slot="activator">
                            <v-icon>redo</v-icon>
                            Inviter
                        </v-btn>
                        <v-card>
                            <v-card-title><h4 class="text-xs-center">Invite tes amis</h4></v-card-title>
                            <v-divider></v-divider>
                            <v-card-text style="height: 300px;">
                                <v-list>
                                    <v-list-tile avatar v-for="item in friends" v-bind:key="item.id">
                                        <v-list-tile-avatar>
                                            <img v-bind:src="item.avatar || `/images/main_no_avatar.svg`"/>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.fullname"/>
                                        </v-list-tile-content>
                                        <v-list-tile-action
                                                v-if="joinedIds.includes(item.id) || invitedIds.includes(item.id)">
                                            <v-icon>done</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-action :class="'invite-button'" v-else
                                                            @click="sendInvite(item.id)">
                                            <v-icon>send</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="dialog-actions">
                                <v-btn color="blue darken-1" class="invite-btn" large tag :href="`/tell-friends`">Inviter des amis</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="dialog = false">Fermer</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
                <div class="join-event-box">
                    <div class="do-buttons">
                        <v-btn v-if="isJoined" color="indigo" @click="unJoinEvent()">Je me désincris</v-btn>
                        <v-btn color="indigo" large v-else @click="joinEvent()">
                            Je m'inscris
                        </v-btn>
                    </div>
                </div>
                <v-card class="common-box event-comments-box">
                    <h3 class="text-xs-left">Commentaires</h3>
                    <v-divider></v-divider>
                    <comments-container :slug="slug"/>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar
                :timeout="6000"
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
    import avatarMixin from '../../mixins/avatarMixin';

    export default {
        mixins: [avatarMixin],
        data() {
            return {
                event: null,
                dialog: false,
                friends: [],
                isJoined: false,
                users: [],
                joinedIds: [],
                invitedIds: [],
                snackbar: false,
                text: '',
            }
        },
        methods: {
            formattingDate(date){
              return moment(date).locale('fr').format('llll');
            },
            getEvent() {
                this.$http.get(`/event/${this.slug}`, {params: {data: 'event'}}).then(response => {
                    if (response && response.data) {
                        this.event = response.data
                    }
                });
            },
            getFriends() {
                this.$http.get('/friends/list').then(response => {
                    this.friends = response.body;
                });
            },
            joined() {
                this.$http.get(`/join/${this.slug}`).then(response => {
                    if (response && response.data) {
                        this.isJoined = response.data.joined;
                    }
                });
            },
            joinEvent() {
                this.$http.post(`/join/${this.slug}`).then(response => {
                    if (response) {
                        this.isJoined = true;
                        this.text = 'Inscription validée';
                        this.snackbar = true;
                        this.joinedUsers();
                        this.getInvitedIds();
                    }
                });
            },
            unJoinEvent() {
                this.$http.post(`/unjoin/${this.slug}`).then(response => {
                    if (response) {
                        this.isJoined = false;
                        this.text = 'Inscription annulée';
                        this.snackbar = true;
                        this.joinedUsers();
                        this.getInvitedIds();
                    }
                });
            },
            joinedUsers() {
                this.$http.get(`/joined/${this.slug}`).then(response => {
                    if (response && response.data) {
                        this.users = response.data;
                        const userIds = [];
                        this.users.forEach(user => {
                            userIds.push(user.id);
                        });
                        this.joinedIds = userIds;

                    }
                });
            },
            sendInvite(id) {
                const fd = new FormData;
                fd.append('user', id);
                this.$http.post(`/invite/${this.slug}`, fd).then(response => {
                    if (response) {
                        this.invitedIds.push(id);
                        this.text = 'Invitation envoyée';
                        this.snackbar = true;
                    }
                });
            },
            getInvitedIds() {
                this.$http.get(`/invited/${this.slug}`).then(response => {
                    if (response && response.data) {
                        this.invitedIds = response.data;
                    }
                });
            }
        },
        computed: {
            slug() {
                const locArray = window.location.href.split('/');

                return locArray.length ? locArray[locArray.length - 1] : 0;
            }
        },
        created() {
            this.joined();
            this.joinedUsers();
            this.getEvent();
            this.getFriends();
            this.getInvitedIds();
        },
        beforeDestroy() {
            this.joinedIds = [];
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .event-page {
        /deep/ .dialog .card {
            color: $black;
        }
        button{
            margin: 0;
        }
        .common-box {
            background-color: $white;
            margin-bottom: 25px;
            padding: 15px;
        }
        .event-info-box {
            display: flex;
            justify-content: space-between;
            .date-location-box {
                display: flex;
                flex-direction: column;
                button{
                    color: $white;
                }
            }
            img{
                max-width: 100%;
                max-height: 300px;
            }
        }
        .event-description-box {
            display: flex;
            flex-direction: column;
        }
        .event-members-box {
            /deep/ .dialog__container{
                width: 100%;
                /deep/ .dialog__activator{
                    float: right;
                    button{
                        color: $white;
                    }
                }
            }
            .avatars-wrap {
                display: flex;
                flex-direction: row;
                flex-flow: wrap;
                .avatar-box {
                    display: flex;
                }
            }
        }
        .join-event-box {
            display: block;
            margin-bottom: 25px;
            .do-buttons {
                color: $white;
            }
            button{
                width: 100%;
            }
        }
        .invite-button {
            cursor: pointer;
        }
    }
    .dialog-actions{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        .invite-btn{
            color: $white;
        }
    }
    @media screen and (max-width: 600px){
        .event-page .event-info-box{
            display: block;
        }
    }
</style>