const obj = {
  name: "John",
  age: 30,
  city: "New York",
  addr: ["chandpol", "avv"],
  // fn : () => {return "hello"},
  myUndefined: undefined,
  myNull: null,
  new: {
    name: "John",
    age: 30,
    city: "New York",
  },
};
// console.log("Correct", JSON.stringify(obj));
//string
//number ,boolean
//undefined , null, object, array

function myStrigify(val) {
  let str = "";
  if (typeof val === "string") {
    str += `"${val}"`;
  }
  if (typeof val === "number" || typeof val === "boolean") {
    str += `${val}`;
  } else if (
    val === Infinity ||
    val === -Infinity ||
    val === null ||
    val === undefined ||
    typeof val === "symbol"
  ) {
    str += null;
  } else if (Array.isArray(val)) {
    let newArr = val.map((ele) => myStrigify(ele)).toString();
    console.log(newArr);
    str += `[${newArr}]`;
  } else if (typeof val === "object") {
    str += "{";
    let keys = Object.keys(val);
    keys.forEach((key, index) => {
      str += `${key}:${myStrigify(val[key])}`;
      if (index !== keys.length - 1) {
        str += ",";
      }
    });
    str += "}";
  }
  return str;
}
const output = myStrigify(obj);



//Deep Clone
function deepCopy(obj) {
  const deepCopyR = (oldObj, newObj) => {
    let keys = Object.keys(oldObj);
    for (let key of keys) {
      const value = oldObj[key];

      if (typeof value === "object") {
        newObj[key] = { ...value };
        deepCopyR(value, newObj[key]);
      } else {
        newObj[key] = value
      }
      console.log(newObj);
    }
    return newObj
  };

  return deepCopyR(obj, {}); // Pass newObj as parameter
}

const originalObj = {
  name:"shubham",
  a: {
    b: {
      c: {
        d: 1,
      },
    },
  },
  e: {
    f: {
      g: { h: 2 },
    },
  },
};

const cloned = deepCopy(originalObj);

cloned.a.b.c.d = 5;

console.log("Cloned:", cloned);
console.log("Original after cloning:", originalObj);
