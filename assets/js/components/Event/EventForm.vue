<template>
    <v-card class="main-page-card">
        <v-form class="event-form" v-model="valid" ref="eventform" lazy-validation>
            <v-subheader v-text="'CREER VOTRE EVENEMENT'"/>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>event</v-icon>
                </v-flex>
                <v-flex xs11>
                    <v-text-field
                            label="Nom de l'événement"
                            v-model="eventName"
                            :rules="eventNameRules"
                            required
                            @keyup.enter="submitEvent()"
                    />
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>location_on</v-icon>
                </v-flex>
                <v-flex xs11>
                    <vuetify-google-autocomplete
                            ref="address"
                            id="map"
                            class="form-control location"
                            label="Lieu"
                            @keyup.enter="submitEvent()"
                            :placeholder="location ? location : ``"
                            v-on:placechanged="getAddressData"
                            :types="searchType"
                            required
                            v-model="location"
                            :value="location"
                            :validate-on-blur="true"
                            :rules="locationRules"
                            @blur="$refs.eventform.validate()"
                            :country="countries"
                            :google-api-key="gApiKey"
                    >
                    </vuetify-google-autocomplete>
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>directions_run</v-icon>
                </v-flex>
                <v-flex xs11>
                    <v-select
                            :items="sports"
                            v-model="sport"
                            label="Sport"
                            :rules="sportRules"
                            autocomplete
                            chips
                            required
                            @keyup.enter="submitEvent()"
                    />
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>repeat</v-icon>
                </v-flex>
                <v-select
                        label="Est ce que cet événement se répète?"
                        :items="periodicityItems"
                        v-model="periodicity"
                />
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>date_range</v-icon>
                </v-flex>
                <v-flex xs11 md5>
                    <v-dialog
                            persistent
                            v-model="startDateModal"
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                label="Date de début"
                                v-model="startDatef"
                                :rules="startDateRules"
                                readonly
                                required
                                @keyup.enter="submitEvent()"
                        />
                        <v-date-picker
                                :allowed-dates="allowDates"
                                v-model="startDate"
                                color="green lighten-1"
                                header-color="green"
                                locale="fr"
                                scrollable
                                actions>
                            <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="cancel">Annuler</v-btn>
                                    <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                            </template>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
                <v-flex xs1 text-xs-center>
                    <v-icon>access_time</v-icon>
                </v-flex>
                <v-flex xs11 sm11 md5>
                    <div class="sportio-data-box">
                        <v-dialog
                                persistent
                                v-model="startTimeModal"
                                lazy
                                full-width
                                width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    label="Heure de début"
                                    v-model="startTimes"
                                    readonly
                                    required
                                    :rules="startTimeRules"
                                    @keyup.enter="submitEvent()"
                            />
                            <v-time-picker v-model="startTimes" format="24hr" color="green lighten-1" actions
                                           header-color="green">
                                <template slot-scope="{ save, cancel }">
                                    <v-card-actions>
                                        <v-btn flat color="primary" @click="cancel">Annuler</v-btn>
                                        <v-btn flat color="primary" @click="save">OK</v-btn>
                                    </v-card-actions>
                                </template>
                            </v-time-picker>
                        </v-dialog>
                    </div>
                </v-flex>
                <v-flex xs1 text-xs-center>
                    <v-icon>access_time</v-icon>
                </v-flex>
                <v-flex xs11 sm11 md5>
                    <div class="sportio-data-box">
                        <v-dialog
                                persistent
                                v-model="endTimeModal"
                                lazy
                                full-width
                                width="290px"
                        >
                            <v-text-field
                                    slot="activator"
                                    label="Heure de fin"
                                    v-model="endTime"
                                    readonly
                                    @keyup.enter="submitEvent()"
                            />
                            <v-time-picker v-model="endTime" format="24hr" color="green lighten-1" actions
                                           header-color="green">
                                <template slot-scope="{ save, cancel }">
                                    <v-card-actions>
                                        <v-btn flat color="primary" @click="cancel">Annuler</v-btn>
                                        <v-btn flat color="primary" @click="save">Ok</v-btn>
                                    </v-card-actions>
                                </template>
                            </v-time-picker>
                        </v-dialog>
                    </div>
                </v-flex>
                <v-flex xs1 text-xs-center v-if="periodicity > 1">
                    <v-icon>date_range</v-icon>
                </v-flex>
                <v-flex xs11 md5 v-if="periodicity > 1">
                    <v-dialog
                            persistent
                            v-model="endDateModal"
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                label="Date de fin"
                                v-model="endDatef"
                                :rules="endDateRules"
                                readonly
                                required
                                @keyup.enter="submitEvent()"
                        />
                        <v-date-picker
                                :allowed-dates="allowDates"
                                v-model="endDate"
                                color="green lighten-1"
                                header-color="green"
                                locale="fr"
                                scrollable
                                actions>
                            <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="cancel">Annuler</v-btn>
                                    <v-btn flat color="primary" @click="save">OK</v-btn>
                                </v-card-actions>
                            </template>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
            <v-layout row wrap upload-image-box>
                <v-flex xs1 sm1 text-xs-center>
                    <v-icon>insert_photo</v-icon>
                </v-flex>
                <v-flex xs2 sm2><label>Photo</label></v-flex>
                <v-flex xs9 sm8>
                    <div v-if="image">
                        <img :src="image"/>
                        <button type="button" @click="removeImage()">Supprimer</button>
                    </div>
                    <div v-else>
                        <input
                                type="file"
                                class="event-image-file"
                                @change="onFileChange($event)"
                        />
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>people</v-icon>
                </v-flex>
                <v-select
                        label="Nombre de sportifs recherchés"
                        :items="lookingForItems"
                        v-model="lookingFor"
                />
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>description</v-icon>
                </v-flex>
                <v-text-field
                        textarea
                        :counter="2000"
                        label="Description"
                        v-model="description"
                        multi-line
                />
            </v-layout>
            <v-btn
                    outline
                    @click="submitEvent()"
                    class="button_submit"
                    :disabled="!valid || loading"
                    :loading="loading"
            >{{textBtn}}</v-btn>
        </v-form>
    </v-card>
</template>

<script>
    import moment from 'moment';
    import valid from '../../mixins/eventValidationRules';
    import gAutocompleteMixin from '../../mixins/googleAutocompleteMixin';
    export default {
        mixins: [valid, gAutocompleteMixin],
        props: ['event', 'textBtn', 'slug'],
        data() {
            return {
                searchType: 'geocode',
                eventName: null,
                sport: null,
                sports: [],
                startDate: null,
                startDatef: null,
                startTimes: null,
                endDate: null,
                endDatef: null,
                endTime: null,
                lookingFor: null,
                lookingForItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                description: null,
                startDateModal: false,
                startTimeModal: false,
                endDateModal: false,
                endTimeModal: false,
                file: null,
                image: '',
                allowDates: {
                    min: null,
                    max: null
                },
                periodicityItems: [],
                periodicity: 1,
                loading: false
            }
        },
        watch: {
            startDate() {
                if (this.startDate) {
                    this.startDatef = moment(this.startDate).format('DD/MM/YYYY');
                } else {
                    this.startDatef = null;
                }
            },
            endDate() {
                if (this.endDate) {
                    this.endDatef = moment(this.endDate).format('DD/MM/YYYY');
                } else {
                    this.endDatef = null;
                }
            }
        },
        methods: {
            getEvent() {
                this.$http.get(`/event/${this.slug}`, {params: {data: 'event'}}).then(response => {
                    if (response && response.data) {
                        const event = response.data;
                        this.eventName = event.name;
                        this.sport = event.sports;
                        this.startDate = moment(event.start.date).format('YYYY-MM-DD');
                        this.startTimes = moment(event.start.date).format('H:mm');
                        if (event.end && event.end.date) {
                            this.endDate = moment(event.end.date).format('YYYY-MM-DD');
                            this.endTime = moment(event.end.date).format('H:mm');
                        }
                        this.lookingFor = event.partnerAmount;
                        this.description = event.description.replace(/(<br \/>)/g,'');
                        this.image = event.photoPath;
                        this.periodicity = event.periodicity;
                        this.location = event.location;
                        this.address = {
                            locality: event.location,
                            country: '',
                            latitude: event.latitude,
                            longitude: event.longitude,
                        }
                    }
                });
            },
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
            getPeriodicity() {
                this.$http.get('/periodicity/list').then(response => {
                    if (response && response.data) {
                        response.data.forEach(item => {
                            this.periodicityItems.push({
                                text: item.name,
                                value: item.id
                            });
                        });
                    }
                });
            },
            submitEvent() {
                if (this.$refs.eventform.validate()) {
                    this.loading = true;
                    this.$emit('actionclick', this.getFormData());
                }
            },
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.file = files[0];
                this.createImage(files[0]);
            },
            createImage(file) {
                let image = new Image();
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage() {
                this.image = '';
            },
            getFormData() {
                const formData = new FormData();
                formData.append('event[name]', this.eventName);
                formData.append('event[sport]', this.sport);
                formData.append('event[periodicity]', this.periodicity);
                formData.append('event[start]', `${this.startDate} ${this.startTimes}`);
                formData.append('event[location]', `${this.location}`);
                formData.append('event[latitude]', `${this.address.latitude}`);
                formData.append('event[longitude]', `${this.address.longitude}`);
                if (this.file && this.file.name) {
                    formData.append('event[file]', this.file, this.file.name);
                }
                if (this.image.length > 0) {
                    formData.append('event[photoPath]', this.image);
                }
                if (this.lookingFor) {
                    formData.append('event[looking]', this.lookingFor);
                }
                if (!this.endDate && this.endTime){
                    formData.append('event[end]', `${this.startDate} ${this.endTime}`);
                }
                if (this.endDate) {
                    if (!this.endTime){
                        this.endTime = '00:00';
                    }
                    formData.append('event[end]', `${this.endDate} ${this.endTime}`);
                }
                if (this.description) {
                    formData.append('event[description]', this.description);
                }
                return formData;
            }
        },
        created() {
            this.getSports();
            this.getPeriodicity();
            if (this.slug.length > 0) {
                this.getEvent();
            }
        },
        mounted() {
            const d = new Date();
            this.allowDates.min = d.toISOString().substr(0, 10);
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .event-form {
        background-color: $white;
        padding: 15px;
        /deep/ .input-group__error {
            color: $error;
        }
        .datetime-box {
            display: flex;
            justify-content: space-between;
        }
        .datetimepiker-box {
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
        }
        /deep/ .menu__content.menu__content--select {
            position: static;
        }
        .upload-image-box {
            label {
                font-size: 16px;
                line-height: 30px;
            }
            img {
                max-width: 110px;
                display: block;
            }
        }
        /deep/ .input-group__input textarea {
            box-shadow: none !important;
            -webkit-box-shadow: none !important;
        }
        .sportio-data-box {
            display: flex;
            align-items: center;
        }
    }

    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>