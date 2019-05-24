<template>
    <v-flex xs12 messages-threads>
        <v-tabs v-model="active">
            <v-tabs-bar class="blue">
                <v-tabs-item
                        :key="`Messages`"
                        :href="`#messages`"
                        ripple
                >
                    Messages <v-chip
                        color="red"
                        text-color="white"
                        v-if="threads && threads.length  && threads[0].unread_messages"
                >{{threads[0].unread_messages}}</v-chip>
                </v-tabs-item>
                <v-tabs-item
                        :key="`Notifications`"
                        :href="`#notification`"
                        ripple
                >
                    Notifications <v-chip
                        color="red"
                        text-color="white"
                        v-if="unread"
                >{{unread}}</v-chip>
                </v-tabs-item>
                <v-tabs-slider color="yellow"></v-tabs-slider>
            </v-tabs-bar>

            <v-tabs-items>
                <v-tabs-content
                        :key="`Messages`"
                        :id="`messages`"
                >
                    <v-list>
                        <v-list-tile avatar v-for="thread in threads" :key="thread.id" @click="redirectToChat(thread.id)">
                            <v-list-tile-avatar>
                                <img :src="getAvatarUrl(thread)"/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="getParticipantsName(thread)"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="lastMessage(thread.last_message.body)"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <span class="date">{{renderDate(thread.last_date)}}</span>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-tabs-content>
                <v-tabs-content
                        :key="`Notifications`"
                        :id="`notification`"
                >
                    <v-list>
                        <v-list-tile avatar v-for="item in notifs" :key="item.id" :class="{unread: !item.read}" @click="goToItem(item)">
                            <v-list-tile-avatar>
                                <img :src="avatarUrl(item.user)"/>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <p><b>{{item.user.username}}</b> {{renderText(item)}} <a v-if="item.text" :href="item.link">{{item.text}}</a></p>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-tabs-content>
            </v-tabs-items>
        </v-tabs>
    </v-flex>
</template>

<script>
    import moment from 'moment';
    import avatarMixin from '../../mixins/avatarMixin';
    export default {
        props: ['threads'],
        mixins: [avatarMixin],
        data(){
            return {
                active: null,
                notifs: [],
                unread: 0
            }
        },
        created() {
            this.getNotificationList();
            this.unreadCount();
            if(window.location.href.match('#notification')){
                this.active = `notification`;
            }
        },
        beforeDestroy(){
            this.active = null;
        },
        methods: {
            unreadCount(){
                this.$http.get('/notification/unread/count').then(resourse =>{
                    if (resourse && resourse.data){
                        this.unread = resourse.data[0]
                    }
                });
            },
            goToItem(item){
                this.$http.post(`/notification/${item.id}/read`).then(response => {
                    window.location.href = item.link;
                });                
            },
            renderText(item){
                switch (item.label) {
                    case 'liked':
                        return `a liké`;
                    case 'joined':
                        return `s'est inscrit à votre événement`;
                    case 'unjoined':
                        return `s'est désinscrit à votre événement`;
                    case 'comment-event':
                        return `a commenté votre événement`;
                    case 'comment':
                        return `a commenté`;
                    case 'request':
                        return `souhaite vous ajouter comme ami répondez à sa demande`;
                    case 'positive':
                    case 'negative':
                        return `a accepté votre demande d’invitation`;
                }
            },
            getNotificationList(){
                this.$http.get('/notification/list').then(response => {
                    if (response && response.data) {
                        this.notifs = response.data
                    }
                });
            },
            getParticipantsName(thread) {
                const partisipantNames = [];
                thread.participants.forEach((participant) => {
                    if (Number(participant.id) !== Number(thread.current_user)) {
                        partisipantNames.push(participant.username);
                    }
                });

                return partisipantNames.join(', ');
            },
            getAvatarUrl(thread) {
                let user = null;
                thread.participants.forEach((participant) => {
                    if (Number(participant.id) !== Number(thread.current_user)) {
                        user = participant;
                    }
                });
                if (user) {
                    return this.avatarUrl(user);
                } else {
                    return this.avatarUrl(thread.participants[0]);
                }
            },
            redirectToChat(id) {
                window.location.href = '/messages/' + id;
            },
            renderDate(date) {
                return moment(date).locale('fr').format('llll');
            },
            lastMessage(text) {
                if (text && this.$mq.tablet) {
                    return text.substr(0, 15) + '...';
                }
                if (text) {
                    return text.substr(0, 80) + '...';
                }
            }
        },
        computed: {
            participants() {
                const participants = {};
                this.threads.forEach((thread) => {
                    thread.participants.forEach((participant) => {
                        participants[participant.id] = {...participant};
                    });
                });

                return participants;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';
    .messages-threads {
        background-color: $white;
        margin-top: 20px;
        border-radius: 5px 5px 0 0;
        .list {
            li {
                border-bottom: 1px solid #e4e5e9;
                padding: 15px;
            }
            li:last-child {
                border: none;
            }
            li:hover, /deep/ a.list__tile:hover {
                background-color: #e4e5e9;
            }
            li.subheader {
                padding-top: 25px;
                padding-bottom: 25px;
                padding-left: 30px;
                &:hover {
                    background: none;
                }
            }
            .avatar img {
                width: 55px;
                height: 55px;
            }
            .list__tile__content {
                margin-left: 15px;
            }
            .list__tile__title {
                color: $secondary;
                font-size: 16px;
            }
            .list__tile__sub-title {
                color: #b6b8c1;
                font-size: 12px;
            }
            /deep/ .list__tile--avatar{
                height: auto;
            }
        }
        .date {
            font-size: 12px;
            color: #b6b8c1;
        }
        .unread{
            background-color: #eff0f5;
        }
        /deep/ .chip__content{
            color: $white;
            background-color: $error;
            height: 25px;
            min-width: 25px;
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    @media screen and (max-width: 600px) {
            /deep/ .tabs__wrapper {
                margin: 0px;
            }

        /deep/ .tabs:not(.tabs--centered):not(.tabs--grow):not(.tabs--mobile) .tabs__wrapper--scrollable{
            margin: 0px;
        }
    }
</style>