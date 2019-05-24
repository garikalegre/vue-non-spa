<template>
    <v-card class="chat-card">
        <div>
            <chat-log
                    :messages="messages"
                    :sortedParticipants="sortedParticipants"
                    :currentUserId="currentUserId">
            </chat-log>
            <chat-composer
                    :currentUserId="currentUserId"
                    v-on:store="addMessage">
            </chat-composer>
        </div>
    </v-card>
</template>

<script>
    export default {

        data() {
            return {
                messages: [],
                currentUserId: null,
                participants: []
            }
        },
        created() {
            this.getChat();
        },
        computed: {
            threadId() {
                const locArray = window.location.href.split('/');

                return locArray.length ? Number(locArray[locArray.length - 1]) : 0;
            },
            sortedParticipants() {
                let sortedParticipants = {};
                this.participants.forEach((participant) => {
                    sortedParticipants = {
                        ...sortedParticipants,
                        [participant.id]: participant
                    }
                });

                return sortedParticipants;
            }
        },
        methods: {
            addMessage(message) {
                const form_data = new FormData;
                form_data.append('message', message.body);
                this.messages.push(message);
                this.$http.post(`/messages/thread/${this.threadId}`, form_data);
            },
            getChat() {
                if (this.threadId) {
                    this.$http.get(`/messages/thread/${this.threadId}`).then(response => {
                        this.messages = response.data.messages;
                        this.currentUserId = response.data.current_user;
                        this.participants = response.data.participants;
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .chat-card{
        margin-top: 50px;
        background-color: $white;
        padding: 30px;
    }
</style>