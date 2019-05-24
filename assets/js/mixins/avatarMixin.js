export default {
    methods: {
        avatarUrl(user) {
            if (user.avatar && (user.avatar.match('s3-us-west-2.amazonaws.com') || user.avatar.match('google'))) {
                return user.avatar;
            }
            if (user.facebook_id) {
                return `http://graph.facebook.com/${user.facebook_id}/picture?type=large`;
            }

            return `/images/main_no_avatar.svg`;
        }
    }
}