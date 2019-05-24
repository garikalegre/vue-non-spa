<template functional>
    <div class="giphy-block">
        <div class="close-box d-flex reverse">
            <v-icon @click="props.resetGiphy()">close</v-icon>
        </div>
        <form @submit.prevent="props.searchGIFs()">
            <h3 class="text-xs-center">Quelle image cherchez vous ?</h3>
            <v-text-field
                    @keyup="props.queryHandler($event)"
                    placeholder="Recherche"
                    required
            ></v-text-field>
            <v-btn type="submit" dark color="blue" id="searchBtn" :disabled="props.query.trim() == '' ? true : false">
                Recherche
            </v-btn>
        </form>
        <h3 v-show="props.results.length === 0" class="no-results my-2">Aucun resultat n'a été trouvé</h3>
        <div v-show="props.results" class="results-box">
            <img :src="gif.images.fixed_height_small.url" class="image-card" v-for="gif in props.results"
                 @click="props.viewGIF(gif)">
        </div>
    </div>
</template>
