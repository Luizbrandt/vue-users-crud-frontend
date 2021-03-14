<!-- Edit User Dialog Component -->
<template>
    <v-container>

        <!-- Dialog Wraper -->
        <v-dialog v-model="deleteUserDialog" persistent>
            <v-card class="rounded-xl">

                <!-- Card toolbar -->
                <v-custom-card-toolbar :color="colors.YELLOW" :icon="icons.DELETE" :title="titles.DELETE"></v-custom-card-toolbar>

                <!-- User's info - main content -->
                <v-card-text>
                    <v-container>
                        <v-row>

                            <!-- Confirm delete message -->
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="justify">
                                {{ texts.DELETE }}
                            </v-col>

                            <!-- Name Readonly -->
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-text-field label="Nome" v-model="user_value.name" filled rounded dense readonly></v-text-field>
                            </v-col>

                            <!-- CPF Readonly -->
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-text-field label="CPF" v-model="user_value.cpf" filled rounded dense readonly></v-text-field>
                            </v-col>

                            <!-- Email Readonly -->
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-text-field label="Email" v-model="user_value.email" filled rounded dense readonly></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>

                <!-- Actions - Delete/Close -->
                <v-card-actions>
                    <v-container>
                        <v-row>

                            <!-- Delete User -->
                            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align="center">
                                <v-btn rounded :color="colors.ORANGE" width="200px" @click="deleteUser()">
                                    {{ actions.DELETE }}
                                </v-btn>
                            </v-col>

                            <!-- Cancel -->
                            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align="center">
                                <v-btn rounded :color="colors.SALMON" width="200px" @click="closeDeleteUser()">
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
                <v-btn icon v-on="{ ...tooltip}" :color="colors.ORANGE" @click="openDeleteUser()">
                    <v-icon>
                        {{ icons.DELETE }}
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

            //V-model for delete dialog.
            deleteUserDialog: false,

            //Icon for action.
            icons: config.ICON,

            //Color for button-icon.
            colors: config.COLOR,

            //Tooltip span value.
            tooltip_text: config.BUTTON.DELETE,

            //Titles value.
            titles: config.TITLE,

            //Actions text context load.
            actions: config.ACTION,

            //Text messages load.
            texts: config.TEXT,

            //Endpoints config.
            endpoints: config.ENDPOINT,
        }
    },

    //'Created' hook method.
    created(){},

    //Component methods.
    methods: {

        //Open delete user dialog.
        openDeleteUser(){
            this.deleteUserDialog = true;
        },

        //Close delete user dialog.
        closeDeleteUser(){
            this.deleteUserDialog = false;
        },

        //Delete user function.
        deleteUser(){

            //Get the id from user to delete.
            let object = {
                id: this.user_value._id,
            };

            request_Entity.delete_user(this.endpoints.DEFAULT, object).then(() => {
                
                //Call event on parent component.
                this.$emit('eventTrigger','deletedSuccess');
                this.closeDeleteUser();

            }).catch(() => {
                
                //Call event on parent component.
                this.$emit('eventTrigger','deletedFailed');
                this.closeDeleteUser();

            })

        },

    },
}
</script>