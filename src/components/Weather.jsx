import "./Home.css"
import { useState } from "react"
import axios from "axios"
import { WiDaySunny } from "react-icons/wi"
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";

function Weather(){
    const [city,setcity] = useState("")
    
    const [name,setname] = useState("")
    const [country,setcountry] = useState("")
    const [desc,setdesc] = useState("")
    const [icon,seticon] = useState("")
    const [tempC,settempC] = useState("")
    const [feel,setfeel] = useState("")
    const [humidity,sethumidity] = useState("")
    const [wspeed,setwspeed] = useState("")
    const [wdeg,setwdeg] = useState("")
    const [pressure,setpressure] = useState("")
    const [mainWeather, setMainWeather] = useState("");
    const [forecast, setForecast] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    


    function handleCity(evt){
        setcity(evt.target.value)
        setError("");
        setHasData(false); 
    }

    function getWeather() {
        if (!city.trim()) {
          setError("Please enter a city name");
          return;
        }
        setLoading(true);
        setError("");

        axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0c1879a82c3c95090d6b265e3dfb0cc`
        )
          .then(function (success) {
            const data = success.data;

            setname(data.name);
            setcountry(data.sys.country);
            setdesc(data.weather[0].description);
            seticon(data.weather[0].icon);
            settempC((data.main.temp - 273.15).toFixed(0));
            setfeel((data.main.feels_like - 273.15).toFixed(0));
            sethumidity(data.main.humidity);
            setwspeed(data.wind.speed);
            setwdeg(data.wind.deg);
            setpressure(data.main.pressure);
            setMainWeather(data.weather[0].main);
            setError("");
            getForecast();
            setHasData(true);
          })
          .catch(function (err) {
            setError("⚠️ City not found or API failed. Try again.");
            setHasData(false);
            setForecast([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }

    function getForecast() {
      axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f0c1879a82c3c95090d6b265e3dfb0cc`
      )
    .then(res => {
      const list = res.data.list;

      const dailyData = list.filter((_, index) => index % 8 === 0);

      const formatted = dailyData.map(item => ({
        date: new Date(item.dt_txt).toLocaleDateString("en-IN", {
          weekday: "short"
        }),
        temp: Math.round(item.main.temp - 273.15)
      }));

      setForecast(formatted);
      })
      .catch(() => {
        setError("⚠️ Failed to load forecast data");
        setForecast([]);
      });
  }


    function getAdvice(temp, weather) {
        if (temp > 35) return "Stay hydrated 🥤";
        if (weather === "Rain") return "Carry umbrella ☔";
        if (weather === "Clouds") return "Good day for a walk 🌿";
        if (weather === "Clear") return "Enjoy the sunshine ☀️";
        return "Have a great day 😊";
    }

    function getAlert(temp, wind, weather) {
        if (temp > 40) return "⚠️ Heat Alert";
        if (wind > 10) return "⚠️ Strong Wind";
        if (weather === "Rain") return "⚠️ Heavy Rain Expected";
        return"😊 No alerts! you're safe to go :)";
    }

    return(
        <div className="home">

            <nav className="bg-white my-10 mx-15 p-5 rounded-2xl">
              <p className="text-[#0069A8] text-xs uppercase pb-1 font-semibold">live  weather</p>
              <h1 className="text-[#052F4A] text-3xl font-bold">Weather Verse Dashboard</h1>
              <p className="text-[#024A70] text-sm mt-2">This weather app gives live city climate updates with a clean, responsive dashboard.</p>
            </nav>

            <main className="bg-white my-5 mx-15 p-10 rounded-2xl">
                <p className="text-[#0069A8] font text-xs uppercase pb-1 font-semibold">search city</p>
                <h1 className="text-[#052F4A] text-2xl font-bold">Check Weather Instantly</h1>
                <p className="text-[#024A70]">Enter a city name to view current temperature and key weather conditions.</p>

                <div className="border border-gray-300 rounded p-5 mt-5" >
                <h2 className="text-[#024A70] text-lg font-semibold mb-2">Search for a Weather Report</h2>
                <input onChange={handleCity} className="border border-gray-300 p-2 rounded-lg w-[80%] mr-5 placeholder:text-sm placeholder:text-[#a3a3a4] focus:ring-1 focus:ring-blue-100 focus:outline-none" type="text" placeholder="Enter City Name  (e.g Ooty)">
                </input>
                <button onClick={getWeather} disabled={loading || !city.trim()} className="bg-[#286eca] hover:bg-[rgb(31,90,166)] p-2 rounded-lg text-white mb-5">
                  {loading ? "Fetching weather..." : "Get Weather Report"}
                </button>

    {error ? (
      <div className="text-center text-red-500 font-semibold">
        {error}
      </div>
    ): !hasData ? (
    <div>
      <p className="text-center text-5xl animate-bounce mt-10">☁️</p>
      <p className="text-[#024A70] text-xl font-semibold text-center">
        No weather data yet
      </p>
      <p className="text-[#024A70] text-center mb-12">
        Search for a city to view temperature, conditions, and atmospheric metrics in this dashboard.
      </p>
    </div>) :
    (
      <div className="flex flex-col gap-10 px-5">
        <div className="flex justify-between">

            <div>
            <p className="text-[#0069A8] text-xs uppercase pb-1 mt-5 mb-3 font-semibold">current conditions</p>
            <h1 className="text-[#052F4A] text-4xl mb-2 font-bold">{name}, {country}</h1>
            <p className="text-[#024A70] text-lg">{desc}</p>
            </div>

            <div className="flex gap-10">
            <div className=" flex items-center bg-[#F0F9FF] rounded-lg pl-10 p-2">   
            <div className="items-center justify-center">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather" className="w-20 h-20"/>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[#052F4A] text-7xl font-semibold">{tempC}°C</h1>
              <p className="text-[#024A70] text-sm mt-3">Feels like {feel}°C</p></div>
            </div>

            <div className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-5 rounded-xl hover:scale-105 transition">
            <p className="text-[#0069A8] font-semibold text-left text-xs uppercase mb-4">Smart Weather Advisor</p>
            <p className="text-[#024A70] mb-2">{getAdvice(Number(tempC), mainWeather)}</p>
            <p className="text-[#024A70]">{getAlert(Number(tempC), wspeed, mainWeather)}</p>
            </div></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-5 rounded-xl  hover:scale-105 transition">
            <p className="text-[#0069A8] font-semibold text-xs uppercase mb-1">Humidity</p>
            <p className="text-[#052F4A] font-bold text-xl">{humidity} %</p>
            </div>

            <div className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-5 rounded-xl hover:scale-105 transition">
            <p className="text-[#0069A8] font-semibold  text-xs uppercase mb-1">Wind Speed</p>
            <p className="text-[#052F4A] font-bold text-xl">{wspeed} m/s</p>
            </div>

            <div className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-5 rounded-xl hover:scale-105 transition">
            <p className="text-[#0069A8] font-semibold  text-xs uppercase mb-1">Wind Deg</p>
            <p className="text-[#052F4A] font-bold text-xl">{wdeg} °</p>
            </div>

            <div className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-5 rounded-xl hover:scale-105 transition">
            <p className="text-[#0069A8] font-semibold text-xs uppercase mb-1">Pressure</p>
            <p className="text-[#052F4A] font-bold text-xl">{pressure} hPa</p>
            </div>
            </div>

        <div className=" bg-[#e7f4fd] p-5 rounded-xl border border-[#bcd5e7]">

        <h2 className="text-[#052F4A] text-xl font-semibold mb-5">
          5-Day Temperature Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}°C`} />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#0284c7" 
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

            
        </div>)}
        </div>
    </main>
    </div>
    )
}

export default Weather