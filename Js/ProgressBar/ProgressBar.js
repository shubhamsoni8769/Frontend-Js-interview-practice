const progressBarEle = document.getElementById('progress-bar');
const btn = document.getElementById('btn');

class ProgressBar {
    constructor(max) {
        this.active = 0;
        this.list = []
        this.current = 0;
        this.max = max

    }

    createProgressBar() {
        const wrapper = document.createElement("div");
        wrapper.style.height = "20px";
        wrapper.style.width = "300px";
        wrapper.style.border = "2px solid black";

        const div= document.createElement("div");
        div.style.width = "0%";
        div.style.height = "20px";
        div.style.background = "pink";

        wrapper.appendChild(div);
        progressBarEle.appendChild(wrapper);
        return div
    }

    runProgressBar() {
        this.active++;
        const currentEle = this.list[this.current++];

        let w = 0

        let timerId = setInterval(() => {
            if(w === 99) {
                clearInterval(timerId);
                this.active--;
                if(this.#checkLimit()) {
                    this.runProgressBar()
                }

            }
            w++;
            currentEle.style.width = w + '%'

        },10)
    }
    #checkLimit() {
        return this.current < this.list.length && this.active < this.max
    }

    push() {
        this.list.push(this.createProgressBar())
        if(this.#checkLimit()) {
            this.runProgressBar()
        }

    }
}

const obj = new ProgressBar(2);

btn.addEventListener("click", () =>{
    obj.push()
})




// function Based approch

// function ProgressBar(limit){
//     this.active = 0;
//     this.limit = limit;
//     this.list = [];
//     this.curr = 0;
// }
 
// ProgressBar.prototype.run = function () {
//     this.active++;
//     let node = this.list[this.curr++];
 
//         let w = 0
//         let timer = setInterval(() =>{
           
//             if(w === 99){
//                 clearInterval(timer);
//                 this.active--;
//                 if(this.active< this.limit && this.curr< this.list.length){
//                     this.run()
//                 }
 
//             }
//             w++;
//             node.style.width = w + '%'
//         },10)
// }
// ProgressBar.prototype.createBar = function(){
//     let outer = document.createElement('div');
//     outer.style.height = '20px';
//     outer.style.border = '2px solid black'
//     let inner = document.createElement('div');
//     inner.style.height = '20px';
//     inner.style.width = '0%'
//     inner.style.background = 'pink'
//     outer.appendChild(inner);
//     c.appendChild(outer);
 
//     return inner
// }
 
// ProgressBar.prototype.push = function(){
//     this.list.push(this.createBar());
//     if(this.active < this.limit && this.curr< this.list.length){
//         this.run()
//     }
   
// }