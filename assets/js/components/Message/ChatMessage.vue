<template>
    <div>
        <div class="date">
            <span class="text-xs-center">{{parseDate(message.date.date) }}</span>
        </div>
        <div :class="['message-box', {own: selfMessage}]">
            <v-flex xs1 v-if="!selfMessage">
                <a :href="`/profile/${sortedParticipants[message.sender].username}/${sortedParticipants[message.sender].id}`">
                    <v-avatar>
                        <img :src="sortedParticipants[message.sender].avatar || `/images/main_no_avatar.svg`"/>
                    </v-avatar>
                </a>
            </v-flex>
            <div :class="['message',  {self: selfMessage}]">
                {{ message.body }}
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: ['message', 'sortedParticipants', 'currentUserId'],
        computed: {
            selfMessage() {
                return this.currentUserId === this.message.sender;
            }
        },
        methods: {
            parseDate(date) {
                return moment(date).locale('fr').format('llll');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .date {
        display: flex;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.2px;
        color: $grayly;
        margin: 20px;
    }

    .message-box {
        display: flex;
        flex-direction: row;

        .message {
            background-color: $light-gray;
            display: flex;
            font-size: 14px;
            text-align: left;
            max-width: 40%;
            border-radius: 21px;
            padding: 10px 20px;
        }
    }
    .own{
        flex-direction: row-reverse;
        .message {
            background-color: $primary;
            color: $white;
        }
    }
</style>