<template functional>

    <v-flex xs12 result-loader>
        <v-progress-circular
            indeterminate
            :size="props.size"
            :width="props.width"
            color="red accent-3"/>
    </v-flex>

</template>

<style lang="scss" scoped>

    .result-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>