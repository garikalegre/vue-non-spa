<template>
    <v-card class="event-card elevation-0">
        <v-card-media class="event-card__avatar-box">
            <a
              class="event-card__avatar-image"
              :title="eventItem.user.username"
              :href="`/event/${eventItem.slug}`"
              @click="goToDetails(eventItem.slug)">
                <img :src="switchImage(eventItem)" class="event-image"/>
            </a>
        </v-card-media>
        <v-card-title class="d-flex event-card__about" @click="goToDetails(eventItem.slug)">
            <span class="event-card__name">{{ eventItem.name }}</span>
            <span class="event-card__date">
                <v-icon>event </v-icon>
                <span>{{ parseDate(eventItem.start) }}</span>
            </span>
            <span class="event-card__location">
                <v-icon>location_on </v-icon>
                <span>{{ eventItem.location }}</span>
            </span>
            <div class="event-card__description">
                <div class="event-card__description-inner text-xs-justify">{{ eventItem.description }}</div>
            </div>
            <div
                class="event-card__sport"
                @click.stop="goProfile(eventItem.user)">
                    <friend-sports-list :sports="eventItem.sports"/>
            </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex event-card__button-box" :class="{ 'event-card__button-box_notowncard': !isOwner }">
            <v-btn v-if="isauth" outline round color="blue" @click="goToDetails(eventItem.slug)">
                {{ buttonTxt }}
            </v-btn>
            <v-btn v-else outline round color="blue" @click="dialog2 = true">{{ buttonTxt }}</v-btn>
        </v-card-actions>
        <v-layout row center class="event-card__owner-box">
            <v-btn
                v-if="isauth && isOwner"
                icon
                outline
                class="event-card__owner-button event-card__owner-button_edit"
                color="green lighten-1"
                tag :href="goToEdit(eventItem.slug)">
                    <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
                v-if="isauth && isOwner"
                icon
                outline
                color="red lighten-1"
                class="event-card__owner-button event-card__owner-button_delete"
                @click.native.stop="dialog = true">
                    <v-icon>close</v-icon>
            </v-btn>
        </v-layout>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Annuler mon événement</v-card-title>
                <v-card-text>Etes vous certain de vouloir annuler?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Non</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteHandler(eventItem.slug)">Oui</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" width="350">
            <v-card class="px-3 py-3">
                <v-card-text class="text-xs-center">Cette action est réservée aux membres connectés.</v-card-text>
                <v-card-actions class="guest-dialog-box">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" outline round tag href="/register" flat="flat">inscription</v-btn>
                    <v-btn color="blue darken-1" outline round tag href="/login" flat="flat">connexion</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    import moment from 'moment';
    import friendsMixin from '../../mixins/friendsMixin';
    import avatarMixin from '../../mixins/avatarMixin';

    export default {
        mixins: [friendsMixin, avatarMixin],
        props: {
            eventItem: Object,
            buttonTxt: String,
            deleteHandler: Function,
            isauth: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dialog: false,
                dialog2: false
            }
        },
        computed: {
            eventSports() {
                const sports = [];
                if (this.eventItem && this.eventItem.sports) {
                    this.eventItem.sports.forEach((sport) => {
                        sports.push(sport.name);
                    });
                }

                return sports.join();
            },
            isOwner() {
                const currentUser = JSON.parse(localStorage.getItem('userDetails'));

                return currentUser && (currentUser.id === this.eventItem.user.id);
            }
        },
        methods: {
            parseDate(date) {
                if (date && date.date) {

                    return moment(date.date).locale('fr').format('LLL');
                }
            },
            goToDetails(slug) {

                window.location.href = `/event/${slug}`;
            },
            goToEdit(slug) {

                return `/event/${slug}/edit`;
            },
            switchImage(event){
                if (event){
                    if (event.photoPath){
                        return event.photoPath;
                    }
                  return this.avatarUrl(event.user);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .event-card {
        display: flex;
        flex-direction: column;
        width: 300px;
        min-width: 280px;
        max-width: 320px;
        margin: 20px;
        padding: 20px;
        background-color: $white;
    }

    .event-card__owner-box {
        position: absolute;
        right: 5px;
        top: 0;
    }

    .event-card__owner-button {
        margin: 6px 4px;
        i {
            font-size: 20px;
            font-weight: 800;
        }
    }

    .event-card__owner-button_edit {
        i {
            font-weight: normal;
        }
    }

    .event-card__avatar-box {
        position: relative;
    }

    .event-card__avatar-image {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        .event-image{
            max-width: 200px;
        }
    }

    .event-card__about {
        flex-direction: column;
        padding: 0;
        cursor: pointer;
    }

    .event-card__name {
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        color: $newstitlenames;
        padding: 10px 0 5px 0;
        text-align: center;
    }

    .event-card__date,
    .event-card__location {
        text-decoration: none;
        font-size: 14px;
        color: $newsitemdate;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .event-card__description {
        margin: 10px 0 10px 0;
        width: 100%;
        max-height: 63px;
        overflow: hidden;
    }

    .event-card__description-inner {
        height: 100%;
        font-size: 13px;
        line-height: 13px;
    }

    .event-card__sport {
        color: $gray-sports-list-text;
        cursor: pointer;
        width: 100%;
        margin-top: 10px;
    }

    .event-card__button-box {
        width: 75%;
        align-self: center;
        justify-content: center;
        padding: 0;
        margin: 16px 0 12px 0;
    }

    .event-card__button-box_notowncard {
        width: initial;
    }
    @media only screen and (min-width: 600px) {
        .event-card__avatar-box {
            height: 200px !important;
        }
    }

    @media only screen and (min-width: 600px) and (max-width: 959px) {
        .event-card {
            margin: 10px;
            min-width: 270px;
        }
    }

    @media only screen and (min-width: 400px) and (max-width: 599px) {
        .event-card {
            margin: 10px auto;
            min-width: 380px;
        }
        .event-card__description-inner {
            line-height: 13px;
        }
    }

    @media only screen and (min-width: 350px) and (max-width: 399px) {
        .event-card {
            margin: 10px auto;
            min-width: 330px;
        }
    }

    @media only screen and (max-width: 349px) {
        .container {
            margin: 10px auto;
            min-width: 310px;
        }
    }

</style>