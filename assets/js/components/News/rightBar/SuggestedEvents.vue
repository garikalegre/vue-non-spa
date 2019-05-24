<template functional>
      <v-card color="white" class="news-common-card suggested-events-card">
        <v-card-title primary-title>
          <div class="news-card-title-box">
            <h3 class="news-card-title">Evénements suggérés</h3>
          </div>
        </v-card-title>
        <hr>        
        <v-layout row wrap>
            <suggested-item
              v-for="item in props.suggestedEvents"
              :key="item.id"
              :url="item.photoPath"
              :title="item.name"
              :date="props.renderDate(item.start.date)"
              :location="item.location"
              :link="`/event/${item.slug}`"
              :redirectToItem="props.redirectToItem"
              :sport="item.sports[0].name"
              :btnIcon="`event`"
              :btnText="`S'inscrire`"
              :clickHandler="props.goToEvent"
              :data="item"
            >
            </suggested-item>
        </v-layout>
        <v-layout row wrap v-if="props.countAllSuggestedEvents > 5">
            <div class="more-suggested-results text-xs-center">
                <a href="/events">Voir plus ({{props.countAllSuggestedEvents}})</a>
            </div>
        </v-layout>
    </v-card>
</template>

