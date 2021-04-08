const api = {
    key: "28fd15358cdecbc1a1dfef367e71acef",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const error = document.querySelector(".error");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {
    // console.log(response);
    if (response.cod === "404") {
        error.textContent = "Por Favor coloque uma cidade válida";
        search.value = "";
        

    } else {
        error.textContent = "";
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;
        

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Clima: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Faixa Temp: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction(d){
    let meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Agos","Set","Out","Nov","Dez"]
    let dias = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]

    let dia = dias[d.getDay()];
    let data = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia}  ${data}, ${mes} , ${ano} `;
}