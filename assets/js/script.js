var projects = [];

// Open Modal
$("#start-project").on("click", function () {
  $("#project-modal")[0].classList.add("is-active");
});

// Submit Button in Modal Clicked
$("#project-form-modal").click(function (event) {
  event.preventDefault();
  // get form values
  var projectTeammates = $("#modalTeammates").val();
  var projectCategory = $("#modalCategory").val();
  var projectBackstory = $("#modalBackstory").val();

  if (projectCategory != "Select One" && projectBackstory && projectTeammates) {
    // close modal
    $("#project-modal")[0].classList.remove("is-active");

    // save in projects array
    // projects.push({
    //   teammates: projectTeammates,
    //   category: projectCategory,
    //   backstory: projectBackstory
    // });
    randomUserCall(projectTeammates);
    apiSquaredCall(projectCategory);

    console.log(projectBackstory);
  } else alert("Please fill out all info!");
});

// Add additional click events to close modal
$(".modal-background, .modal-close").click(function (event) {
  event.preventDefault();

  $("#project-modal")[0].classList.remove("is-active");
});

var sampleRandomUsers = [
  {
    Name: "Willibald Mast",
    Age: 29,
    Username: "orangetiger890",
    Image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    Name: "Harry Guerin",
    Age: 45,
    Username: "yellowlion888",
    Image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    Name: "Tracey Steward",
    Age: 47,
    Username: "bigbutterfly197",
    Image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
];
var sampleApiChoices = [
  {
    Name: "RandomDog",
    Description: "Random pictures of dogs",
    Link: "https://random.dog/woof.json",
  },
  {
    Name: "Cat Facts",
    Description: "Daily cat facts",
    Link: "https://alexwohlbruck.github.io/cat-facts/",
  },
  {
    Name: "The Dog",
    Description:
      "A public service all about Dogs, free to use when making your fancy new App, Website or Service",
    Link: "https://thedogapi.com/",
  },
];

// select elements to display
var userEl = document.getElementById("user-tile");
var apiEl = document.getElementById("api-tile");
var storyEl = document.getElementById("story-tile");

// global variables
var randUserList = [];
var apiList = [];
var APIcount = 3;
var userCount = 4;
var choice = "business";
// Function to call API API
var apiSquaredCall = function (choice) {
  fetch("https://api.publicapis.org/entries?category=" + choice).then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.entries.length; i++) {
          var apiEntry = {
            Name: data.entries[i].API,
            Description: data.entries[i].Description,
            Link: data.entries[i].Link,
          };
          apiList.push(apiEntry);
        }
        var apiChoices = [];
        for (i = 0; i < APIcount; i++) {
          apiChoices.push(apiList[Math.floor(Math.random() * apiList.length)]);

          //add conditional to check for duplicates
        }
        displayApiChoices(apiChoices);
      });
    }
  });
};

var displayApiChoices = function (apiChoices) {
  apiEl.innerHTML = "";
  var titleEl = document.createElement("p");
  titleEl.classList = "title";
  titleEl.textContent =
    "These APIs are perfect for your " + choice + " project!";
  apiEl.appendChild(titleEl);
  for (let i = 0; i < apiChoices.length; i++) {
    var divEl = document.createElement("article");
    divEl.classList = "m-";
    var pHeadEl = document.createElement("p");
    var pSubEl = document.createElement("p");
    var aEl = document.createElement("a");
    aEl.setAttribute("href", apiChoices[i].Link);
    aEl.setAttribute("target", "_blank");
    pHeadEl.classList = "title";
    pHeadEl.innerHTML = apiChoices[i].Name;
    pSubEl.classList = "subtitle";
    pSubEl.textContent = apiChoices[i].Description;
    aEl.appendChild(pHeadEl);
    divEl.appendChild(aEl);
    divEl.appendChild(pSubEl);
    apiEl.appendChild(divEl);
  }
};

// Function to call random user
var randomUserCall = function (userCount) {
  fetch("https://randomuser.me/api/1.4/?results=" + userCount).then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.results.length; i++) {
          var randomUserEntry = {
            Name: data.results[i].name.first + " " + data.results[i].name.last,
            Age: data.results[i].dob.age,
            Username: data.results[i].login.username,
            Image: data.results[i].picture.large,
          };
          randUserList.push(randomUserEntry);
        }
        displayUserChoices(randUserList);
      });
    }
  });
};

var displayUserChoices = function (randUserList) {
  userEl.innerHTML = "";
  var titleEl = document.createElement("p");
  titleEl.classList = "title is-3";
  titleEl.textContent = "Meet your team!";
  userEl.appendChild(titleEl);
  for (let i = 0; i < randUserList.length; i++) {
    var mediaEl = document.createElement("div");
    mediaEl.classList =
      "media is-justify-content-center is-flex-direction-row-reverse";
    userEl.appendChild(mediaEl);
    var mediaLeftEl = document.createElement("div");
    mediaLeftEl.classList = "media-left";
    mediaEl.appendChild(mediaLeftEl);
    var figureEl = document.createElement("figure");
    figureEl.classList = "image is-64x64";
    mediaLeftEl.appendChild(figureEl);
    var imgEl = document.createElement("img");
    imgEl.classList = "is-rounded";
    imgEl.setAttribute("src", randUserList[i].Image);
    imgEl.setAttribute("alt", "profile image of" + randUserList[i].Name);
    figureEl.appendChild(imgEl);
    var mediaContentEl = document.createElement("div");
    mediaContentEl.classList = "media-content media-left";
    mediaEl.appendChild(mediaContentEl);
    var nameEl = document.createElement("p");
    nameEl.classList = "title is-5";
    nameEl.textContent = randUserList[i].Name;
    mediaContentEl.appendChild(nameEl);
    var usernameEl = document.createElement("p");
    usernameEl.classList = "subtitle is-6";
    usernameEl.textContent = "@" + randUserList[i].Username;
    mediaContentEl.appendChild(usernameEl);
  }
};

//API Calls - Use Sparingly
// randomUserCall(userCount);
// apiSquaredCall("Business");

// Display Samples - For Testing Purposes
// displayUserChoices(sampleRandomUsers);
// displayApiChoices(sampleApiChoices);
