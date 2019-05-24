<template functional>
    <v-card color="white" class="news-common-card suggested-friends-card">
        <v-card-title primary-title>
            <div class="news-card-title-box">
                <h3 class="news-card-title">Sportifs suggérés</h3>
            </div>
        </v-card-title>
        <hr>
        <v-layout row wrap v-if="props.suggestedFriends.length">
            <suggested-item
                    v-for="item in props.suggestedFriends"
                    :key="item.id"
                    :url="item.photoPath"
                    :title="item.username"
                    :date="``"
                    :link="`/profile/${item.username}/${item.id}`"
                    :redirectToItem="props.redirectToItem"
                    :location="item.geolocation"
                    :sport="item.sports[0].name"
                    :btnIcon="`person_add`"
                    :btnText="`Ajouter`"
                    :data="item"
                    :clickHandler="props.addHandler"
            >
            </suggested-item>
        </v-layout>
        <div v-else>
            <p class="mt-2 px-3">Pas de nouveaux membres à vous proposer.</p>
        </div>
        <v-layout row wrap v-if="props.countAllSuggestedFriends > 5">
            <div class="more-suggested-results text-xs-center">
                <a href="/friend/search">Voir plus ({{props.countAllSuggestedFriends}})</a>
            </div>
        </v-layout>
    </v-card>
</template>
