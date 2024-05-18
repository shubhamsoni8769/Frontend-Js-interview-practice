const circuitBreaker = ( limit,maxFailureCount, timeThroshold ) => {
    let failure = 0;
    let timeSinceLastFailure = 0;
    let isClosed = false
    return function(...args) {

        if(isClosed) {
            if(Date.now() - timeSinceLastFailure > timeThroshold) {
                isClosed = false
            } else{
                console.log("Service unavailable");
                return;
            }
        
        }
            
        try {
           
            const result = fn(...args);
            failure = 0;
            return result

        } catch (e) {
            failure++;
            timeSinceLastFailure = Date.now();
            console.error("Error");
            if(failure >=  maxFailureCount) {
                isClosed = true
            }
        }
    }
}

const testFunction = () => {
    let count = 0;
    
    return function(){
      count++;
      if(count < 4){
        throw "failed";
      }else{
        return "hello";
      }
    }
  };
  
  
  let t = testFunction();
  let c = circuitBreaker(t, 3, 200);
  
  c();
  c();
  c();
  c();
  c();
  c();
  c();
  c();
  setTimeout(() => {console.log(c());}, 500);