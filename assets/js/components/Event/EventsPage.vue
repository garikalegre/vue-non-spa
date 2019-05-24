<template>
    <v-layout row wrap>
        <v-flex xs12>
            <events-filter :sports="sports" v-on:filtering="getParams"/>
        </v-flex>
        <v-flex xs12 v-if="exactList && exactList.length">
            <div class="search-events__list">
                <v-container>
                    <v-layout row wrap justify-center>
                        <v-flex v-for="item in exactList" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                            <event-card
                                :joinedIds="joinedIds"
                                :eventItem="item"
                                :buttonTxt="`+ d'infos`"
                                :deleteHandler="deleteHandler"
                                :isauth="isauth"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
        <v-flex xs12 mt-3 v-if="!exactList.length && Object.keys(params).length > 0">
            <p class="text-xs-center mt-1 mb-1 subheading">Aucun événement ne correspond à votre recherche.</p>
            <p class="text-xs-center mb-0 subheading">Veuillez essayer d'autre lieux ou d'autres sports.</p>
        </v-flex>
        <v-flex xs12 mt-5 v-if="!loading && Object.keys(params).length > 0">                
            <h3 class="text-xs-center search-events__tips_rest">Ces événements pourraient aussi vous intéresser.</h3>
        </v-flex>
        <v-flex xs12 v-if="otherList && otherList.length">
            <div class="search-events__list">
                <v-container>
                    <v-layout row wrap justify-center>
                        <v-flex v-for="item in otherList" :key="item.id" d-flex xs12 sm6 md4 lg3 xl2>
                            <event-card
                                :joinedIds="joinedIds"
                                :eventItem="item"
                                :buttonTxt="`+ d'infos`"
                                :deleteHandler="deleteHandler"
                                :isauth="isauth"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
        <v-flex xs12 v-if="!loading && !exactList.length && !otherList.length">
            <div class="search-events__list">
                <v-container>
                    <v-layout row wrap justify-center>
                        <no-result
                            :imagePath="`/images/no_results.svg`"
                            :sizeImg="`260px`"
                            :customClickHandler="createEventRedirect"
                            :text="`Pas de résultats? A vous de jouer!`"
                            :btnText="`Je crée mon événement`">
                        </no-result>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>

        <preloader
            v-if="loading"
            :size="70"
            :width="7"/>
        
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
        props:['isauth'],
        data(){
            return {
                sports:[],
                exactList:[],
                otherList:[],
                eventsList:[],
                params: {},
                loading: true,
                joinedIds: [],
                snackbar: false,
                text: 'Votre événement a bien été annulé'
            }
        },
        created(){
            this.getSports();
            this.findEvents();
            if (this.isauth) {
                this.getJoinedEventsIds();
            }
        },
        methods:{
            getSports() {
                this.$http.get('/sport/list').then(response => {
                    if (response && response.data && Array.isArray(response.data)) {
                        response.data.forEach(item => {
                            this.sports.push({
                                name: item.name,
                                id: item.id
                            });
                        });
                    }
                });
            },
            findEvents(){
                this.loading = true;
                this.$http.get('/events/find',{params: this.params}).then(response => {                    
                    if (response && response.data) {
                        this.exactList = response.data.exact;
                    }
                    if(response && response.data && Array.isArray(response.data.other)){
                        this.otherList = response.data.other.sort((a,b) => {
                            let dateA = new Date(a.start.date);
                            let dateB = new Date(b.start.date);
                            return dateA - dateB;
                        });
                    }
                    this.loading = false;
                });
            },
            getParams(params) {
                this.params = params;
                this.findEvents()
            },
            getJoinedEventsIds(){
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

    .search-events__list {
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