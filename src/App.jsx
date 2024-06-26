import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const [data , setData] = useState({});
  const [location , setLocation] = useState("Pune");
  const [imgUrl , setImgUrl] = useState("10d");
  // const [error , setError] = ("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
  const handleSearch = async() => {
    if(!location){
      toast.error("City name should not  be empty");
      return;
    }
    try {
      const response = await axios.get(url);
      setData(response.data)

      if (response.data.weather && response.data.weather[0]) {
        setImgUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      }console.log(response.data)
      console.log("Data" , data.name )
    } catch (error) {
      toast.error('City not found. Please enter a valid city name.');
      console.log("Error Fetching the data" , error);
    }
};


  useEffect(() => {
    handleSearch();
  }, [])
  
 

  const handleClick = async () => {
    setLocation('')
    await handleSearch();
  }

  return (
    <div className='app flex flex-col gap-14 text-white font-montserrat max-h-screen '>
        <div className='flex  justify-center items-center pt-11 gap-2 lg:pt-7'>
            <input className='bg-slate-400 p-2 text-black w-60 h-9 lg:w-96 lg:h-10 rounded-2xl' placeholder="Enter City" type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className='bg-blue-600 p-2 rounded-lg ' onClick={handleClick}>Search</button>
        </div>
      
            <div className='flex flex-row items-center'>
              <div className='p-5 lg:pl-20 font-semibold text-5xl flex flex-col gap-5  '>
              <span className="block">{data.name}</span>
              <span className="block text-5xl lg:text-8xl">{data.main ? data.main.temp : "  "}°C</span>
              </div>
              <div className='ml-auto'>
                  <p className='rotate-90 mt-48 text-2xl lg:font-semibold lg:text-5xl font-medium'>
                    {data.weather ?data.weather[0]?.main : ""}
                  </p> 
              </div>
            </div>


          <div className='flex flex-col m-auto justify-center items-center gap-10'>
            <div className="flex flex-row items-center justify-center">
                <img src={imgUrl}  />
                <p>{data.weather ? data.weather[0].description.toUpperCase() : " "}</p>
            </div>

            <div>
                  <div className='flex flex-row font-medium text-lg m-auto gap-8 lg:gap-20 bg-slate-700 p-5 rounded-lg lg:p-5  '>
                  <div className='flex flex-col justify-center items-center'>
                      <p>{data.main ? data.main.feels_like : ""}</p>
                      <p>Feels Like</p>
                  </div> 
                  <div className='flex flex-col justify-center items-center'>
                      <p>{data.main ? data.main.humidity : ""}%</p>
                      <p>Humidity</p>
                  </div> 
                  <div className='flex flex-col justify-center items-center'>
                      <p>{data.wind ? data.wind.speed : ""} MPH</p>
                      <p>Wind Speed</p>
                  </div>  
              </div>    
    
            </div>
          </div>
          <ToastContainer/>
    </div>
  )
}

export default App