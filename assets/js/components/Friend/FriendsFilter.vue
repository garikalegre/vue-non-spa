<template>
    <v-card class="main-page-card mt-0 elevation-0">
        <v-form class="filter-form" v-model="valid" ref="friendSearchForm" lazy-validation>
            <v-layout row wrap>
                <v-flex hidden-sm-and-down md1>
                    <div class="filter-label ml-2">Recherche</div>
                </v-flex>
                <v-flex xs12 sm5 md4 mt-3>
                    <div class="sport-filter-box">
                        <v-icon>search</v-icon>
                        <multiselect v-model="sport" :options="sports" :multiple="true" :close-on-select="true"
                                     :clear-on-select="false" :hide-selected="true" :preserve-search="true"
                                     placeholder="Sélectionnez des sports" label="name" track-by="name"
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
                    <div class="location-filter-box">
                        <v-icon>location_on</v-icon>
                        <vuetify-google-autocomplete
                                ref="address"
                                id="map"
                                class="form-control location"
                                label="Indiquez votre lieu"
                                v-on:placechanged="getAddressData"
                                :types="searchType"
                                :placeholder="location ? location : ``"
                                v-model="location"
                                :value="location"
                                :country="countries"
                                :google-api-key="gApiKey"
                        >
                        </vuetify-google-autocomplete>
                    </div>
                </v-flex>
                <v-flex xs12 sm2 md3 action-filter-box>
                    <v-btn
                        dark round depressed
                        color="blue accent-2"
                        @click="composeParams()"
                        class="search_btn white--text">
                            Rechercher
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-card>
</template>

<script>
    import gAutocompleteMixin from '../../mixins/googleAutocompleteMixin';
    export default {
        mixins: [gAutocompleteMixin],
        props: ['sports'],
        data() {
            return {
                searchType: '(cities)',
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
                this.$emit('ffiltering', params);

            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .main-page-card {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .search_btn {
        width: 90%;
        max-height: 33px;
        text-transform: none;
    }

    .title-filter-box {
        width: 100%;
        padding: 20px 5px 0 10px;
        background-color: $white;
    }

    /deep/ .input-group__details {
        color: $error;
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

    .filter-form {
        background-color: $white;
        max-width: 1200px;
        display: flex;
        flex-flow: row wrap;
        flex-grow: 1;
        justify-content: space-between;
        align-items: center;
        /deep/ .menu__content.menu__content--select {
            position: sticky;
        }
        /deep/ .chip__content {
            background-color: $grayly;
        }
        /deep/ .location-filter-box {
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
            input {
                padding-left: 25px;
                font-size: 16px;
            }
            label {
                margin-left: 30px;
                font-size: 16px!important;
            }
            .input-group__input {
                border-bottom: none;
            }
            .input-group__details:before {
                content: '';
                position: absolute;
                height: 1px;
                width: 100%;
                background-color: $gray-border;
                bottom: 0;
            }
        }
        .filter-label {
            font-size: 18px;
            color: $newscardtitle;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        /deep/ .sport-filter-box {
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
            .input-group {
                padding: 0;
                label {
                    top: 5px !important;
                }
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
        .action-filter-box {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>