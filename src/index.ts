import { createApp } from 'vue';
import './style/style.scss';

import App from './js/main.vue';



function main(){
    
    const app = createApp(App);
    app.mount('#main');
}





window.onload = main;

