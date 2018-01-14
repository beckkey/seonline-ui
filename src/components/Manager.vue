<template>
  <v-card color="grey lighten-5" flat>
    <v-toolbar dark color="primary" flat extended>
      <v-toolbar-side-icon></v-toolbar-side-icon>

    </v-toolbar>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="white" prominent>
            <v-toolbar-title class="body-2 grey--text">
                <v-avatar>
                  <img src="/static/images/avatar.png" alt="John">
                </v-avatar>
                  Welcome {{user.name}}!
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
          <v-card-text style="height: 470px; width: 1000px;margin-left: -80px;">

  <v-card>
    <v-card-title>
      SE Students
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            lazy
          > {{ props.item.fname }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.mname }}</td>
        <td class="text-xs-right">{{ props.item.lname }}</td>
        <td class="text-xs-right">{{ props.item.group }}</td>
        <td class="text-xs-right">{{ props.item.city }}</td>
        <td class="text-xs-right">{{ props.item.info }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">
          <v-edit-dialog
            @open="tmp = props.item.iron"
            @save="props.item.iron = tmp || props.item.iron"
            large
            lazy
          >
            <div>{{ props.item.iron }}</div>
            <div slot="input" class="mt-3 title">Update Iron</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="tmp"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>

            
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
        <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
          <v-toolbar color="secondary" dark>
            <v-btn icon @click.native="dialog = false">
            <v-icon color="white">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Add new student</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="addStudent">
            <v-icon color="white">send</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container>
            <v-layout wrap>

              <v-text-field
              color="secondary"
              name="input-1"
              v-model="fname"
              label="Enter student first name"
              id="testing"
              prepend-icon="people"
              hint="Please enter with accuracy."
              ></v-text-field>

              <v-text-field
              color="secondary"
              name="input-1"
              v-model="mname"
              label="Enter student middle name"
              id="testing"
              prepend-icon="people"
              hint="Please enter with accuracy."
              ></v-text-field>

              <v-text-field
              color="secondary"
              name="input-1"
              v-model="lname"
              label="Enter student last name"
              id="testing"
              prepend-icon="people"
              hint="Please enter with accuracy."
              ></v-text-field>

              <v-flex xs12>
              <v-divider></v-divider>
              <v-text-field
              label="Additional info"
              v-model="info"
              counter
              max="120"
              full-width
              multi-line
              single-line
              ></v-text-field>

              <v-select color="secondary" v-bind:items="location" label="Select city"
              prepend-icon="location_city" v-model="city"></v-select>

              <v-select color="secondary" v-bind:items="groups" label="Select group"
              prepend-icon="group" v-model="group"></v-select>

              <v-text-field
              color="secondary"
              name="input-1"
              v-model="phone"
              label="Enter student phone number"
              id="testing"
              prepend-icon="phone_iphone"
              hint="Phone number will be use to connect with student"
              ></v-text-field>

              <input type='file' id='file_to_upload'/>

              </v-flex>
            </v-layout>
          </v-container>
                <small>*indicates required field</small>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
            </v-layout>

        </v-card>
      </v-flex>
    </v-dialog>

  </v-card>
</template>

<script>
  import superagent from 'superagent';

  export default {
    name: 'manager',
    data() {
      return {
        fname: '',
        mname: '',
        lname: '',
        city: '',
        group: '',
        phone: '',
        info: '',
        user: [],
        dialog: false,
        search: '',
        pagination: {},
        headers: [
        { text: 'First name', value: 'fname' },
        { text: 'Middle name', value: 'mname' },
        { text: 'Last name', value: 'lname' },
        { text: 'Group', value: 'group' },
        { text: 'City', value: 'city' },
        { text: 'Additional info', value: 'info' },
        { text: 'Phone', value: 'phone' },
        ],
        items: [],
        location: ['Bishkek', 'Osh', 'Talas', 'Batken', 'Naryn', 'Djalal-Abad', 'Issyk-Kul'],
        groups: ['SE-1-15', 'SE-2-15', 'SE-1-16', 'SE-1-17'],
      };
    },
    methods: {
      getMe() {
        superagent.get('/api/me')
          .then((res) => {
            this.user = res.body;
          });
      },
      getReports() {
        superagent.get('/api/users')
          .then((res) => {
            console.log(res);
            // eslint-disable-next-line
            this.items = res.body;
          });
      },
      addStudent() {
        superagent.post('/api/users')
        // eslint-disable-next-line
          .send({ login: this.fname, password: this.fname, fname: this.fname, mname: this.mname, lname: this.lname, city: this.city, group: this.group, phone: this.phone, info: this.info })
          .end(() => {
            this.dialog = false;
          });
      },
    },
    beforeMount() {
      this.getMe();
      this.getReports();
    },
  };
</script>


<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>