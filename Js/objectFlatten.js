const user = {
  name: "Vishal",
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross: "32",
      },
    },
  },
  phones: [
    { type: "home", number: "1234567890" },
    { type: "work", number: "0987654321" },
  ],
};

const flatObjectHelper = (obj, prefix, result) => {
  const helperFn = (obj, prefix) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = `${prefix}_${key}`;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          helperFn(obj[key], newKey);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((ele, index) => {
            helperFn(ele, `${newKey}_${index}`);
          });
        } else {
          result[newKey] = obj[key];
        }
      }
    }
  };
  helperFn(obj, prefix);
};

const flatObject = (obj) => {
  const result = {};
  for (let key in obj) {
    flatObjectHelper(obj[key], key, result);
  }
  return result;
};

const flattened = flatObject({ user });
console.log(flattened);
