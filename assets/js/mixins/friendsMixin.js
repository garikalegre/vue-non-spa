export default {
    methods: {
        addHandle(id) {
            this.$http.post(`/friends/request/friend/${id}`).then(response => {
                this.refresh();
            });
        },
        sendMessageHandle(id) {
            window.location.href = '/messages/create/' + id;
        },
        inviteFriends() {
            window.location.href = '/tell-friends';
        },
        goProfile(user) {
            window.location.href = `/profile/${user.username}/${user.id}`
        }
    }
}