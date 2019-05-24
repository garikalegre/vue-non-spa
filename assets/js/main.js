import Vue from 'vue';
import Vuetify from 'vuetify';
import VueResource from 'vue-resource';
import Multiselect from 'vue-multiselect';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies';
import MQ from 'vue-match-media/src';
import Rollbar from 'vue-rollbar';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import Vue2Filters from 'vue2-filters';
import {Picker, Emoji} from 'emoji-mart-vue';

const VueUploadComponent = require('vue-upload-component');

Vue.use(VueCookies);
Vue.use(VueI18n);
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(MQ);
Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: 'AIzaSyAs3s9xDOJBcBU3csg4JBBG1e17wdPnWo0'
});
Vue.use(Vue2Filters);

if (!window.location.hostname.match('local')) {
    Vue.use(Rollbar, {
        accessToken: '95709c720ece4838a82120ca830f0e2a',
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
            environment: window.location.hostname
        }
    });
}

Vue.component('picker', Picker);
Vue.component('emoji', Emoji);
Vue.component('file-upload', VueUploadComponent);
Vue.component('multiselect', Multiselect);
Vue.component('user-avatar', require('./components/UserAvatar.vue'));
Vue.component('preloader', require('./components/Preloader.vue'));
Vue.component('plus-btn', require('./components/PlusBtn.vue'));
Vue.component('message-btn', require('./components/MessageBtn.vue'));
Vue.component('invite-btn', require('./components/InvitationBtn.vue'));
Vue.component('pure-btn', require('./components/PureBtn.vue'));
// Messages instance //
Vue.component('dialog-card', require('./components/Message/DialogCard.vue'));
Vue.component('no-result', require('./components/NoResult'));
// Chat-instance //
Vue.component('chat-log', require('./components/Message/ChatLog.vue'));
Vue.component('chat-composer', require('./components/Message/ChatComposer.vue'));
Vue.component('chat-message', require('./components/Message/ChatMessage.vue'));
Vue.component('new-chat', require('./components/Message/NewChat.vue'));
Vue.component('old-chat', require('./components/Message/OldChat.vue'));
// Events //
Vue.component('event-form', require('./components/Event/EventForm.vue'));
Vue.component('create-event', require('./components/Event/CreateEvent.vue'));
Vue.component('events-search-list-page', require('./components/Event/EventsPage.vue'));
Vue.component('event-card', require('./components/Event/EventCard.vue'));
Vue.component('events-filter', require('./components/Event/EventsFilter.vue'));
Vue.component('event-page', require('./components/Event/EventPage.vue'));
Vue.component('comments-container', require('./components/Event/CommentsContainer.vue'));
Vue.component('events-list', require('./components/Event/EventsList.vue'));
Vue.component('edit-event', require('./components/Event/EditEvent.vue'));
Vue.component('duplicate-event', require('./components/Event/DuplicateEvent.vue'));
// Menu //
Vue.component('sidebar-menu', require('./components/SidebarMenu.vue'));
Vue.component('header-nav-bar', require('./components/HeaderNavBar'));
Vue.component('quick-access-menu', require('./components/QuickAccessMenu'));
// Friends part//
Vue.component('search-friends-page', require('./components/Friend/SearchFriendsPage.vue'));
Vue.component('friends-page', require('./components/Friend/FriendsPage.vue'));
Vue.component('friends-filter', require('./components/Friend/FriendsFilter.vue'));
Vue.component('friend-card', require('./components/Friend/FriendCard.vue'));
Vue.component('friend-type-label', require('./components/Friend/FriendTypeLabel.vue'));
Vue.component('friend-sports-list', require('./components/Friend/FriendSportsList.vue'));
Vue.component('requests-btn', require('./components/RequestsBtn'));
Vue.component('user-edit', require('./components/User/UserEdit.vue'));
Vue.component('webcam', require('./components/WebCam'));
Vue.component('emailconfirmation', require('./components/Sign/Emailconfirmation'));
Vue.component('user-profile', require('./components/User/UserProfile'));
Vue.component('login-page', require('./components/Sign/LoginPage.vue'));
Vue.component('register-form', require('./components/Sign/RegisterForm'));
Vue.component('reset-password', require('./components/Sign/ResetPassword'));
Vue.component('reset-password-form', require('./components/Sign/ResetPasswordForm'));
//News
Vue.component('news-page', require('./components/News/NewsfeedPage'));
Vue.component('news-left', require('./components/News/NewsLeftSideBar'));
Vue.component('news-main', require('./components/News/NewsMainPart'));
Vue.component('news-right', require('./components/News/NewsRightSideBar'));
Vue.component('my-friends', require('./components/News/leftBar/MyFriends'));
Vue.component('my-profile', require('./components/News/leftBar/MyProfile'));
Vue.component('suggested-events', require('./components/News/rightBar/SuggestedEvents'));
Vue.component('suggested-friends', require('./components/News/rightBar/SuggestedFriends'));
Vue.component('suggested-item', require('./components/News/rightBar/SuggestedItem'));
Vue.component('new-post-form', require('./components/News/mainPart/NewPostForm.vue'));
Vue.component('news-feed-item', require('./components/News/mainPart/NewsFeedItem.vue'));
Vue.component('news-comment', require('./components/News/mainPart/NewsFeedComment'));
Vue.component('news-comment-form', require('./components/News/mainPart/NewsFeedCommentForm'));
Vue.component('invite-banner', require('./components/News/leftBar/InviteFriendsBanner'));
Vue.component('event-banner', require('./components/News/leftBar/EventCreateBanner'));
Vue.component('giphy', require('./components/GiphyComponent'));
Vue.component('feed-page', require('./components/News/mainPart/FeedPage'));

export const EventBus = new Vue();
new Vue({
    el: '#app',
    i18n: new VueI18n({
        locale: 'fr',
        messages: {
            en: {
                profile: {
                    amateur: 'Amateur sportsman',
                    professional: 'Professional sportsman',
                    coach: 'Coach',
                    fitness_trainer: 'Fitness trainer',
                    nutritionist: 'Nutritionist',
                    Male: 'Male',
                    Female: 'Female',
                    noResult: 'No elements founds'
                }
            },
            fr: {
                profile: {
                    amateur: 'Sportif amateur',
                    professional: 'Sportif pro',
                    coach: 'Coach',
                    fitness_trainer: 'Préparateur physique',
                    nutritionist: 'Nutritionniste',
                    Male: 'Homme',
                    Female: 'Femme',
                    noResult: 'Pas de résultats'
                }
            }
        }
    }),
    mq: {
        phone: '(max-width: 600px)',
        tablet: '(max-width: 960px)',
        laptop: '(max-width: 1264px)',
        desktop: '(min-width: 1265px)'
    },
    data: {
        threads: null,
        isOpen: false,
    },
    created() {
        this.$http.get('/messages/list').then(response => {
            this.threads = response.body;
        });
        EventBus.$on('hideMenu', () => {
            this.isOpen = false
        });
    },
    computed: {
        switchNewDialog() {
            return window.location.pathname.includes('/messages/create');
        }
    },
    methods: {
        menuToggle() {
            this.isOpen = !this.isOpen;
        }
    }
});