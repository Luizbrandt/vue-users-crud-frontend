<!-- Circular Loading Component - waits till server responds -->
<template>
    <v-dialog v-model="show_value" max-width="70px" max-height="70px">
      <v-card max-width="70px" max-height="70px">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
              <v-progress-circular indeterminate :color="color_value"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>

export default{
    
    props: {

        //Circular progress color.
        color:{
            type: String,
            required: true,
        }
    },
    
    data(){
        return{

            //Local prop copies.
            show_value: false,
            color_value: this.color,

        }
    },

    methods: {

        //Change value on loading model
        change(){
            this.show_value = !this.show_value;
        }
    },
}
</script>
