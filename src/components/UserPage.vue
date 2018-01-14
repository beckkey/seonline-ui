<template>
<v-app>
  <v-card color="grey lighten-5" flat>
    <v-toolbar dark color="primary" flat extended>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-btn icon style="margin-left: 90%" @click.native="exit()"><v-icon>exit_to_app</v-icon></v-btn>

    </v-toolbar>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="white" prominent>
            <v-toolbar-title class="body-2 grey--text">
                <v-avatar>
                  <img src="/static/images/avatar.png" alt="John">
                </v-avatar>
                  Welcome {{username}}!
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = true">
              <v-icon>note_add</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>settings</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</v-app>  
</template>

<script>
  import superagent from 'superagent';

  export default {
    name: 'navbar',
    data() {
      return {
        username: '',
        phone: '',
        city: '',
        carNumber: '',
        address: '',
        desc: '',
        dialog: false,
        items: ['Bishkek', 'Osh', 'Talas', 'Batken', 'Naryn', 'Djalal-Abad', 'Issyk-Kul'],
      };
    },
    methods: {
      getMe() {
        superagent.get('/api/me')
          .then((res) => {
            this.username = res.body.name;
            this.phone = res.body.phone;
          });
      },
      addReport() {
        const files = document.getElementById('file_to_upload').files;
        const formData = new FormData();
        // eslint-disable-next-line
        for (let key in files) {
            // is the item a File?
                    // eslint-disable-next-line
          if (files.hasOwnProperty(key) && files[key] instanceof File) {
            formData.append(key, files[key]);
            formData.append('carNumber', this.carNumber);
            formData.append('address', this.address);
            formData.append('description', this.desc);
            formData.append('state', this.city);
            formData.append('reporterPhone', this.phone);
          }
        }
        superagent.post('/api/reports')
          .send(formData)
          .then((res) => {
            console.log(res);
          });
      },
      exit() {
        this.$router.push('/login');
      },
    },
    beforeMount() {
      this.getMe();
    },
  };
</script>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>