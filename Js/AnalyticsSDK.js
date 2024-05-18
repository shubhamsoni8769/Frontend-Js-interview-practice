const SDK = function () {
    this.logs = [];
    this.count = 1;
    this.active = 0

    this.push = function (event) {
        this.logs.push(event)
    }

    this.stub = function () {
        this.count++
        return new Promise((res,rej) => {
            setTimeout(() => {
                if(this.count %5 === 0) {
                    rej()
                }else{
                    res("data")
                }
            },1000)
        }) 
    }
    this.sendEvent = async() => {
        if(this.logs.length === 0)return;


        const current = this.logs.shift()
        try{
            await this.stub();
            console.log("logged", current);
            this.count++

        } catch(e){
            console.log("--------------------");
            console.log("Retrying Event failed", current);

            console.log("--------------------");
            this.count = 1;
            this.logs.unshift(current)
        } finally {
            this.sendEvent()
        }
    }

}

const sdk = new SDK();
sdk.push("Event 1");
sdk.push("Event 2");
sdk.push("Event 3");
sdk.push("Event 4");
sdk.push("Event 5");
sdk.push("Event 6");
sdk.push("Event 7");
sdk.push("Event 8");
sdk.push("Event 9");
sdk.push("Event 10");
sdk.push("Event 11");
sdk.push("Event 12");
sdk.push("Event 13");
sdk.push("Event 14");
sdk.push("Event 15");
sdk.sendEvent();