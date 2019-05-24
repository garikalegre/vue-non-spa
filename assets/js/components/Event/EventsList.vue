<template>
    <v-layout row wrap>
        <v-flex xs12 events-list-box v-if="eventsList && eventsList.length">
            <div class="my-events__list">
                <v-container>
                    <v-layout row wrap justify-center>
                        <v-flex v-for="item in eventsList" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                            <event-card
                                :joinedIds="joinedIds"
                                :eventItem="item"
                                :buttonTxt="`Détails`"
                                :deleteHandler="deleteHandler"
                            >
                            </event-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
        <v-flex xs12 events-list-box v-else-if="!loading">
            <div class="my-events__list my-events__list_empty">
                <v-container empty-container>
                    <v-layout row wrap justify-center>
                        <v-flex d-flex xs12 sm8 md6>
                            <no-result
                                :imagePath="`/images/no_results.svg`"
                                :sizeImg="`260px`"
                                :text="`Pas de résultats? A vous de jouer!`"
                                :btnText="`Je crée mon événement`"
                                :customClickHandler="createEventRedirect">
                            </no-result>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>

        <preloader
            :size="70"
            :width="7"
            v-else/>
        <v-snackbar
            :timeout="6000"
            :color="`red accent-4`"
            v-model="snackbar"
        >
            {{ text }}
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                sports: [],
                eventsList: [],
                params: {},
                loading: true,
                joinedIds: [],
                snackbar: false,
                text: 'Votre événement a bien été annulé'
            }
        },
        created() {
            this.getSports();
            this.findEvents();
            this.getJoinedEventsIds();
        },
        methods: {
            getSports() {
                this.$http.get('/sport/list').then(response => {
                    if (response && response.data) {
                        response.data.forEach(item => {
                            this.sports.push({
                                text: item.name,
                                value: item.id
                            });
                        });
                    }
                });
            },
            findEvents() {
                this.eventsList = [];
                this.loading = true;
                this.$http.get('/events/my-list').then(response => {
                    if (response && response.data) {
                        response.data.forEach(item => {
                            this.eventsList.push(item);
                        });
                    }
                    this.loading = false;
                });
            },
            getParams(params) {
                this.params = params;
                this.findEvents()
            },
            getJoinedEventsIds() {
                this.$http.get('/events/joined').then(response => {
                    this.joinedIds = response.body;
                });
            },
            createEventRedirect() {
                window.location.href = '/event/create';
            },
            deleteHandler(slug) {
                this.dialog = false;
                this.$http.delete(`/event/${slug}/delete`).then(response => {
                    if (response && response.data) {
                        this.snackbar = true;
                        this.findEvents();
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .my-events__list {
        margin-top: 10px;
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
        .my-events__list_empty {
            margin-top: 26px;
        }
        .container {
            max-width: 380px;
            padding: 0;
        }
    }

    @media only screen and (min-width: 350px) and (max-width: 399px) {
        .my-events__list_empty {
            margin-top: 26px;
        }
        .container {
            max-width: 380px;
            padding: 0;
        }
        .empty-container {
            max-width: 340px;
        }
    }

    @media only screen and (max-width: 349px) {
        .my-events__list_empty {
            margin-top: 26px;
        }
        .container {
            max-width: 300px;
            padding: 0;
        }
    }

</style>