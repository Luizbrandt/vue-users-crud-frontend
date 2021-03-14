<!-- Edit User Dialog Component -->
<template>
    <v-container>

        <!-- Dialog Wraper -->
        <v-dialog v-model="editUserDialog" persistent max-width="70%">
            <v-card class="rounded-xl">

                <!-- Card toolbar -->
                <v-custom-card-toolbar :color="colors.YELLOW" :icon="icons.UPDATE" :title="titles.UPDATE"></v-custom-card-toolbar>

                <!-- User's info - main content -->
                <v-card-text>
                    <v-container>
                        <v-form ref="editUserForm">
                        <v-row>

                            <!-- Email Change (Name and CPF don't not change over time) -->
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-text-field label="Email" v-model="edit_user.email" :rules="rules.name" filled rounded dense></v-text-field>
                            </v-col>

                        </v-row>
                    </v-form>
                    </v-container>
                </v-card-text>

                <!-- Actions - Edit/Close -->
                <v-card-actions>
                    <v-container>
                        <v-row>

                            <!-- Edit User -->
                            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align="center">
                                <v-btn rounded :color="colors.ORANGE" width="200px" @click="editUser()">
                                    {{ actions.UPDATE }}
                                </v-btn>
                            </v-col>

                            <!-- Cancel -->
                            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align="center">
                                <v-btn rounded :color="colors.SALMON" width="200px" @click="closeEditUser()">
                                    {{ actions.CANCEL }}
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <!-- Dialog activator (Tooltip) -->
        <v-tooltip bottom>

            <template #activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...tooltip}" :color="colors.ORANGE" @click="openEditUser()">
                    <v-icon>
                        {{ icons.UPDATE }}
                    </v-icon>
                </v-btn>
            </template>

            <span>
                {{ tooltip_text }}
            </span>

        </v-tooltip>

    </v-container>
</template>

<script>
//Configuration file import.
import config from '../config/config.json';

//Components import.
import CardToolbar from '../components/CardToolbar';

//API Methods import
import request_Entity from '../services/apiCommunication';

//Validation function import
import script from '../services/validation.js';

export default{

    components: {
        'v-custom-card-toolbar': CardToolbar,
    },
    
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    
    data(){
        return{

            //User context recovery.
            user_value: this.user,

            //Form inputs.
            edit_user: {
                email: '',
            },

            //V-model for edit dialog.
            editUserDialog: false,

            //Icon for action.
            icons: config.ICON,

            //Color for button-icon.
            colors: config.COLOR,

            //Tooltip span value.
            tooltip_text: config.BUTTON.UPDATE,

            //Titles value.
            titles: config.TITLE,

            //Actions text context load.
            actions: config.ACTION,

            //Text messages load.
            texts: config.TEXT,

            //Endpoints config.
            endpoints: config.ENDPOINT,

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

    //'Created' hook method.
    created(){},

    //Component methods.
    methods: {

        //Open edit user dialog.
        openEditUser(){
            this.edit_user.email = this.user_value.email
            this.editUserDialog = true;
        },

        //Close edit user dialog.
        closeEditUser(){
            this.editUserDialog = false;
        },

        //Function to edit User
        editUser(){

            if(this.$refs.editUserForm.validate()){
                
                //Create object to update user
                let object = {
                    oldEmail: this.user_value.email,
                    newEmail: this.edit_user.email,
                }

                request_Entity.edit_user(this.endpoints.EMAIL, object).then(() => {
                    
                    //Call event on parent component
                    this.$emit('eventTrigger','editedSuccess');
                    this.closeEditUser()

                }).catch(() => {
                    
                    //Call event, for failed edit now.
                    this.$emit('eventTrigger','editedFailed');
                    this.closeEditUser()
                })


            }

        },

    },
}
</script>