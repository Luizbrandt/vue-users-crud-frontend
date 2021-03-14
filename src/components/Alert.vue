<!-- Alert Component - Top Alert Message-->
<template>
  <div>
    <v-snackbar rounded="lg" :color="color" v-model="snackbar" :timeout="timeout" elevation="12" absolute top>
      <v-container>
        <v-row justify="center" align="center">
            <v-icon class="vertical">{{ icon }}</v-icon>
            <span class="bloco text-justify">{{ text }}</span>
            <v-btn title="Fechar" dark icon text @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>

<script>

export default {

  data: () => ({
    top: true,
    snackbar: false,
    timeout: -1,
    text: "",
    color: "",
    icon: "mdi-alert-circle-outline",
  }),

  methods: {
    
    //Method that displays top message with given icon.
    showMsg: function (text, color, timeout = 3000) {

      this.snackbar = true;
      this.text = text;
      this.color = color;
      this.timeout = timeout;

      switch (this.color) {
          
        case "warning":
          this.icon = "mdi-alert-outline";
          this.color = '#FF8300';
          break;

        case "error":
          this.icon = "mdi-alert-octagon-outline";
          this.color = '#D32F2F';
          break;

        case "success":
          this.icon = "mdi-checkbox-marked-circle-outline";
          this.color = '#00C174';
          break;

        case "info":
          this.icon = "mdi-information-outline";
          this.color = '#57A4E1';
          break;
      }

    },

  },

};
</script>

<style scoped>
.bloco {
  display: block;
  margin: 5px;
  margin-top: 7px;
}
.vertical {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
  margin-right: 5px;
}
</style>