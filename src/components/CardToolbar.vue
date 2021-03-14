<template>
    <v-toolbar :color="color_value">
        <v-icon> {{ icon_value }} </v-icon>
        <v-toolbar-title class=" center-title"> {{ title_value }} </v-toolbar-title>
    </v-toolbar>
</template>

<script>

export default{
    
    props:{

        color: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },
    },
    
    data(){
        return{

            color_value: this.color,
            icon_value: this.icon,
            title_value: this.title,

        }
    }
}

</script>

<style scoped>

.center-title{
  margin-left: auto;
  margin-right: auto;
}

</style>