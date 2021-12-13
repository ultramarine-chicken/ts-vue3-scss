import { createApp } from 'vue';
import './style/style.scss';

import App from './js/main.vue';


function main(){
    window.scrollTo({
        top: 0, left: 0
    });

    const app = createApp(App);
    app.mount('#main');
}


window.onload = main;