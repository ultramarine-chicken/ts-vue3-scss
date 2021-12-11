import { createApp } from 'vue';
import './style/style.scss';

import App from './js/main.vue';

import * as PIXI from 'pixi.js';

function main(){
    const app = createApp(App);

    const game = new PIXI.Application();

    app.mount('#main');
}


window.onload = main;