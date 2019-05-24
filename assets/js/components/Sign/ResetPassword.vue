<template>
    <v-form v-model="valid" ref="emailresetform" lazy-validation class="reset-password-box">
        <v-text-field
            name="_username"
            label="Saisissez votre adresse email"
            v-model="email"
            :rules="emailRules"
            required>
        </v-text-field>
        <p class="email-error" v-if="error">{{textError}}</p>
        <v-btn large color="indigo" @click="requestResetPasswordHandler()" :disabled="!valid">ENVOYER</v-btn>
    </v-form>
</template>

<script>

    export default {
        data() {
            return {
                email: null,
                error: false,
                valid: true,
                textError: '',
                emailRules: [
                    (v) => !!v || 'L\'email est requis.',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Indiquez un email valide'
                ]
            }
        },
        methods: {
            requestResetPasswordHandler(){
                this.error = false;
                const fd = new FormData;
                fd.append('email', this.email);
                if (this.$refs.emailresetform.validate()) {
                    this.$http.get('/isset-email', {params: {email: this.email}}).then(response => {
                        if (response && response.data && response.data.isset) {
                            this.$http.post('/reset-password', fd).then(response => {
                                if (response) {
                                    window.location.href = '/reset-password/sent';
                                }
                            });
                        } else {
                            if (response && response.data && response.data.error) {
                                this.textError = response.data.error;
                            }
                            this.error = true;
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~VariablesStyles';
    .email-error{
        padding: 0;
        margin: 0;
        font-size: 11px;
        color: $error;
    }
    /deep/ .input-group__error{
        color: $error;
    }
</style>