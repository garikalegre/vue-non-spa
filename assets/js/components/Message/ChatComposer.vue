<template>
    <v-container fluid >
        <v-layout row wrap>
            <v-flex xs12 sm9 send-form>
                <v-text-field
                        v-model="messageText"
                        textarea
                        @keyup.enter="sendMessage"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 send-button>
                <v-btn outline class="msg_send" @click="sendMessage">ENVOYER</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props:['currentUserId'],
        data() {
            return {
                messageText: ''
            }
        },
        methods: {
            sendMessage() {
                const date = new Date();
                this.$emit('store',{
                    body: this.messageText,
                    sender: this.currentUserId,
                    date: date.toString()
                });
                this.messageText = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~VariablesStyles';
    .send-form /deep/ .input-group__input{
        margin-top: 15px;
        background-color: $white;
    }
    .send-button {
        margin-top: 15px;
    }
</style>