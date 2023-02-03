const city = document.querySelector(".city-input");
const submitBtn = document.querySelector("#btn");
const cities = document.querySelector(".cities");
const form = document.querySelector(".form");
const message = document.querySelector(".message");

let newCityInput = city.value.trim("");

let cityArr = [];

document.addEventListener("submit", (e) => {
  e.preventDefault();

  city.focus();

  // console.log(cityInput);
  getDatas();
  form.reset();
});

const getDatas = async () => {
  let cityInput = city.value.trim();

  !isNaN(cityInput);
  const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  try {
    const responsive = await fetch(url);
    if (!responsive.ok) {
      throw new Error("There is an error here!!!");
    }
    const data = await responsive.json();
    console.log(data);
    getValues(data);
  } catch (error) {
    if (city.value === "") {
      message.innerText = `Please enter a city name`;
      // message.classList.toggle("message")
      setTimeout(() => {
        message.innerText = "";
      }, 2000);
    } else {
      console.log(error);
    }
  }

  //todo fetch
};

const getValues = (value) => {
  const Country = value.sys.country;
  const mainTemp = Math.round(value.main.temp);
  const cityId = value.id;
  const city = value.name;
  const WeatherDesc = value.weather[0].description;
  const Image = value.weather[0].icon;
  const cities = document.querySelector(".cities");

  if (cityArr.includes(cityId)) {
    message.innerText = `You have checked this city before`;
    // message.classList.toggle("message")
    setTimeout(() => {
      message.innerText = "";
    }, 2000);
  } else {
    // cityArr.push(cityId)  or

    cityArr = [cityId, ...cityArr];

    cities.innerHTML += `
    <li class="card col-xs-6 col-sm-4 col-md-4 col-lg-2  g-6 me-4 mt-4 bg-primary">
    <img src="./img/${Image}.png" class="card-img-top text-light" alt="photo">
    <div class="card-body s  text-light">
      <h2 class="card-title">${city} <sup class="country  text-bg-warning p-1">${Country}</sup></h2>
      <h1 class="card-text display-1">${mainTemp} <sup>°C</sup></h1>
      <h4>${WeatherDesc}</h4>
    </div>
  </li>
  
  `;
    message.innerText = "";
  }
};
