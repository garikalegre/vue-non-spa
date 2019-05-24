<template>
    <div class="friend-card__sport-inner">
        {{ showSportsList }}
    </div>
</template>

<script>
    export default {
        props: ['sports'],
        computed: {
          showSportsList: function () {
            return this.sports.map((el) => el.name).join(', ');
          }
        }
    }
</script>

<style lang="scss">

    .friend-card__sport-inner {
        text-align: center;
        height: 100%;
    }

</style>