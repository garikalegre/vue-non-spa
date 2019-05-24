<template>
    <event-form
            :slug="slug"
            :textBtn="`modifier`"
            @actionclick="updateEvent"
    />
</template>

<script>
    export default {
        props: ['slug'],
        methods: {
            updateEvent(formData) {
                this.$http.post(`/event/${this.slug}/update`, formData).then(response => {
                    if (response && response.data && response.data.redirect) {
                        window.location.replace(response.data.redirect);
                    }
                });
            }
        }
    }
</script>