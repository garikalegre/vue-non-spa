<template>
    <div>
        <v-card class="main-page-card user-main-info-box">
            <v-layout row wrap>
                <v-flex go-back x12 v-if="false">
                    <a @click="goBack()">
                        <v-icon>arrow_back</v-icon>
                        Retour à la liste</a>
                </v-flex>
                <v-flex x12 avatar-box>
                    <v-avatar size="150px">
                        <img :src="avatarUrl(user)"/>
                    </v-avatar>
                    <h2>{{user.firstname || user.lastname || user.username}}</h2>
                    <v-btn v-if="user.is_current" color="indigo" round dark @click="goEditPage()">
                        <v-icon>edit</v-icon>
                         Editer
                    </v-btn>
                    <message-btn v-else-if="user.is_friend" :sendMessageHandle="sendMessageHandle"/>
                    <invite-btn v-else-if="isRequested"/>
                    <v-chip class="user-chip" v-else @click="addHandle()">
                        Ajouter en ami
                        <v-icon right>add</v-icon>
                    </v-chip>
                </v-flex>
            </v-layout>
        </v-card>
        <v-card class="user-second-info-box">
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-layout row wrap info-box>
                        <v-flex xs6 info-description v-if="user.sex">Sexe</v-flex>
                        <v-flex xs6 v-if="user.sex">{{ $t(`profile.${user.sex}`)}}</v-flex>
                        <v-flex xs6 m-t-30 info-description v-if="user.age">Age</v-flex>
                        <v-flex xs6 m-t-30 v-if="user.age">{{user.age}} ans</v-flex>
                        <v-flex xs6 m-t-30 info-description>Ville</v-flex>
                        <v-flex xs6 m-t-30>{{user.location}}</v-flex>
                        <v-flex xs6 m-t-30 info-description v-if="user.level">Type de profil</v-flex>
                        <v-flex xs6 m-t-30 v-if="user.level">{{ $t(`profile.${user.level}`) }}</v-flex>
                        <v-flex xs6 m-t-30 info-description>Sports</v-flex>
                        <v-flex xs6 m-t-30><v-chip v-for="item in user.sports_full" :key="item.id">{{item.name}}</v-chip></v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 md6 info-description>
                    <h6>À PROPOS DE {{user.firstname || user.username}}</h6>
                        <p v-html="user.description"></p>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
    import avatarMixin from '../../mixins/avatarMixin';
    export default {
        mixins: [avatarMixin],
        props: ['user'],
        data() {
            return {
                isRequested: null
            }
        },
        computed: {
            currentUser() {
                if (localStorage.getItem('userDetails')) {
                    const localUser = JSON.parse(localStorage.getItem('userDetails'));

                    return localUser;
                }
            }
        },
        created(){
            this.isRequested = this.user.is_requested;
        },
        methods: {
            sendMessageHandle(){
                window.location.href = '/messages/create/' + this.user.id;
            },
            addHandle(){
                this.isRequested = true;
                this.$http.post(`/friends/request/friend/${this.user.id}`);
            },
            goEditPage(){
                window.location.href = '/user/edit';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .user-main-info-box {
        padding: 30px;
        .go-back{
            color: $primary;
            width: 100%;
        }
        .avatar-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            h2 {
                color: $secondary;
            }
            .user-chip{
                cursor: pointer;
              /deep/  .chip__content {
                    color: $white;
                    background-color: $primary;
                }
            }
            button{
                color: $white;
                font-size: 11px;
                cursor: pointer;
                i {
                    font-size: 11px;
                }
            }
        }
    }

    .user-second-info-box{
        margin-top:5px;
        padding: 30px;
        background-color: $white;
        .info-description{
            padding: 0 25px;
            color: $gray-text;
            h6 {
                text-transform: uppercase;
            }
        }
        .info-box{
            padding-left: 20px;
        }
    }
</style>