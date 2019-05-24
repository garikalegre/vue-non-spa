<template functional>
    <v-card color="white" class="news-common-card">
        <v-card-title primary-title>
          <div>
            <h3 class="news-card-title">Mon profil</h3>            
          </div>
        </v-card-title>
        <hr>        
        <v-layout row wrap>
            <v-flex d-flex justify-center xs3>
                <v-avatar :size="`60px`">
                    <img :src="props.avatarUrl(props.user)" alt="avatar">
                </v-avatar>
            </v-flex>
            <v-flex xs9 user-info-box>
                <h6 class="title-names">{{props.user.username}}</h6>
                <div>
                    <p class="mt-1 mb-1 location">{{props.user.location}}</p>
                </div>
                <div>
                    <p class="mt-1 description" v-if="props.user.bDate">{{props.renderDate(props.user.bDate.date)}}</p>
                </div>
                <div>
                    <p class="mt-1 news-item-sport">{{props.parseSport(props.user.sports_full)}}</p>
                </div>
                <div>
                    <p class="mb-1 description" v-html="props.user.description"></p>
                </div>
              <v-btn outline tag :href="`/user/edit`" class="feeds-common-btn" round color="blue">
                <v-icon>edit</v-icon>  Editer mon profil
              </v-btn> 
            </v-flex>
        </v-layout>
    </v-card>
</template>

<style lang="scss" scoped>
    @import '~VariablesStyles';
    .user-info-box{
        padding: 20px !important;
        .location{
            font-size: 12px;
            font-weight: normal;
            font-style: oblique;            
            text-align: left;
            color: $black;
        }
        .description{
            font-size: 12px;  
            text-align: left;
            color: $black;
        }
    }
    /deep/ .card-actions{
        display: flex;
        justify-content: center;
    }
</style>
