<template>
    <div>
        <div class="first-form-box login-form-box">
            <v-text-field
                    name="_username"
                    label="Saisissez votre adresse email"
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    required
            />
            <v-text-field
                    name="_password"
                    label="Saisissez votre mot de passe"
                    v-model="password"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :error-messages="passwordErrors"
                    @change="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
            />
            <div v-if="errorlogin" class="error-message text-xs-center mt-1 mb-1" v-text="this.errorlogin"></div>
            <v-checkbox
                    label="Se souvenir de moi sur cet appareil."
                    v-model="checkbox"
            />

            <input type="hidden" name="_remember_me" v-model="checkbox" />
            <v-btn large color="indigo" type="submit" :disabled="isDisabled">SE CONNECTER</v-btn>
        </div>
        <v-snackbar
                :timeout="6000"
                :color="`green accent-4`"
                v-model="snackbar"
        >
            {{ text }}
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :color="`red accent-4`"
                v-model="snackbar2"
        >
            {{ text2 }}
            <v-btn dark flat @click.native="snackbar2 = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar
                :timeout="6000"
                :color="`red accent-4`"
                v-model="snackbar3"
        >
            {{ text3 }}
            <v-btn dark flat @click.native="snackbar3 = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate';
    import {required, email} from 'vuelidate/lib/validators';

    export default {
        props: ['errorlogin'],
        mixins: [validationMixin],
        validations: {
            email: {required, email},
            password: {required}
        },

        data() {
            return {
                e1: true,
                email: null,
                password: null,
                checkbox: false,
                text: 'Votre compte est créé. Connectez-vous !',
                text2: 'Votre compte n\'est pas créé. Le Token est invalide',
                text3: 'Impossible de réinitialiser votre mot de passe. Le Token est invalide',
                snackbar: false,
                snackbar2: false,
                snackbar3: false
            }
        },
        computed: {
            isDisabled() {
                return !(this.email && this.password);
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Le mot de passe est requis.');
                return errors
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.email && errors.push('Indiquez un email valide');
                !this.$v.email.required && errors.push('L\'email est requis.');
                return errors
            }
        },
        methods: {
            getUrlParameter(name) {
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                let results = regex.exec(location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            },
            checkAnswerToken() {
                if (window.location.search) {
                    if (this.getUrlParameter('message') === 'registrationConfirmationSuccess') {
                        this.snackbar = true;
                    } else if (this.getUrlParameter('message') === 'wrongConfirmationToken') {
                        this.snackbar2 = true;
                    } else if (this.getUrlParameter('message') === 'wrongPasswordToken') {
                        this.snackbar3 = true;
                    }
                }
            }
        },
        mounted() {
            this.checkAnswerToken();
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .input-group.checkbox {
        display: flex;
        .input-group__input {
            order: 2;
            max-width: 15%;
        }
        label {
            order: 1;
            margin-left: 20px;
            margin-top: 5px;
        }
    }
</style>