import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify); //这是如何在vue中使用插件的方式


//this is how we change default settings in vuetify
const vuetify = new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#9652ff',
            secondary: '#b0bec5',
            anchor: '#8c9eff',
          },
        },
      },
})

export default vuetify