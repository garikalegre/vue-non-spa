<template>
    <v-flex xs12 new-dialog-box>
        <v-card class="main-page-card">
            <v-container fluid class="pa-0 mt-2">
                <v-layout wrap>
                    <v-flex xs1>
                        <v-subheader>À</v-subheader>
                    </v-flex>
                    <v-flex xs11>
                        <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false"
                                     :clear-on-select="false" :hide-selected="true" :preserve-search="true"
                                     placeholder="Sélectionnez un ami" label="username" track-by="username">
                            <template slot="tag" slot-scope="props">
                                <v-chip>
                                    <v-avatar>
                                        <img :src="props.option.avatar || `/images/main_no_avatar.svg`"/>
                                    </v-avatar>
                                    <span>{{ props.option.username}}</span>
                                    <span class="custom__remove" @click="props.remove(props.option)">❌</span>
                                </v-chip>
                            </template>
                        </multiselect>
                    </v-flex>
                    <v-flex xs12>
                        <v-divider></v-divider>
                        <v-text-field
                                label="Message"
                                v-model="message"
                                textarea
                        />
                        <div class="text-xs-right">
                            <v-btn outline color="indigo" class="msg_send" @click="storeChat()" :disabled="!disabled">ENVOYER</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>

    export default {
        created() {
            this.$http.get('/friends/list').then(response => {
                this.options = response.body;
                this.defaultValue();
            });
        },
        computed: {
            userId() {
                const locArray = window.location.href.split('/');

                return locArray.length ? Number(locArray[locArray.length - 1]) : 0;
            },
            disabled() {
                return Boolean(this.value && this.value.length > 0 && this.message);
            }
        },
        data() {
            return {
                options: [],
                message: '',
                subject: 'Subject',
                value: []
            }
        },
        methods: {
            storeChat(){
                const selectedFriendsIds = [];
                this.value.forEach((item)=>{
                    selectedFriendsIds.push(item.id);
                });
                const form_data = new FormData;
                form_data.append('message', this.message);
                form_data.append('subject', this.subject);
                for ( let item of selectedFriendsIds ) {
                  form_data.append('participants[]', item);
                }
                let usID = this.userId;
                if (isNaN(this.userId)){
                    usID = this.value[0].id;
                }
                this.$http.post(`/messages/create/${usID}`, form_data).then(response => {
                    if (response.data && response.data.threadId && response.data.link) {
                        window.location.replace(response.data.link);
                    }
                });
            },
            defaultValue(){
                if (this.userId) {
                    this.options.forEach((option) => {
                        if (Number(option.id) === Number(this.userId)){
                            this.value.push(option);
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~VariablesStyles';
    .new-dialog-box{
        margin-top: 50px;
    }
    .main-page-card{
        padding-top: 5px;
    }
    .chip {
        border-radius: 17.5px;
        background-color: $bg;
      /deep/ .chip__content {
            padding: 0 3px 0 12px;
            .custom__remove {
                color: $secondary;
                border-radius: 50%;
                padding: 0 5px;
                margin-left: 5px;
            }
        }
    }
    .multiselect{
        float: right;
        width: 97%;
        margin-right: 10px;
    }
</style>