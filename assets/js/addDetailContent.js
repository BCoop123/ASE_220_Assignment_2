var mydata = [];
var mypictures = [];

async function fetchData() {
  // fetch data
  const response1 = await fetch("assets/data/data.json");
  const data1 = await response1.json();
  mydata = data1;

  // fetch pictures
  const response2 = await fetch("assets/data/pictures.json");
  const data2 = await response2.json();
  mypictures = data2;
}

(async function() {
  await fetchData();
  console.log(mydata);

  //initilize variables
  const numOfImages = 3;
  var validPage = true;
  var petCounter = 0;

  //assign data based on id
  var pet = getAllUrlParams().id;

  //error page for invalid pet id
  for (i = 0; i < mydata.length; i++) {
    if (parseInt(pet) != parseInt(mydata[i].id)) {
      petCounter++;
    }
    if (mydata.length == petCounter) {
      var errorInfo = `
      <h1>Page not found.</h1>
      `;
      validPage = false;
      document.querySelectorAll(".container")[1].innerHTML += errorInfo;
    }
  }

  if (validPage == true) {
    //changes pet to be the index of the pet in the json file based on the pet's id
    for (var i = 0; i < mydata.length; i++)
    if (parseInt(mydata[i].id) == pet) {
      pet = i;
    }

    //writes pet name and details to page
    var newInfo = `
    <h1>${mydata[pet].name}</h1>
    <div>
          Breed: ${mydata[pet].breed}<br>
          Fixed: ${mydata[pet].fixed}<br>
          Gender: ${mydata[pet].gender}<br>
          Age: ${mydata[pet].age}<br>
          ID: ${mydata[pet].id}<br>
          Vaccination status: ${mydata[pet].vacStatus}<br>
          Location: ${mydata[pet].location}<br>
          Available for adoption: ${mydata[pet].available}<br>
          Type: ${mydata[pet].type}<br>
          Additional details: ${mydata[pet].details}  
      </div>
    <hr />
    `;

    document.querySelectorAll(".container")[1].innerHTML += newInfo;

    //writes image header
    var imgHeader = `
    <h2>Image Gallery</h2>
    `;

    document.querySelectorAll(".container")[1].innerHTML += imgHeader;

    //writes images to page
    for (i = 0; i < numOfImages; i++) {
      var newImage = `
      <div class="col">
          <div class="card shadow-sm">
              <img src="${mypictures.image_links[pet]}" width="100%" height="225">
          </div>
      </div>
      `;

      document.querySelector(".row").innerHTML += newImage;
    }

    //Back button on details page in footer below
    page = parseInt(getAllUrlParams().page);
    var elements = document.getElementsByTagName("footer");
    elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px;">Back</button>`

    //Below Updates the Title of the page to reflect the pets name
    var elements = document.querySelectorAll("title");
    elements[0].innerHTML = `${mydata[pet].name} the ${mydata[pet].type}`;

    //changes background color depending on pet gender
    if (mydata[pet].gender.includes("Female")) {
    document.body.style.background = "#ffccff";
    }
    else if(mydata[pet].gender.includes("Male")){
    document.body.style.background = "#cceeff";
    }
  }
})();