<template>
    <v-card class="main-page-card">
        <h1 class="text-xs-center">MON PROFIL</h1>
        <h6 class="text-xs-center">Complétez-vite votre profil pour que la communauté vous connaisse.</h6>
        <v-form v-model="valid" ref="userform" lazy-validation>

            <v-layout row wrap user-edit-avatar-box>
                <div class="change-avatar-box">
                    <v-avatar :size="`100px`" v-if="image">
                        <img :src="image">
                    </v-avatar>
                    <v-avatar :size="`100px`" v-else>
                        <img :src="avatar || `/images/no_user.svg`">
                    </v-avatar>
                    <label for="avatarFile" class="btn btn--round btn--outline indigo--text">
                        <v-icon left dark>cloud_upload</v-icon>
                        Importer une photo
                        <input type="file" id="avatarFile" style="display:none" @change="onFileChange($event)">
                    </label>
                    <p v-if="false && !avatar && !image" class="photo-error">Merci de charger votre photo de profil.</p>
                </div>
                <div class="webcam-box" v-if="false">
                    <webcam ref="webcam"></webcam>
                </div>
            </v-layout>


            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>people_outline</v-icon>
                </v-flex>
                <v-flex xs11>
                    <v-text-field
                            name="username"
                            label="Pseudo"
                            v-model="username"
                            :rules="userNameRules"
                            required
                            @keyup.enter="updateUserProfile()"
                    />
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>directions_run</v-icon>
                </v-flex>
                <v-flex xs11>
                        <multiselect v-model="sport" :options="sports" :multiple="true" :close-on-select="true"
                                     :clear-on-select="false" :hide-selected="true" :preserve-search="true"
                                     placeholder="sélectionnez des sports" label="name" track-by="name"
                                     :selectLabel="``">
                            <template slot="tag" slot-scope="props">
                                <v-chip>                                 
                                    <span>{{ props.option.name}}</span>
                                    <span class="custom__remove" @click="props.remove(props.option)"> ❌</span>
                                </v-chip>
                            </template>
                            <span slot="noResult">{{$t("profile.noResult")}}</span>
                        </multiselect>
                        <div v-if="!sport.length" class="text-xs-left sport-error">Le sport est requis</div>                 
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>date_range</v-icon>
                </v-flex>
                <v-flex xs11>
                    <v-dialog
                            persistent
                            v-model="bDateModal"
                            lazy
                            full-width
                            width="290px"
                    >
                        <v-text-field
                                slot="activator"
                                label="Date de naissance"
                                name="bDate"
                                v-model="bDatef"
                                readonly
                                @keyup.enter="updateUserProfile()"
                        />
                        <v-date-picker
                                :allowed-dates="allowDates"
                                v-model="bDate"
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
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>wc</v-icon>
                </v-flex>
                <v-flex xs11>
                    <v-select
                            :items="sexes"
                            v-model="sex"
                            label="Sexe"
                            chips
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
                            label="Ville"
                            required
                            v-on:placechanged="getAddressData"
                            :types="searchType"
                            :placeholder="location ? location : ``"
                            v-model="location"
                            :value="location"
                            :country="countries"
                            @keyup.enter="updateUserProfile()"
                            @blur="$refs.userform.validate()"
                            :validate-on-blur="true"
                            :rules="locationRules"
                            :google-api-key="gApiKey"
                    >
                    </vuetify-google-autocomplete>
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>accessibility</v-icon>
                </v-flex>
                <v-flex xs11>
                    <v-select
                            :items="levels"
                            v-model="level"
                            label="Type de profil"
                            chips
                    />
                </v-flex>
            </v-layout>
            <v-layout row wrap sportio-field-box>
                <v-flex xs1 text-xs-center>
                    <v-icon>description</v-icon>
                </v-flex>
                <v-text-field
                        textarea
                        label="Racontez-nous quel type de sportif vous êtes et ce que vous cherchez sur Sportialize !"
                        v-model="description"
                        :error-messages="descriptionErrors"                        
                        name="description"
                />
            </v-layout>
            <v-btn round
                   @click="updateUserProfile()"
                   color="indigo"
                   :loading="loading"
                   class="white--text"
                   :disabled="!valid"
                   large
            >
                Valider mon profil
            </v-btn>
        </v-form>
        <v-snackbar
                :timeout="6000"
                :color="`green accent-4`"
                v-model="snackbar"
        >
            {{ text }}
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
    import moment from 'moment';
    import gAutocompleteMixin from '../../mixins/googleAutocompleteMixin';
    export default {
        props: ['user'],
        mixins: [gAutocompleteMixin],
        data() {
            return {
                id: null,
                searchType: '(cities)',
                sport: null,
                sports: [],
                sexes: [{
                    text: 'Homme',
                    value: 'Male'
                }, {
                    text: 'Femme',
                    value: 'Female'
                }],
                sex: 'Male',
                bDate: null,
                bDatef: null,
                bDateModal: false,
                username: null,
                description: null,
                imgWeb: null,
                avatar: null,
                snackbar: false,
                text: 'Votre profil a été mis à jour.',
                loading: false,
                level: 'amateur',
                levels: [{
                    text:"Sportif amateur",
                    value: "amateur"
                },{
                    text: "Sportif pro",
                    value: "professional"
                },{
                    text: "Coach",
                    value: "coach"
                },{
                    text: "Préparateur physique",
                    value: "fitness trainer"
                },{
                    text: "Nutritionniste",
                    value:"nutritionist"
                }],
                userInfoLoading: false,
                image: '',
                file: null,
                allowDates: {
                    min: null,
                    max: null
                },
                valid: true,
                userNameRules: [
                    (v) => !!v || 'Ce champs est requis',
                    (v) => !!v && v.length <= 25 || 'entre max 25 caractères.'
                ],
                sexRules: [
                    (v) => !!v || 'Ce champs est requis',
                ],
                locationRules: [
                    (v) => !!v || !!this.location || 'Ce champs est requis',
                ]
            }
        },
        mounted() {
            const d = new Date();
            this.allowDates.max = d.toISOString().substr(0, 10);
        },
        methods: {
            switchAvatarField() {
                this.collapse = !this.collapse;
            },
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.file = files[0];
                this.filename = this.file.name;
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
            photo() {
                this.imgWeb = this.$refs.webcam.capture();
            },
            getSports() {
                this.$http.get('/sport/list').then(response => {
                    if (response && response.data && response.data.length) {                        
                        response.data.forEach(item => {
                            this.sports.push({
                                name: item.name,
                                id: item.id
                            });
                        });
                    }
                });
            },
            getUser() {
                this.id = this.user.id;
                this.sport = this.user.sports_full;
                this.address = {
                    locality: this.user.location,
                    country: '',
                    latitude: this.user.lat,
                    longitude: this.user.long,
                };
                this.location = this.user.location;
                this.sex = this.user.sex ? this.user.sex : 'Male';
                this.username = this.user.username;
                this.description = this.user.description.replace(/(<br \/>)/g,'');
                this.bDate = this.user.bDate && this.user.bDate.date ? moment(this.user.bDate.date).format('YYYY-MM-DD') : null;
                this.bDatef = this.user.bDate && this.user.bDate.date ? moment(this.user.bDate.date).format('DD/MM/YYYY') : null;
                this.avatar = this.user.avatar;
                this.image = this.user.avatar;
                this.level = this.user.level ? this.user.level : 'amateur';
            },
            updateUserProfile() {
                if (this.$refs.userform.validate() && this.sport.length && !this.descriptionErrors.length) {
                    this.$http.post('/user/update', this.getFormData()).then(response => {
                        if (response && response.data) {
                            this.snackbar = true;
                            window.location.href = `/newsfeed`;
                        }
                    })
                }
            },
            getFormData() {
                const fd = new FormData;
                if (this.sport && this.sport.length) {
                    for (let item of this.sport) {
                        fd.append('sport[]', item.id);
                    }
                }
                if (this.username) {
                    fd.append('username', this.username);
                }
                if (this.sex) {
                    fd.append('gender', this.sex);
                }
                if (this.description) {
                    fd.append('description', this.description);
                }
                if (this.bDate) {
                    fd.append('birth_date', this.bDate);
                }
                if(this.level){
                    fd.append('level', this.level);
                }                                
                if (this.address && this.address.latitude && this.address.longitude && this.location) {
                    fd.append('latitude', `${this.address.latitude}`);
                    fd.append('longitude', `${this.address.longitude}`);
                    fd.append('geolocation', `${this.location}`);

                    if (this.address.latitude !== this.user.lat && this.address.longitude !== this.user.long) {
                        fd.append('relocated', 1);
                    }
                }
                if (this.file && this.file.name) {
                    fd.append('file', this.file, this.file.name);
                }

                return fd;
            }
        },
        created() {
            this.getSports();
            this.getUser();
        },
        watch: {
            bDate(){
                if (this.bDate) {
                    this.bDatef = moment(this.bDate).format('DD/MM/YYYY');
                }else{
                    this.bDatef = null;
                }
            }
        },
        computed: {
            descriptionErrors() {
                if((this.description && this.description.length > 0 && this.description.length < 25) || (this.description && this.description.length > 500)){
                    return ['Merci de remplir votre description, entre 25 et 500 caractères.'];
                }else{
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .photo-error {
        color: $error;
        font-size: 10px;
    }

    /deep/ .input-group__error {
        color: $error;
    }
    /deep/ .chip__content{
        z-index: 0;
    }
    /deep/ .multiselect__tags{
        border: none;
        border-bottom: 1px solid $grayly;
    }
    .sport-error{
        font-size: 12px; 
        color: $error
    }
    .user-edit-avatar-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 15px;
        .change-avatar-box {
            display: flex;
            align-items: center;
            flex-direction: column;
            label {
                display: table-footer-group;
                font-size: 12px !important;
                padding: 0 10px;
                height: 30px;
            }
        }
    }
    /deep/ .input-group.checkbox {
        display: flex;
        .input-group__input {
            max-width: 15%;
        }
        label{
            margin-left: 15px;
            margin-top: -14px;
        }
    }

    /deep/ button {
        width: max-content;
        align-self: center;
    }

    .main-page-card {
        padding: 15px;
    }

    /deep/ .menu__content.menu__content--select {
        position: static;
    }

    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
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
