const findEquivalentDomEle =(root1, root2,target) => {
    if(root1 === target) return root2;

    const children1 = root1.children;
    const children2 = root2.children;

    for(let i=0; i<children1.length; i++  ) {
        if(children1[i] && children2[i]){
            const result =  findEquivalentDomEle(children1[i], children2[i], target);
            if(result) return result
        }
    }
    return null
}
const result = findEquivalentDomEle(
    document.getElementById("root1"),
    document.getElementById("root2"),
    document.getElementById("span-by-id")
)
console.log(result);