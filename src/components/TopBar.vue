<!-- Main APP Topbar-->
<template>
    <v-app-bar prominent class="mr-3" flat :src="require('../assets/img/toolbar-grid.png')" height="80" width="100%" max-height="80" max-width="100%">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <!-- Toolbar title wrapper -->
        <v-toolbar-title>
            <v-container>
                <v-row>
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                        <!-- Main title topbar -->
                        <v-layout row>
                            <h4>{{ title.MAIN }}</h4>
                        </v-layout>

                        <!-- Topbar subtitle -->
                        <v-layout row>
                            {{ title.SUBTITLE }}
                        </v-layout>
                    </v-col>
                </v-row>
            </v-container>
        </v-toolbar-title>

        <v-spacer></v-spacer>

    </v-app-bar>
</template>

<script>
//Configuration file import
import config from '../config/config.json'

export default{
    data(){
        return{
            //Titles value import - from configuration file
            title: config.TITLE.TOPBAR,
        }
    }
}

</script>
