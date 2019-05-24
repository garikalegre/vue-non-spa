<template>
    <div class="first-form-box">
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
        <v-text-field
                name="_password_repeat"
                label="Confirmez votre mot de passe"
                v-model="repassword"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :error-messages="repasswordErrors"
                @change="$v.repassword.$touch()"
                @blur="$v.repassword.$touch()"
                required
        />

        <v-btn large color="indigo" @click="registerHandler()" :disabled="dis">S’INSCRIRE</v-btn>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate';
    import {required, email, sameAs} from 'vuelidate/lib/validators';

    export default {
        mixins: [validationMixin],
        validations: {
            email: {required, email},
            repassword:{required, sameAsPassword: sameAs('password')},
            password: {required}
        },
        data() {
            return {
                e1: true,
                email: null,
                repassword:null,
                password: null,
                checkbox: null,
                error: false,
                dis: false
            }
        },
        methods: {
            registerHandler() {
                this.$v.$touch();
                if (this.validateForm()) {
                    this.dis = true;
                    const regData = new FormData;
                    regData.append('registration[email]', this.email);
                    regData.append('registration[plainPassword][first]', this.password);
                    regData.append('registration[plainPassword][second]', this.repassword);
                    this.$http.get('/isset-email', {params: {email: this.email}}).then(response => {
                        if (response && response.data && response.data.isset) {
                            this.error = true;
                        } else {
                            this.$http.post('/register', regData).then(() => {
                                window.location.href = '/user/edit';
                            });
                        }
                    });
                    this.dis = false;
                }
            },
            validateForm() {
                return this.email && (this.repassword === this.password) && this.password && !this.emailErrors.length;
            }
        },
        computed: {
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Le mot de passe est requis.');
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.email && errors.push('Indiquez un email valide');
                !this.$v.email.required && errors.push('L\'email est requis.');
                this.error && errors.push('Cette adresse email possède déjà un compte');
                this.error = null;
                return errors;
            },
            repasswordErrors() {
                const errors = [];
                if (!this.$v.repassword.$dirty) return errors;
                !this.$v.repassword.required && errors.push('Le mot de passe est requis.');
                !this.$v.repassword.sameAsPassword && errors.push('Le mot de passe doit être identique');
                return errors;
            }
        }
    }
</script>
