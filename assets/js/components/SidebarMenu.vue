<template>
    <v-navigation-drawer
        fixed temporary hide-overlay
        v-model="drawer"
        @input="handleDrawerInput()"
        :class="['aside', {active: drawer}]">
            <v-toolbar-side-icon
                :class="['burger-menu-btn', {active: drawer}, {hide: scrollDown}]"
                @click.stop="drawer = !drawer">
            </v-toolbar-side-icon>
            <v-toolbar flat class="transparent mt-5 mb-5" v-if="user">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                           <img :src="avatarUrl(user)"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content class="ml-2">
                            <v-list-tile-title>{{user.username}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <a class="edit-link" :href="edit.link">
                                <v-icon>create</v-icon>
                                <b>{{edit.title}}</b>
                            </a>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0 mt-5" dense>
                <v-list-group v-for="item in items" v-bind:key="item.title" @click.self.prevent>
                    <v-list-tile slot="item">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title @click="linkClickHandler(item.link)">{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" class="submenu"
                                @click="linkClickHandler(subItem.link)">
                        <v-list-tile-content>
                            <v-list-tile-title v-html="subItem.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
            </v-list>
    </v-navigation-drawer>
</template>

<script>
    import avatarMixin from '../mixins/avatarMixin';
    export default {
        mixins: [avatarMixin],
        props: ['isauth'],
        data() {
            return {
                user: null,
                items: null,
                drawer: false,
                mini: false,
                edit: null,
                scrollDown: false
            }
        },
        beforeMount() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            linkClickHandler(link) {
                window.location.href = link;
            },
            handleDrawerInput() {
                this.$emit('drawerinput');
            },
            handleScroll() {
                this.scrollDown = window.scrollY > 14;
            }
        },
        created() {
            this.$http.get('/user/menu').then(response => {
                this.user = response.body.user;
                this.edit = response.body.edit;
                this.items = response.body.items;
            });
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    /deep/ .overlay--active:before {
        opacity: 0;
    }

    .burger-menu-btn {
        position: fixed;
        top: 14px;
        right: 0;
        color: $white;
        transform: translateX(68px);
        transition: all .2s ease-out;
        &.hide {
            opacity: 0;
        }
        &.active {
            @media screen and (max-width: 1560px) {
                opacity: 0;
            }
        }
    }

    .edit-link{
        text-decoration: none;
        color: $black;
        font-size: 11px;
        /deep/ i {
            font-size: 11px;
        }
    }

    aside.aside {
        background-color: $white;
        padding: 0;
        z-index: 5;
        overflow: visible;
        &.active {
            @media screen and (max-width: 375px) {
                overflow: scroll;
            }
        }

        /deep/ .list__tile.list__tile--avatar{
            width: 300px;
        }
        /deep/ nav.transparent{
            /*margin-top: 30px !important;*/
            /*margin-bottom: 30px;*/
        }
    }

    /deep/ .list--group__header {
        /deep/ .list__tile {
            /deep/ .list__tile__action {
                min-width: 30px;
            }
        }
    }

    /deep/ .list--group__container {
        /deep/ ul.list--group, /deep/ .list.list--group {
            display: block !important;
            /deep/ li.submenu {
                .list__tile--link {
                    height: 30px;
                }
                /deep/ a.list__tile {
                    padding-left: 45px;
                }
            }
        }
    }
    /deep/ .avatar{
        width: 100px !important;
        height: 100px !important;
        img {
            width: 100px !important;
            height: 100px !important;
        }
    }

</style>