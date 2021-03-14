<!-- Create User View Page -->
<template>
  <v-container>

    <!-- Loading Component -->
    <v-loading :color="colors.ORANGE" ref="loadingCreateUser"></v-loading>

    <!-- Alert Instance -->
    <v-alert ref="Alert"></v-alert>

    <!-- Grid System -->
    <v-row>

      <!-- Create User Card -->
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
        <v-card class="rounded-xl">

          <!-- Card toolbar -->
          <v-custom-card-toolbar :color="colors.YELLOW" :icon="icons.CREATE" :title="titles.CREATE"></v-custom-card-toolbar>

          <!-- Card Text (Main Content) -->
          <v-card-text>
            <v-container>
              <v-row>

                <!-- Container - Form -->
                <v-container>
                  <!-- Create User form -->
                  <v-form ref="createUser">
                    <v-row>
                    
                    <!-- Name input -->
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                      <v-text-field label="Nome" placeholder="John/Jane Doe" :rules="rules.name" counter="50" v-model="newUser.name" filled rounded dense></v-text-field>
                    </v-col>

                    <!-- CPF input -->
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                      <v-text-field label="CPF" placeholder="000.000.000-00" :rules="rules.cpf" v-mask="['###.###.###-##']" counter="14" v-model="newUser.cpf" filled rounded dense></v-text-field>
                    </v-col>

                    <!-- Email input -->
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                      <v-text-field label="Email" placeholder="john@doe.email" :rules="rules.email" counter="50" v-model="newUser.email" filled rounded dense></v-text-field>
                    </v-col>

                    </v-row>
                  </v-form>
                </v-container>

                <!-- Submit Form -->
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                  <v-btn rounded :color="colors.GREEN" class="action-spacer" @click="submitForm()">Cadastrar Usuário</v-btn>

                  <v-btn rounded :color="colors.ORANGE" class="action-spacer" @click="resetForm()">Limpar Formulário</v-btn>
                </v-col>
                
                <!-- Back to Homepage -->
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                  <v-custom-button text="Homepage" page="home" icon="mdi-home" :color="colors.BLUE"></v-custom-button>
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

//Validation function import
import script from '../services/validation.js';

//API Methods import
import request_Entity from '../services/apiCommunication';

//Router import.
import router from '../router/index';

export default {

  //Custom component's names
  components: {
    'v-alert': Alert,
    'v-custom-button': Button,
    'v-loading': LoadingComponent,
    'v-custom-card-toolbar': CardToolbar,
  },

  data(){
    return{
      
      //Import from configuration file.
      titles: config.TITLE,
      buttons: config.BUTTON,
      colors: config.COLOR,
      icons: config.ICON,
      pages: config.PAGE,

      //Alert Messages
      messages: config.MESSAGE,

      //Endpoints
      endpoints: config.ENDPOINT,

      //Form inputs
      newUser: { name: '', cpf: '', email: ''},

      //Rules - form validation
      rules: {

        name: [
          v => !!v || 'Campo Obrigatório!',
          v => (v && v.length <= 50) || 'Tamanho máximo - 50 caracteres!',
        ],

        cpf: [
          v => !!v || 'Campo Obrigatório!',
          v => (v && v.length <= 14) || 'Tamanho máximo - 14 caracteres!',
          v => (v && script.cpf(v.replace(/[()-.]|\//g, ''))) || 'CPF inválido: digite um CPF válido!',
        ],

        email: [
          v => !!v || 'Campo Obrigatório!',
          v => (v && v.length <= 50) || 'Tamanho máximo - 50 caracteres!',
          v => /.+@.+\..+/.test(v) || 'Formato inválido!',
        ],

      },

    }
  },

  methods:{

    //Alert message display function override.
    showMsg(text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

    //Waint a second and load main page (show that user is created)
    loadMainPage() {
      setTimeout(function () {
        router.push('/');
      }, 1000);
    },

    //Reset form method.
    resetForm(){
      this.$refs.createUser.reset();
    },

    //Submit form - create user method.
    submitForm(){

      if(this.$refs.createUser.validate()){

        //API json object.
        let json_object = {
          cpf: script.cpf_unformat(this.newUser.cpf),
          name: this.newUser.name,
          email: this.newUser.email,
        };

        //Start loading.
        this.$refs.loadingCreateUser.change();

        //API POST method.
        request_Entity.create_user(this.endpoints.DEFAULT, json_object).then(() => {

          this.showMsg(this.messages.CREATE.SUCCESS, this.messages.TYPE.SUCCESS, this.messages.TIMEOUT);

          //Clear form after create user.
          this.resetForm();

          //Wait 1 sec to come back to homepage.
          this.loadMainPage();

        }).catch((error) => {

          //Error status code
          let code = error.response.status;

          //Switching error message
          switch(code){
            
            //Conflict - data already stored (cpf, email).
            case 409:
              this.showMsg(this.messages.CREATE.ALREADY, this.messages.TYPE.ERROR, this.messages.TIMEOUT);
              break;
            
            //Error on creating user.
            default:
              this.showMsg(this.messages.CREATE.FAILED, this.messages.TYPE.ERROR, this.messages.TIMEOUT);
          }

          //Clear form after error
          this.resetForm();

        }).finally(() => {

          //Stops loading.
          this.$refs.loadingCreateUser.change();
        })

      }else{

        //Form imcomplete.
        this.showMsg(this.messages.FORM_IMCOMPLETE, this.messages.TYPE.WARNING, this.messages.TIMEOUT);

      }

    },

  },

}

</script>

<style scoped>

.center-title{
  margin-left: auto;
  margin-right: auto;
}

.action-spacer{
  margin: 5px;
}

</style>