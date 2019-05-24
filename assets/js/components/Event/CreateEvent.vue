<template>
    <event-form
            :slug="``"
            :textBtn="`créer un événement`"
            @actionclick="createEvent"
    />
</template>

<script>
    export default {
        methods: {
            createEvent(formData) {
                this.$http.post("/event/store", formData).then(response => {
                    if (response && response.data && response.data.redirect) {
                        window.location.replace(response.data.redirect);
                    }
                });
            }
        }
    }
</script>