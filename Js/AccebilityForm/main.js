const form = document.getElementById("myForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(e.target);
  const formData = new FormData(e.target);
  console.log(formData);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data); // Use this data for further processing
  form.reset(); // Reset the form after submission
});

function getData(form) {
    var formData = new FormData(form);
  
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    console.log(Object.fromEntries(formData));
  }
  
  document.getElementById("myForm1").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
  });
  
