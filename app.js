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
  } catch (error) {
    console.error("Error:", error.message);
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
  //   const citiesUl = document.querySelector(".cities");
  const { name, main, weather, sys } = cityWeather;
  //   citiesUl.innerHTML =
  //     `
  //     <li class="list-unstyled bg-warning p-3 pt-2 rounded-4 mb-2">
  //         <div class="text-end mb-1">
  //             <button class="remove border-0 bg-warning px-1"><i class="fa fa-times" aria-hidden="true"></i>
  //             </button>
  //         </div>
  //         <div class="d-flex text-start city-info">
  //             <h2 class="text-secondary">${name}</h2>
  //             <p class="bg-warning-subtle h-50 rounded-3 px-1 text-black">${
  //               sys.country
  //             }</p>
  //             </div>
  //         <div class="city-temperature display-5 fw-bold text-start d-flex">
  //             <span class="temperature">${main.temp.toFixed(0)}</span>
  //             <span class="unit">°C</span>
  //         </div>
  //         <div class="weather-info text-start text-secondary">
  //             <div class="icon">
  //                 <img src=${iconSrc} alt="" style="width: 100px;">
  //             </div>
  //             <div class="description">${
  //               weather[0].description.toUpperCase()
  //                 ? weather[0].description.toUpperCase()
  //                 : "No Description!"
  //             }</div>
  //         </div>
  //     </li>
  //     ` + citiesUl.innerHTML;
  // Yeni bir li öğesi oluştur

  const newLi = document.createElement("li");
  newLi.classList.add(
    "list-unstyled",
    "bg-warning",
    "p-3",
    "pt-2",
    "rounded-4",
    "mb-2"
  );

  // İçerisine alt öğeleri ekle
  const div1 = document.createElement("div");
  div1.classList.add("text-end", "mb-1");

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove", "border-0", "bg-warning", "px-1");
  removeBtn.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  div1.appendChild(removeBtn);

  newLi.appendChild(div1);

  const div2 = document.createElement("div");
  div2.classList.add("d-flex", "text-start", "city-info");

  const h2 = document.createElement("h2");
  h2.classList.add("text-secondary");
  h2.textContent = name;
  div2.appendChild(h2);

  const p = document.createElement("p");
  p.classList.add(
    "bg-warning-subtle",
    "h-50",
    "rounded-3",
    "px-1",
    "text-black"
  );
  p.textContent = sys.country;
  div2.appendChild(p);

  newLi.appendChild(div2);

  const div3 = document.createElement("div");
  div3.classList.add(
    "city-temperature",
    "display-5",
    "fw-bold",
    "text-start",
    "d-flex"
  );

  const tempSpan = document.createElement("span");
  tempSpan.classList.add("temperature");
  tempSpan.textContent = main.temp.toFixed(0);
  div3.appendChild(tempSpan);

  const unitSpan = document.createElement("span");
  unitSpan.classList.add("unit");
  unitSpan.textContent = "°C";
  div3.appendChild(unitSpan);

  newLi.appendChild(div3);

  const div4 = document.createElement("div");
  div4.classList.add("weather-info", "text-start", "text-secondary");

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");
  const iconImg = document.createElement("img");
  iconImg.src = iconSrc;
  iconImg.alt = "";
  iconImg.style.width = "100px";
  iconDiv.appendChild(iconImg);
  div4.appendChild(iconDiv);

  const descDiv = document.createElement("div");
  descDiv.classList.add("description");
  descDiv.textContent = weather[0].description.toUpperCase()
    ? weather[0].description.toUpperCase()
    : "No Description!";
  div4.appendChild(descDiv);

  newLi.appendChild(div4);

  // citiesUl içerisine yeni li öğesini ekle
  const citiesUl = document.querySelector(".cities");
  const firstLi = citiesUl.firstChild; // listenin ilk öğesini al
  citiesUl.insertBefore(newLi, firstLi); // yeni öğeyi ilk öğenin öncesine ekle

  // remove closest li after clicking on remove button
  document.querySelectorAll(".remove").forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      const removedLi = e.target.closest("li");

      const videoElement = document.querySelector("video");

      const nextSiblingLi = removedLi.nextElementSibling;

      if (nextSiblingLi) {
        const nextSiblingDesc = nextSiblingLi.querySelector(".description");
        if (nextSiblingDesc) {
          const catchRemoveSrc = nextSiblingDesc.textContent;
          console.log(catchRemoveSrc);
          updateVideoSrc(catchRemoveSrc, videoElement);
        }
      }

      removedLi.remove();
    });
  });

  function updateVideoSrc(description, videoElement) {
    if (description.includes("CLOUDS")) {
      videoElement.src = "assets/cloudy.mp4";
    } else if (description.includes("CLEAR")) {
      videoElement.src = "assets/sunny.mp4";
    } else if (description.includes("RAIN")) {
      videoElement.src = "assets/rainy.mp4";
    } else if (description.includes("SNOW")) {
      videoElement.src = "assets/snowy.mp4";
    } else if (description.includes("MIST") || description.includes("FOG")) {
      videoElement.src = "assets/mist.mp4";
    }
  }

  changeVideoSrc();
  function changeVideoSrc() {
    const checkDesc = weather[0].description.toUpperCase();
    const videoElement = document.querySelector("video");

    if (checkDesc.includes("CLOUDS")) {
      videoElement.src = "assets/cloudy.mp4";
    } else if (checkDesc.includes("CLEAR")) {
      videoElement.src = "assets/sunny.mp4";
    } else if (checkDesc.includes("RAIN")) {
      videoElement.src = "assets/rainy.mp4";
    } else if (checkDesc.includes("SNOW")) {
      videoElement.src = "assets/snowy.mp4";
    } else if (checkDesc.includes("MIST") || checkDesc.includes("FOG")) {
      videoElement.src = "assets/mist.mp4";
    }
  }
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
