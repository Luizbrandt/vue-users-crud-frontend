<!-- Main APP instance -->
<template>
  <v-app>
    
    <!-- TopBar instance -->
    <v-top-bar></v-top-bar>

    <!-- Operand Logo -->
    <v-container>
      <v-row>
        <v-col align="center">
          <v-img :src="require('./assets/img/operand-logo.png')" height="50" width="180px"></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- Vue Router instance -->
    <router-view></router-view>
  
  </v-app>
</template>

<script>
//Topbar component import.
import TopBar from './components/TopBar';

export default{

  components: {
    'v-top-bar': TopBar,
  },

  data(){
    return{

    }
  }
}

</script>


<style lang="scss">
</style>
