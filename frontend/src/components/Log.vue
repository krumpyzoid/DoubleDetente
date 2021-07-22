<template>
    <div class="prestation__login">
        <h1>Veuillez vous connecter pour réserver un rendez-vous</h1>
        <div class="prestation__input">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.identifier">
        </div>
        <div class="prestation__input">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="user.password">
        </div>
        <p v-if="loginmessage">Error: {{loginmessage}}</p>
        <button class="btn btn-dark" @click="handleLogin">Se connecter</button>
        <button class="btn btn-white">S'inscrire</button>
        <a href="">Mot de passe oublié</a>
        <p v-if="loginsuccess">{{loginsuccess}}</p>
    </div>
</template>

<script>
import User from '../models/user';

export default {
    data() {
        return {
            user: new User('', ''),
            loading: false,
            loginmessage: '',
            loginsuccess: null,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        }
    },
    methods: {
        handleLogin() {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
                this.loginmessage = ''
                this.user.identifier = ''
                this.user.password = ''
            },
            (error) => {
                this.loading = false;
                this.loginmessage = error.response.data.message[0].messages[0].message })
        }
    }
}
</script>

<style lang="scss">
    .prestation__login {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        margin-left: 2em;
        height: 100%;
        padding: 1em 2em;
        h1 {
            text-align: center;
            font-weight: 400;
            margin-bottom: 1em;
        }
        button {
            margin-bottom: 0.5em;
            padding: 0.4em;
            width: 150px;
            font-size: 0.8em;
        }
        a {
            font-size: 0.8em;
            color: rgb(27, 21, 31);
        }
        background-color: rgb(216, 162, 252);
    }
    .prestation__input {
        position: relative;
        input {
            width: 100%;
            margin: 1em 0;
            padding: 0.2em 0.5em;
            font-size: 0.7em;
            border-radius: 0.5em;
            border: 2px solid white;
            &:focus {
                outline: none;
                border-color: rgb(174, 121, 209);
            }
        }
        label {
            position: absolute;
            letter-spacing: 0.1em;
            font-size: 0.6em;
            top: -0.5em;
            left: 0.2em;
        }
    }
</style>