<template>
    <div>
        <div class="comments-list">
            <v-list three-line>
                <template v-for="item in comments">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="item.user.avatar || `/images/main_no_avatar.svg`"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title class="comment-date" v-html="renderDate(item.created.date)"/>
                            <v-list-tile-sub-title v-html="item.comment" class="comment-text"/>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </div>
        <div class="comment-form">
            <v-layout row wrap>
                <v-flex xs12 sm9 send-form>
                    <v-text-field
                            v-model="commentText"
                            counter
                            textarea
                            @keyup.enter="storeComment()"
                    />
                </v-flex>
                <v-flex xs2 send-button>
                    <v-btn outline @click="storeComment()">ENVOYER</v-btn>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: ['slug'],
        data() {
            return {
                comments: [],
                commentText: ''
            }
        },
        methods: {
            getComments() {
                this.$http.get(`/comment/${this.slug}`).then(response => {
                    if (response && response.data) {
                        this.comments = response.data
                    }
                });
            },
            storeComment() {
                if (this.commentText) {
                    const fd = new FormData;
                    fd.append('text', this.commentText);
                    this.$http.post(`/comment/${this.slug}`, fd).then(response =>{
                        if (response && response.data) {
                            this.getComments();
                        }
                    });
                    this.commentText = '';
                }
            },
            renderDate(date) {
                return moment(date).locale('fr').format('llll');
            }
        },
        created() {
            this.getComments();
        }
    }
</script>

<style lang="scss" scoped>
    .comment-date{
        font-size: 12px;
    }
    .comment-text{
        display: flex;
    }
</style>