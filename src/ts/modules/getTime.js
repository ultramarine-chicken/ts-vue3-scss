export default class GetTime {
    constructor(){
        this.now = new Date();
        this.hour = this.now.getHours();
        this.min = this.now.getMinutes();
        this.sec = this.now.getSeconds();
    }

    show(){
        console.log(this.hour + '時' + this.min + '分' + this.sec + '秒');
    }
}