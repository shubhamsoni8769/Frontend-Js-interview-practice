function taskA(done) {
    console.log("Task A Completed");
    done();
  }
  function taskB(done) {
    setTimeout(function () {
      console.log("Task B Completed");
      done();
    }, 2000);
  }
  function taskC(done) {
    setTimeout(function () {
      console.log("Task C Completed");
      done();
    }, 200);
  }
  function taskD(done) {
    console.log("Task D Completed");
    done();
  }
  function taskE(done) {
    console.log("Task E Completed");
    done();
  }
   
  const asyncGraph = {
    e: {
      dependency: ["c", "d"],
      task: taskE,
    },
    c: {
      task: taskC,
    },
   
    d: {
      dependency: ["a", "b"],
      task: taskD,
    },
    a: {
      task: taskA,
    },
    b: {
      task: taskB,
    },
  };

  
  function runAsyncGraph(list){
    const graph = Object.keys(list);
    const isVisited = new Set();
    const adList = new Map();
    const indegree = new Map();
    const result = []
   
    for(let u of graph){
      let {dependency} = list[u];
      for(let v of (dependency || []) ){
        let arr = adList.get(v) || [];
        arr.push(u);
        adList.set(v, arr);
      }
      indegree.set(u, dependency ? dependency.length : 0)
    }
    console.log(adList,indegree)
   
    for(let key of graph){
      if(indegree.get(key) === 0 && !isVisited.has(key) ){
        traverseAdjNode(key)
      }
    }
   
    function traverseAdjNode(key){
      console.log(key)
      isVisited.add(key);
      result.push(key);
      let adjNode = adList.get(key);
      for(let node of (adjNode || [])){
        indegree.set(node, indegree.get(node)-1 );
        if(indegree.get(node) === 0 && !isVisited.has(node) ){
          traverseAdjNode(node)
        }
      }
    }
    return result
  }
  const list = runAsyncGraph(asyncGraph);
  console.log(list)