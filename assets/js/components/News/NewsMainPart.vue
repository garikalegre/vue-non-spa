<template>
    <div style="position: relative;">
        <new-post-form :user="user" :sendHandler="sendHandler"/>
        <div class="result-loader" v-if="loading || news.length === 0">
            <v-progress-circular
                indeterminate
                :size="50"
                color="blue"/>
        </div>
        <p v-if="news.length === 0" class="text-xs-center">Votre newsfeed est en cours de chargement.</p>
        <news-feed-item
            v-for="value in news"
            :newsFeed="value"
            :key="value.id"
            :user="user"
            :sendComment="sendComment"
        />
        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        </infinite-loading>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        props: ['user', 'sendHandler', 'loading', 'news', 'sendComment', 'infiniteHandler'],
        components: {
            InfiniteLoading
        },
        mounted() {
            this.timeoutForStartNews();
        },
        methods: {
            timeoutForStartNews() {
                const self = this;
                window.setTimeout(function () {
                    if (self.news.length === 0) {
                        window.location.reload(true);
                    }
                }, 11000);
            }
        }
    }
</script>

<style lang="scss" scoped>

    /deep/ .infinite-status-prompt{
        display: none;
    }

    .result-loader {
        position: absolute;
        margin-top: 10%;
        margin-left: 45%;
        transform: translate(-50%, -50%);
    }

</style>