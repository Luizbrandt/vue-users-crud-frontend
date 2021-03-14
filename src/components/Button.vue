<!-- Home Button - Custom Component-->
<template>
    <v-container>
        <v-btn class="button-text-spacer" rounded :color="color_value" @click="pageNavigation()" width="200px">
            <!-- Button Icon -->
            <v-icon>
                {{ icon_value }}
            </v-icon>

            <!-- Button Text -->
            {{ text_value }}
        </v-btn>
    </v-container>
</template>

<script>
//Router import.
import router from '../router/index';

export default{

    props: {
        
        text:{
            type: String,
            required: true,
        },

        page:{
            type: String,
            required: true,
        },

        icon: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            required: true,
        },

    },

    data(){
        return{

            //Component basic information - Props required
            text_value: this.text,
            page_value: this.page,
            icon_value: this.icon,
            color_value: this.color,

        }
    },

    methods:{
        
        //Method that redirect to a given page (See '../router/index.js).
        pageNavigation(){
            router.push({ name: this.page_value });
        }

    },
}
</script>

<style scoped>

.button-text-spacer{
  margin-left: 5px;
  margin-right: 5px;
}

</style>