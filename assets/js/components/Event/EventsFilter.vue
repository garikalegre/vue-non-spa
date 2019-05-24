<template>
    <div class="main-page-card events-filter mt-0 elevation-0">
        <v-layout row wrap justify-center>
            <v-form class="events-filter__form">
                <v-flex hidden-sm-and-down md1>
                    <div class="events-filter__form-label ml-2">Recherche</div>
                </v-flex>
                <v-flex xs12 sm5 md4 mt-3>
                    <div class="events-filter__sport">
                        <v-icon>search</v-icon>
                        <multiselect
                            v-model="sport"
                            :options="sports"
                            :multiple="true"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="true"
                            :preserve-search="true"
                            placeholder="Sélectionnez des sports"
                            label="name"
                            track-by="name"
                            :selectLabel="``">
                            <template slot="tag" slot-scope="props">
                                <v-chip>                                 
                                    <span>{{ props.option.name}}</span>
                                    <span class="custom__remove" @click="props.remove(props.option)"> ❌</span>
                                </v-chip>
                            </template>
                            <span slot="noResult">{{$t("profile.noResult")}}</span>
                        </multiselect>
                    </div>
                </v-flex>
                <v-flex xs12 sm5 md4 mt-3>
                    <div class="events-filter__location">
                        <v-icon>location_on</v-icon>
                        <vuetify-google-autocomplete
                            ref="address"
                            id="map"
                            class="form-control location"
                            label="Localité"
                            :placeholder="location ? location : ``"
                            v-modal="location"
                            v-on:placechanged="getAddressData"
                            :types="searchType"
                            :value="location"
                            :validate-on-blur="true"
                            :country="countries"
                            :google-api-key="gApiKey">
                        </vuetify-google-autocomplete>
                    </div>
                </v-flex>
                <v-flex xs12 sm2 md3 events-filter__button-box>
                    <v-btn
                        dark round depressed
                        color="blue accent-2"
                        @click="composeParams()"
                        class="events-filter__button white--text">
                            Rechercher
                    </v-btn>
                </v-flex>
            </v-form>
        </v-layout>
    </div>
</template>

<script>
    import moment from 'moment';
    import gAutocompleteMixin from '../../mixins/googleAutocompleteMixin';
    export default {
        mixins: [gAutocompleteMixin],
        props: ['sports'],
        data() {
            return {
                searchType: 'geocode',
                sport: null
            }
        },
        methods: {
            composeParams() {
                const params = {};
                if (this.address && this.address.latitude && this.address.longitude) {
                    params.latitude = this.address.latitude;
                    params.longitude = this.address.longitude;
                }
                if (this.sport) {
                    params.sports = this.sport.map((item)=>{return item.id});
                }
                this.$emit('filtering', params);
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .events-filter__form {
        display: flex;
        position: relative;
        max-width: 1200px;
        background-color: white;
        flex-flow: row wrap;
        flex-grow: 1;
        justify-content: space-around;
        align-items: flex-start;
    }

    .events-filter__form-label {
        font-size: 18px;
        color: $newscardtitle;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .events-filter__location {
        width: 95%;
        padding-left: 5%;
        display: flex;
        align-items: center;
        color: $newstitlenames;
        font-weight: 600;
        .icon {
            font-size: 32px;
            margin-bottom: 25px;
            margin-right: -30px;
        }
        /deep/ input {
            padding-left: 25px;
            font-size: 16px;
        }
        /deep/ label {
            margin-left: 30px;
            font-size: 16px!important;
        }
        /deep/ .input-group__input {
            border-bottom: none;
        }
        /deep/ .input-group__details {
            &:before {
                content: '';
                position: absolute;
                height: 1px;
                width: 100%;
                background-color: $gray-border;
                bottom: -1px;
            }
            &:after {
                content: '';
                position: absolute;
                top: 0;
                width: 100%;
                height: 2px;
                color: $error;
            }
        }
    }

    .events-filter__sport {
        display: flex;
        position: relative;
        align-items: center;
        padding-left: 5%;
        width: 90%;
        color: $newstitlenames;
        border-bottom: none;
        .icon {
            font-size: 32px;
        }
        /deep/ .chip {
            margin: 0;
            .chip__content {
                background-color: lightgrey;
            }
        }
        /deep/ .input-group {
            padding: 0;
            label {
                top: 5px !important;
            }
        }
        /deep/ .multiselect__tags {
            border: none;
            border-radius: 0;
            padding-top: 0;
            .multiselect__single,
            .multiselect__input {
                margin: 10px 0 0;
            }
            span,
            input {
                color: $newstitlenames;
                font-weight: 600;
                font-size: 16px;
            }
        }
        /deep/ .multiselect__select:before {
            display: none;
        }
        &:before {
            content: '';
            position: absolute;
            height: 1px;
            z-index: 2;
            width: 100%;
            background-color: $gray-border;
            bottom: -1px;
        }
    }

    .events-filter__button-box {
        align-self: center;
        @media screen and (max-width: 600px){
            margin-bottom: 15px;
        }
    }

    .events-filter__button {
        text-transform: none;
        max-height: 33px;
        width: 90%;
    }

</style>