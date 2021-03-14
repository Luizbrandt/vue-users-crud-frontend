<template>
  <v-container>

    <!-- Loading Component -->
    <v-loading :color="colors.ORANGE" ref="loadingUsersList"></v-loading>

    <!-- Alert Instance -->
    <v-alert ref="Alert"></v-alert>

    <!-- Grid System -->
    <v-row>

      <!-- Info Card -->
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
        <v-card class="rounded-xl">

          <!-- Card toolbar -->
          <v-custom-card-toolbar :color="colors.YELLOW" :icon="icons.CRUD" :title="titles.MAIN"></v-custom-card-toolbar>

          <!-- Card Text (Main Content) -->
          <v-card-text>
            <v-container>
              <v-row>

                <!-- Users Data Table -->
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                  <v-data-table :headers="headers" :items="users" :footer-props="footer_props" sort-by="name" :search="search">

                    <template v-slot:top>
                      <v-text-field v-model="search" label="Buscar Usuários Cadastrados" class="mx-4" filled rounded dense></v-text-field>
                    </template>

                    <!-- Actions -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-container>
                      <!-- Delete User component -->
                      <v-edit-user :user="item" v-on:eventTrigger="eventHandler"></v-edit-user>

                      <!-- Delete User component -->
                      <v-delete-user :user="item" v-on:eventTrigger="eventHandler"></v-delete-user>
                      </v-container>
                    </template>


                  </v-data-table>
                </v-col>

                <!-- Create Users -->
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                  <v-custom-button :text="buttons.CREATE" :page="pages.CREATE" :icon="icons.CREATE" :color="colors.GREEN"></v-custom-button>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>

        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
//Configuration File Import
import config from '../config/config.json';

//Components Import
import Alert from '../components/Alert';
import Button from '../components/Button';
import CardToolbar from '../components/CardToolbar';
import LoadingComponent from '../components/LoadingComponent';

//CRUD Components
import DeleteUser from '../components/DeleteUser';
import EditUser from '../components/EditUser';

//API Methods import
import request_Entity from '../services/apiCommunication';

//Format method import;
import scripts from '../services/validation';

export default {

  //Custom component's names
  components: {
    'v-alert': Alert,
    'v-custom-button': Button,
    'v-loading': LoadingComponent,
    'v-custom-card-toolbar': CardToolbar,
    'v-delete-user': DeleteUser,
    'v-edit-user': EditUser,
  },

  //Vue instance data
  data(){
    return{

      //Datatable search
      search: '',

      //Imports from configuration file
      titles: config.TITLE,
      buttons: config.BUTTON,
      colors: config.COLOR,
      icons: config.ICON,
      pages: config.PAGE,
      endpoints: config.ENDPOINT,
      messages: config.MESSAGE,

      //Datatable footer
      footer_props: {
        "items-per-page-text": "Usuários / Página",
        "items-per-page-options": [5, 10, 15, 20, 25, 50, 100],
      },

      //User's array.
      users: [],

      //Data table headers.
      headers: [
          {text: 'Nome', value: 'name', align: 'start', sortable: true },
          {text: 'CPF', value: 'cpf', sortable: false },
          {text: 'Email', value: 'email', sortable: true },
          {text: 'Ações', value: 'actions'}
      ],

    }
  },

  //'Mounted' hook lifecycle method.
  mounted(){

    //Get users
    this.getUsers();

  },

  //Vue instance methods
  methods:{

    //Alert message display function override.
    showMsg(text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

    //Get users method
    getUsers(){

      //Starts loading
      this.$refs.loadingUsersList.change()

      //Clear user's array (avoid duplicate data)
      this.users = [];

      request_Entity.list_users(this.endpoints.DEFAULT).then((response) =>{

        let users_array = response.data[0];

        users_array.forEach((user) => {
          
          let single_user = {
            _id: user._id,
            cpf: scripts.cpf_format(user.cpf),
            name: user.name,
            email: user.email
          };

          //Append user on user's array
          this.users.push(single_user)

        })

      }).catch(() => {

        this.showMsg(this.messages.LIST.FAILED, this.messages.TYPE.ERROR, this.messages.TIMEOUT);

      }).finally(() => {

        //Stops loading
        this.$refs.loadingUsersList.change()

      })

    },

    //Event handler - handles emit from child components.
    eventHandler(responseValue){
      switch(responseValue){

        case 'userDeleted':
          this.showMsg(this.messages.DELETE.SUCCESS, this.messages.TYPE.SUCCESS, this.messages.TIMEOUT);
          this.getUsers();
          break;

        case 'deleteFailed':
          this.showMsg(this.messages.DELETE.FAILED, this.messages.TYPE.ERROR, this.messages.TIMEOUT);
          break;

        case 'editedSuccess':
          this.showMsg(this.messages.EDIT.SUCCESS, this.messages.TYPE.SUCCESS, this.messages.TIMEOUT);
          this.getUsers();
          break;

        case 'editedFailed':
          this.showMsg(this.messages.EDIT.FAILED, this.messages.TYPE.ERROR, this.messages.TIMEOUT);
          break;

      }
    },

  },

}

</script>