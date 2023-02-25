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
  let numOfCards = 6;
  var index = 0;
  var name = "N/A";
  var id = 0;
  var picture;
  var type = "N/A";
  var back_page = 0;
  var numAvailable = 0;
  var validPage = true;
  var page = getAllUrlParams().page;

  //checks for index page without params
  if (page == undefined) {
    page = 1;
  }

  //counts the number of pets that are avialble for adoption
  for (i = 0; i < mydata.length; i++) {
    if (mydata[i].available == "yes"){
      numAvailable++;
    }
  }

  //error page for invalid index page
  if ((numAvailable < ((getAllUrlParams().page * numOfCards) - numOfCards)) && getAllUrlParams().page != NaN) {
    validPage = false;
  }

  if (validPage == true) {
    //gets the starting index for detail.json
    if (getAllUrlParams().page >= 2) {
      var i = 0;
      while (i < (getAllUrlParams().page - 1) * 6) {
        if(mydata[index].available.includes("yes")) {
          i++;
        }
        index++;
      }
    }
    else{
      index = 0;
    }
    //main loop that adds cards to document
    var counter = 0;
    while (counter < 6 && mydata[index + 1] ) {
      if(mydata[index].available.includes("yes")) {
        name = mydata[index].name;
        id = mydata[index].id.trim();
        picture = mypictures.image_links[index];
        type = mydata[index].type;
        gender = mydata[index].gender;
        breed = mydata[index].breed;
        age = mydata[index].age;
    //creates card template
        var newcard = `
        <div class="col">
          <div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top" src="${picture}" width="100%" height="225px">

            <div class="card-body">
              <p class="card-text">${name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" onclick="location.href = 'detail.html?page=${page}&id=${id}';" class="btn btn-sm btn-outline-secondary">View</button>
                  
                </div>
                <small class="text-muted px-3">${breed} - ${gender} - ${age}</small>
              </div>
            </div>
          </div>
        </div>
        `;
        document.querySelector(".row").innerHTML += newcard;
        counter++;
      }
      index++;
    }

    //logic for determing the page number of the next page and previous page
    var elements = document.getElementsByTagName("footer");
    if (getAllUrlParams().page > 1) {
      page = parseInt(getAllUrlParams().page) + 1;
      back_page = parseInt(getAllUrlParams().page) - 1;
    }
    else {
      var page = 2;
    }

    //adds the back button as long as the page is not the first page
    if (back_page > 0) {
      elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${back_page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px;">Previous</button>`
    }
    // again below is mainly just for the formating of the buttons so that they always exist in one place and dont shift
    else{
      elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${back_page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px; visibility:hidden;">Previous</button>`
    }

    //adds the next button to the page
    if (numAvailable >= (page * numOfCards) - numOfCards){
      elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px;">Next</button>`
    }

    // below is mainly just for the formating of the buttons so that they always exist in one place and dont shift
    else{
      elements[0].innerHTML += `<button type="button" onclick="location.href = 'index.html?page=${page}';" class="btn btn-sm btn-outline-secondary" style="margin: 20px; visibility:hidden;">Next</button>`
    }
  }
  else {
    var errorInfo = `
      <h1>Page not found.</h1>
      `;
      document.querySelector(".row").innerHTML += errorInfo;
  }
})();