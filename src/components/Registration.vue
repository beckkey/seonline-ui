<template>
    <v-app>
    <v-toolbar color="primary" flat extended>
          <v-btn flat color="black" v-on:click="back()">
          <v-icon>arrow_back</v-icon>
          </v-btn>
    </v-toolbar>
 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="margin-top: -64px">
        <v-card-media src="/static/doc-images/cards/desert.jpg" height="100px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Sign up</h3>
            <div>
              <v-text-field
              name="input-1"
              v-model="login"
              label="Enter your login"
              id="testing"
              prepend-icon="account_box"
              ></v-text-field>
              
              <v-text-field
              name="input-1"
              v-model="name"
              label="Enter your name"
              id="testing"
              prepend-icon="face"
              hint="Please enter a real name"
              ></v-text-field>

              <v-text-field
              name="input-1"
              v-model="phone"
              label="Enter your phone number"
              id="testing"
              prepend-icon="phone_iphone"
              hint="Phone number will be use to connect with you"
              ></v-text-field>

              <v-text-field
              name="input-10-1"
              label="Enter your password"
              hint="At least 6 characters"
              v-model="password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
              prepend-icon="https"
              ></v-text-field>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary" v-on:click="register()">Sign up</v-btn>
        </v-card-actions>
        <v-alert color="success" icon="check_circle" dismissible
          v-model="alert">Registration was success!
        </v-alert>
      </v-card>
    </v-flex>
  </v-layout>
    </v-app>
</template>

<script>
/* eslint-disable */
import superagent from 'superagent';

export default {
  name: 'Login', 
  data() {
    return {
      alert: false,
      e1: true,
      login: '',
      password: '',
      name: '',
      phone: '',
      role: '',
      error: '',
      items: ['Wrecker', 'User'],
    };
  },
  methods: {
    register() {
      superagent.post('/api/users/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ login: this.login, password: this.password, fname: this.name, phone: this.phone, rights: this.role })
      .end((err, res) => {
        if (res.status === 200 ) {
            this.alert = true;
            setTimeout(this.back, 3000)
        } else {
          this.error = 'There are error while connecting!'
        }
      })
    },
    back () {
      this.$router.push('/login')
    },
  },
};

</script>