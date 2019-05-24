<template functional>
    <v-btn
        outline
        round
        color="blue"
        class="friend-card-add-btn"
        @click="props.addHandle(props.userID)">
            <v-icon>person_add</v-icon> &nbsp;
            Ajouter
    </v-btn>
</template>