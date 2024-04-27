const createAsyncTask = () => {
    const randomVal = Math.floor(Math.random() *10)
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log(randomVal);
            if(randomVal > 5) {
                resolve(randomVal)
            }else{
                reject(randomVal)
            }
        },randomVal*100)
    })
}

const tasks = [
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask
]

// Approch 1
const taskRunnerA1 = async(tasks, cb) => {
    const result = [];
    const error = [];
    for(let task of tasks) {
        try{
            const successTAsk = await task()
            result.push(successTAsk)
        } catch(e) {
            error.push(e)
        }
    }
    cb(result, error)

}

// taskRunnerA1(tasks, (result, err) => console.log(result, err))

const taskRunnerA2 = (tasks, cb) => {
    const result = [];
    const error = [];

    const helper = (ptr = 0) => {
        if(ptr === tasks.length) {
            cb(result, error)
            return;
        }
        tasks[ptr]().then((num) => {
            result.push(num)
        }).catch((num) => {
            error.push(num)
        }).finally(() =>{
            helper(++ptr)
        })
    }
    helper()
}


taskRunnerA2(tasks, (result, err) => console.log(result, err))



