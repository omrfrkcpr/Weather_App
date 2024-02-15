/* ---------------------------------- */
/*              Initials              */
/* ---------------------------------- */
const enterBtn = document.querySelector(".btn");
const inputText = document.querySelector("input");

/* ---------------------------------- */
/*                 API                */
/* ---------------------------------- */
const getWeather = async (cityName) => {
  try {
    console.log("City Name:", cityName); // For checking city name
    let lang = "en";
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

    if (cityWeather.weather[0].description == "broken clouds") {
      const newSource = "assets/cloudy.mp4";
      document.querySelector("source").src = newSource;
    }
  } catch (error) {
    console.error("Hata:", error.message);
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

enterBtn.addEventListener("click", () => {
  const cityName = capitalizeFirstLetter(inputText.value);
  console.log("Clicked on button. City name:", cityName); // For checking city name (onclick)
  getWeather(cityName);
  inputText.value = "";
});

/* ---------------------------------- */
/*              Functions             */
/* ---------------------------------- */
const showOnScreen = (cityWeather) => {
  const iconSrc = cityWeather.weather[0].icon
    ? `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`
    : "assets/404.png";

  console.log("City Weather on Screen:", cityWeather); // For checking city Weather on Screen
  const citiesUl = document.querySelector(".cities");
  const { name, main, weather, sys } = cityWeather;
  citiesUl.innerHTML =
    `
    <li class="list-unstyled bg-warning p-3 pt-2 rounded-4 mb-2">
        <div class="text-end mb-1">
            <button class="remove border-0 bg-warning px-1"><i class="fa fa-times" aria-hidden="true"></i>
            </button>
        </div>
        <div class="d-flex text-start city-info">
            <h2 class="text-secondary">${name}</h2>
            <p class="bg-warning-subtle h-50 rounded-3 px-1 text-black">${
              sys.country
            }</p>
            </div>
        <div class="city-temperature display-5 fw-bold text-start d-flex">
            <span class="temperature">${main.temp.toFixed(0)}</span>
            <span class="unit">°C</span>
        </div>
        <div class="weather-info text-start text-secondary">
            <div class="icon">
                <img src=${iconSrc} alt="" style="width: 100px;">
            </div>
            <div class="description">${
              weather[0].description.toUpperCase()
                ? weather[0].description.toUpperCase()
                : "No Description!"
            }</div>
        </div>
    </li>
    ` + citiesUl.innerHTML;

  // remove closest li after clicking on remove button
  document.querySelectorAll(".remove").forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      e.target.closest("LI").remove();
    });
  });
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
