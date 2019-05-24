<template>
    <div class="reset-password-box">
        <v-text-field
            name="_password"
            label="Nouveau mot de passe"
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
            name="_repassword"
            label="Répétez le nouveau mot de passe"
            v-model="repassword"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            :error-messages="repasswordErrors"
            @change="$v.repassword.$touch()"
            @blur="$v.repassword.$touch()"
            required
        />
        <v-btn large color="indigo" @click="resetPasswordHandler()" :disabled="dis">ENVOYER</v-btn>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate';
    import {required, sameAs} from 'vuelidate/lib/validators';

    export default {
        mixins: [validationMixin],
        validations: {
            repassword:{required, sameAsPassword: sameAs('password')},
            password: {required}
        },
        data() {
            return {
                e1: true,                
                password: null,                
                repassword: null,
                dis: false
            }
        },
        methods:{
            resetPasswordHandler(){
                this.$v.$touch();
                if (this.validateForm) {
                    const regData = new FormData;
                    regData.append('registration[plainPassword][first]', this.password);
                    regData.append('registration[plainPassword][second]', this.repassword);
                    this.dis = true;
                    this.$http.post(`/update-password/${this.userId}`, regData).then(response => {
                        if (response && response.data) {
                            window.location.href = response.data.link;
                            this.dis = false;
                        }
                    });
                }
            }
        },
        computed: {
            validateForm(){
                return this.password === this.repassword;
            },
            userId() {
                const locArray = window.location.href.split('/');
                const locArray2 = locArray[locArray.length - 1].split('?');
                return locArray.length ? Number(locArray2[0]) : 0;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Le mot de passe est requis.');
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