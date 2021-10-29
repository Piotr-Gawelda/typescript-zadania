export class App {
    opwApiKey = '7cf6da23f61dff7703a2d327a9298c7d';
    constructor() {
        const searchButton = document.querySelector("#search");
        searchButton.addEventListener("click", () => {
            this.getCityInfo()
        });
        this.getData();
    }

    async getCityInfo() {
        const city = document.querySelector("#city") as HTMLInputElement;
        const weather = await this.getWeather(city.value);
        if (weather) {
            this.displayData(weather);
            this.saveData(weather);
        }
    }

    async getWeather(city: string): Promise < any > {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}&units=metric`;
        const weatherResponse = await fetch(openWeatherUrl);
        if (weatherResponse.status === 200) {
            const weatherData = await weatherResponse.json();
            return weatherData;
        }
        return null;
    }

    displayData(data: any) {
        const template = `<div class="city-name">${data.name}</div><div class="weather">${data.weather[0].main}</div><div class="sub-info"><div class="temperature">${data.main.temp}&#176;C</div><div class="sub-info-2"><div>Ciśnienie</div><div>${data.main.pressure} hPA</div><hr><div>Wilgotność</div><div>${data.main.humidity} %</div></div></div>`;
        const container = document.querySelector("#weather-container");
        const elem = document.createElement("div");
        elem.classList.add("weather-box");
        elem.innerHTML = template.trim();
        container.prepend(elem);
    }

    saveData(data: any) {
        const weathers = localStorage.getItem('weatherData');
        var weathersObj = [];
        if (weathers) {
            weathersObj = JSON.parse(weathers) as any[];
        }
        weathersObj.push(data);
        localStorage.setItem('weatherData', JSON.stringify(weathersObj));
    }

    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            const weathersObj = JSON.parse(data) as any[];
            weathersObj.forEach(x => {
                this.displayData(x);
            });
        }
    }
}