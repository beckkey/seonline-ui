<template>
    <v-app>
    <v-toolbar color="primary" flat extended></v-toolbar>
 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="margin-top: -64px">
        <v-card-media src="/static/doc-images/cards/desert.jpg" height="100px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Welcome to SEOnline!</h3>
            <div>
              <v-text-field
              name="input-1"
              v-model="login"
              label="Enter your login"
              id="testing"
              ></v-text-field>

              <v-text-field
              name="input-10-1"
              label="Enter your password"
              hint="At least 8 characters"
              v-model="password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
              ></v-text-field>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <div>
          <v-btn flat color="primary" v-on:click="authorize()">sing in</v-btn>
          </div>
          <div style="margin-right: -50px;">
          <v-btn flat color="primary" v-on:click="register()">Sign up</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    </v-app>
</template>

<script>
/* eslint-disable */
import superagent from 'superagent';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)

export default {
  name: 'Login',
  data() {
    return {
      e1: true,
      login: '',
      password: '',
      currentComponent: 'login',
      error: '',
    };
  },
  methods: {
    authorize() {
      superagent.post('/api/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ username: this.login, password: this.password })
      .end((err, res) => {
        if (res.status === 200 ) {
          if(res.text === 'User' || res.text === 'Wrecker') {
            this.$router.push('/user');
          } else {
            this.$router.push('/manager');
          }
        } else {
          this.error = 'Неверно введен логин или пароль, или учетная запись отключена!'
        }
      })
    },
    register() {
      this.$router.push('/registration')
    },
  },
};
</script>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
