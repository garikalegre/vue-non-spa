<template>
    <v-toolbar height="75" class="header-nav elevation-3">
        <v-toolbar-title>
            <a :href="`/profile/${user.name}/${user.id}`">
                <v-avatar>
                    <img :src="`/images/Sportialize.svg`" alt="Sportialize">
                    Sportialize
                </v-avatar>
            </a>
        </v-toolbar-title>
        <v-spacer id="central-spacer" class="spacer__central"></v-spacer>
        <quick-access-menu :threads="threads" class="hidden-sm-and-down"/>
    </v-toolbar>
</template>


<script>
    export default {
        props: ['threads'],
        computed: {
            user() {
                if (localStorage.getItem('userDetails')) {
                    const user = JSON.parse(localStorage.getItem('userDetails'));

                    return user
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import '~VariablesStyles';

    .toolbar__title {
        padding-left: 52px;
    }

    .header-nav {
        background-color: $primary;
        z-index: 1;
        color: $white;
        width: 100vw !important;
        transition: all .2s ease-out;
        /deep/ .avatar {
            min-width: 160px;
        }
        a {
            color: $white;
            text-decoration: unset;
        }
    }

</style>