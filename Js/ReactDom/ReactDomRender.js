const dom = {
    type: 'div',
    props: { id: 'abc' },
    children: [{ type: 'h1', children: 'HELLO' }]
};
  
const rootEle = document.getElementById("root");

const renderDom = (dom) => {
  const {type, props, children} = dom;
  const ele = document.createElement(`${type}`);
  if(props) {
    for(let prop in props) {
      ele.setAttribute(prop, props[prop])
    }
  }

  if(Array.isArray(children) ) {
    const docFragment = document.createDocumentFragment(); 

    for(let child of children) {
      docFragment.appendChild(renderDom(child));
    }
    ele.appendChild(docFragment);
  } else if(typeof children === "string"){
    ele.textContent = children
  }
  return ele

}

rootEle.appendChild(renderDom(dom))
