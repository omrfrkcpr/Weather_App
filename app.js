/* ---------------------------------- */
/*              Initials              */
/* ---------------------------------- */
let cities = [];

/* ---------------------------------- */
/*             Selectors              */
/* ---------------------------------- */
const enterBtn = document.querySelector(".btn");
const inputText = document.querySelector("form input");
const messagePar = document.querySelector(".message");
const appTitle = document.querySelector("center h1");
let lang = "en";

/* ---------------------------------- */
/*                 API                */
/* ---------------------------------- */
const getWeather = async (cityName) => {
  try {
    console.log("City Name:", cityName); // For checking city name
    const API_KEY = "19fadf383f77445c7ead85a8d7ccce88";
    const fetchAPI = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${lang}&appid=${API_KEY}`
    );
    if (!fetchAPI.ok) {
      throw new Error(`"${cityName}" Not Found!`);
    }
    const cityWeather = await fetchAPI.json();
    console.log("Response from API: ", cityWeather); // For checking API Response
    showOnScreen(cityWeather);
  } catch (error) {
    if (lang == "de") {
      messagePar.textContent = `Stadt nicht gefunden`;
    } else {
      messagePar.textContent = `City Not Found!`;
    }
    console.error("Error:", error.message);
    setTimeout(() => {
      messagePar.classList.replace("d-block", "d-none");
    }, 3000);
  }
};

/* ---------------------------------- */
/*           Event Listeners          */
/* ---------------------------------- */
inputText.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault(); // prevent form submiting
    const cityName = capitalizeFirstLetter(inputText.value);
    console.log("Key `Enter` Pressed => City name:", cityName); // For checking city name (onkeypress)
    getWeather(cityName);
    inputText.value = "";
  }
});

enterBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form submiting
  const cityName = capitalizeFirstLetter(inputText.value);
  console.log("Clicked on button. City name:", cityName); // For checking city name (onclick)
  getWeather(cityName);
  inputText.value = "";
});

// change language
const langEN = document.querySelector(".en");
langEN.onclick = () => {
  lang = "en";
  appTitle.innerHTML = `<img src="assets/weather-logo.png" alt="weather-logo" style="width: 30px;" class="mb-1">
  Weather App</h1>`;
  inputText.setAttribute("placeholder", "Search for a city");
  document.querySelector(
    ".bottom-container"
  ).innerHTML = `<small>Coded by <span>❤</span> omrfrkcpr</a>
  </small>`;
};

const langDE = document.querySelector(".de");
langDE.onclick = () => {
  lang = "de";
  appTitle.innerHTML = `<img src="assets/weather-logo.png" alt="weather-logo" style="width: 30px;" class="mb-1">
  Wetter App</h1>`;
  inputText.setAttribute("placeholder", "Suche nach einer Stadt");
  document.querySelector(
    ".bottom-container"
  ).innerHTML = `<small>Codiert von <span>❤</span> omrfrkcpr</a>
  </small>`;
};

/* ---------------------------------- */
/*              Functions             */
/* ---------------------------------- */
const showOnScreen = (cityWeather) => {
  const iconSrc = cityWeather.weather[0].icon
    ? `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${cityWeather.weather[0].icon}.svg`
    : "assets/404.png";
  // const iconSrc = cityWeather.weather[0].icon
  //   ? `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`
  //   : "assets/404.png";

  console.log("City Weather on Screen:", cityWeather); // For checking city Weather on Screen
  const citiesUl = document.querySelector(".cities");
  const { name, main, weather, sys } = cityWeather;

  if (cities.indexOf(name) == -1) {
    citiesUl.innerHTML =
      `
      <li class="list-unstyled bg-warning p-1 pt-1 rounded-4 mb-1 d-flex flex-column justify-content-between align-items-between">
          <div class="text-end mb-1">
              <button class="remove border-0 bg-warning px-1"><i class="fa fa-times" aria-hidden="true"></i>
              </button>
          </div>
          <div class="d-flex text-center city-info justify-content-center">
              <h2 class="text-secondary">${name}</h2>
              <p class="bg-warning-subtle h-50 rounded-3 px-1 text-black">${
                sys.country
              }</p>
              </div>
          <div class="city-temperature display-5 fw-bold text-center d-flex justify-content-center">
              <span class="temperature">${main.temp.toFixed(0)}</span>
              <span class="unit">°C</span>
          </div>
          <div class="weather-info text-center text-secondary justify-content-center">
              <div class="icon">
                  <img src=${iconSrc} alt="" style="width: 100px;">
              </div>
              <div class="description mb-2">${
                weather[0].description.toUpperCase()
                  ? weather[0].description.toUpperCase()
                  : "No Description!"
              }</div>
          </div>
      </li>
      ` + citiesUl.innerHTML;
    cities.push(name);
    console.log(cities);
  } else {
    if (lang == "de") {
      messagePar.textContent = "Sie kennen dieses Wetter bereits";
    } else {
      messagePar.textContent = "You already know this city weather";
    }
    setTimeout(() => {
      messagePar.classList.replace("d-block", "d-none");
    }, 5000);
  }

  // ------------------------------------------------------------------

  // const newLi = document.createElement("li");
  // newLi.classList.add(
  //   "list-unstyled",
  //   "bg-warning",
  //   "p-3",
  //   "pt-2",
  //   "rounded-4",
  //   "mb-2"
  // );

  // // İçerisine alt öğeleri ekle
  // const div1 = document.createElement("div");
  // div1.classList.add("text-end", "mb-1");

  // const removeBtn = document.createElement("button");
  // removeBtn.classList.add("remove", "border-0", "bg-warning", "px-1");
  // removeBtn.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  // div1.appendChild(removeBtn);

  // newLi.appendChild(div1);

  // const div2 = document.createElement("div");
  // div2.classList.add(
  //   "d-flex",
  //   "text-center",
  //   "justify-content-center",
  //   "city-info"
  // );

  // const h2 = document.createElement("h2");
  // h2.classList.add("text-secondary");
  // h2.textContent = name;
  // div2.appendChild(h2);

  // const p = document.createElement("p");
  // p.classList.add(
  //   "bg-warning-subtle",
  //   "h-50",
  //   "rounded-3",
  //   "px-1",
  //   "text-black"
  // );
  // p.textContent = sys.country;
  // div2.appendChild(p);

  // newLi.appendChild(div2);

  // const div3 = document.createElement("div");
  // div3.classList.add(
  //   "city-temperature",
  //   "display-5",
  //   "fw-bold",
  //   "text-center",
  //   "justify-content-center",
  //   "d-flex"
  // );

  // const tempSpan = document.createElement("span");
  // tempSpan.classList.add("temperature", "text-center");
  // tempSpan.textContent = main.temp.toFixed(0);
  // div3.appendChild(tempSpan);

  // const unitSpan = document.createElement("span");
  // unitSpan.classList.add("unit", "text-center");
  // unitSpan.textContent = "°C";
  // div3.appendChild(unitSpan);

  // newLi.appendChild(div3);

  // const div4 = document.createElement("div");
  // div4.classList.add("weather-info", "text-center", "text-secondary");

  // const iconDiv = document.createElement("div");
  // iconDiv.classList.add("icon");
  // const iconImg = document.createElement("img");
  // iconImg.src = iconSrc;
  // iconImg.alt = "";
  // iconImg.style.width = "100px";
  // iconDiv.appendChild(iconImg);
  // div4.appendChild(iconDiv);

  // const descDiv = document.createElement("div");
  // descDiv.classList.add("description");
  // descDiv.textContent = weather[0].description.toUpperCase()
  //   ? weather[0].description.toUpperCase()
  //   : "No Description!";
  // div4.appendChild(descDiv);

  // newLi.appendChild(div4);

  // citiesUl içerisine yeni li öğesini ekle
  // const citiesUl = document.querySelector(".cities");
  // const firstLi = citiesUl.firstChild; // listenin ilk öğesini al
  // citiesUl.insertBefore(newLi, firstLi); // yeni öğeyi ilk öğenin öncesine ekle

  // -------------------------------------------------------------------

  // remove closest li after clicking on remove button
  document.querySelectorAll(".remove").forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      const removedLi = e.target.closest("li");

      //remove from cities array
      cities.splice(
        cities.indexOf(removedLi.querySelector("h2").textContent),
        1
      );
      console.log(cities);

      // remove from screen (ul)
      removedLi.remove();
    });
  });
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
