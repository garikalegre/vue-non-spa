<template>
    <div class="quick-access-menu">
        <v-layout v-if="$mq.phone" fill-height justify-space-around>
            <a
                    v-if="item.icon !== 'people'"
                    class="d-flex quick-access-menu__link"
                    :class="{ 'quick-access-menu__link_active': isActive(item.link) }"
                    v-for="item in items" :key="item.title"
                    @click="linkClickHandler(item.link)">
                <v-chip v-if="item.icon === 'notifications' && unread > 0 " color="red">{{unread}}</v-chip>
                <v-chip v-else-if="item.icon === 'forum' && threads[0].unread_messages > 0 " color="red">
                    {{threads[0].unread_messages}}
                </v-chip>
                <v-icon class="quick-access-menu__link-icon" large>{{ item.icon }}</v-icon>
                <div
                        class="mx-auto text-xs-center quick-access-menu__link-title">
                    {{ item.title }}
                </div>
            </a>
        </v-layout>
        <v-layout v-else fill-height justify-space-around>
            <a
                    class="d-flex quick-access-menu__link"
                    :class="{ 'quick-access-menu__link_active': isActive(item.link) }"
                    v-for="item in items" :key="item.title"
                    @click="linkClickHandler(item.link)">
                <v-chip v-if="item.icon === 'notifications' && unread > 0 " color="red">{{unread}}</v-chip>
                <v-chip v-else-if="item.icon === 'forum' && threads[0].unread_messages > 0 " color="red">
                    {{threads[0].unread_messages}}
                </v-chip>
                <v-icon class="quick-access-menu__link-icon" large>{{ item.icon }}</v-icon>
                <div
                        class="mx-auto text-xs-center quick-access-menu__link-title">
                    {{ item.title }}
                </div>
            </a>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'QuickAccesMenu',
        props: ['threads'],
        data() {
            const items = [
                {icon: "home", link: "/newsfeed", title: "Fil d’actu"},
                {icon: "notifications", link: "/messages/#notification", title: "Notifs"},
                {icon: "forum", link: "/messages", title: "Messages"},
                {icon: "list", link: "/blog", title: "Blog"},
                {icon: "event", link: "/events", title: "Agenda"},
                {icon: "people", link: "/friends", title: "Amis"},
                {icon: "add_circle", link: "/event/create", title: "Créer"},
                {icon: "search", link: "/friend/search", title: "Chercher"}
            ];
            return {
                items,
                unread: 0
            };
        },
        created() {
            this.unreadCount();
        },
        methods: {
            unreadCount() {
                this.$http.get('/notification/unread/count').then(resourse => {
                    if (resourse && resourse.data) {
                        this.unread = resourse.data[0];
                    }
                });
            },
            linkClickHandler(link) {
                window.location.href = link;
            },
            isActive(link) {
                return window.location.href.lastIndexOf(link) > 0 ? true : false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';

    .quick-access-menu {
        height: 100%;
    }

    .quick-access-menu__link {
        flex-direction: column;
        justify-content: flex-end;
        cursor: pointer;
        margin: 10px 16px;
        opacity: 0.5;
        transition: all .2s ease;
        &:hover {
            opacity: 1;
        }
    }

    .quick-access-menu__link_active {
        opacity: 1;
    }

    .quick-access-menu__link-title {
        font-size: 12px;
        word-wrap: normal;
    }

    .footer {
        .quick-access-menu {
            padding: 14px 0;
            background-color: $primary;
            color: $white;
        }
        .quick-access-menu__link-icon {
            font-size: 1.5rem;
            margin-bottom: 5px;;
        }
        .quick-access-menu__link {
            margin: 0;
        }
        .quick-access-menu__link-title {
            font-size: 10px;
        }
    }

    /deep/ .chip {
        position: absolute;
        top: 5px;
        margin-left: 25px;
    }

    /deep/ .chip__content {
        height: 25px;
        min-width: 25px;
        padding: 5px;
        color: $white;
        background-color: $error;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>