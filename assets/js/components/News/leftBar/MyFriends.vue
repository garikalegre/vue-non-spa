<template functional>
    <v-card color="white" class="news-common-card friends-list-card">
        <v-card-title primary-title>
          <div class="news-card-title-box">
            <h3 class="news-card-title">Mes amis</h3> 
            <div class="friends-count">{{props.user.friends.length}} amis</div>
          </div>
        </v-card-title>
        <hr>        
        <v-layout row wrap friends-list v-if="props.user.friends && props.user.friends.length">
            <user-avatar
                v-for="friend in props.user.friends.slice(0, 30)"
                :user="friend"
                :avatarSize="`40px`"
                :show="false"
                :avatarUrl="props.avatarUrl"
                :key="friend.id">
            </user-avatar>
        </v-layout>
    </v-card>
</template>

<style lang="scss" scoped>
    .friends-list{
        margin-top: 30px !important;
    }
    .news-card-title-box{
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        .friends-count{
            height: 14px;  
            font-size: 12px;
        }
    }
</style>
