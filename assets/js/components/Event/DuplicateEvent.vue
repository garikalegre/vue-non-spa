<template>
    <event-form
            :slug="slug"
            :textBtn="`créer un événement`"
            @actionclick="createEvent"
    />
</template>

<script>
    export default {
        props: ['slug'],
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