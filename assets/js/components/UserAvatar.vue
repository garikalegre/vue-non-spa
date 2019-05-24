<template functional>
    <div class="avatar-box">
        <a :href="`/profile/${props.user.username}/${props.user.id}`" :title="props.user.username">
        <v-avatar :size="props.avatarSize">
            <img :src="props.avatarUrl(props.user)"/>
        </v-avatar>
        </a>
        <div class="user-info" v-if="props.show">
            <a :href="`/profile/${props.user.username}/${props.user.id}`" class="avatar-username">{{props.user.username}}</a>
            <a :href="`/profile/${props.user.username}/${props.user.id}`" class="avatar-location">{{props.user.location || props.user.geolocation}}</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~VariablesStyles';
    .avatar-box {
        display: flex;
        a{
            display: flex;
            align-items: center;
        }
        .avatar-username{
            color: $secondary;
            font-size: 16px;
            font-weight: 300;
        }
        .avatar-location{
            color: $black;
            font-size: 12px;
            font-weight: 300;
        }
        .user-info {
            margin-left: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            a{
                text-decoration: none;
                margin-bottom: 5px;
            }
        }
    }
</style>