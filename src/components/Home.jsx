import { useEffect, useState } from "react"
import "./Home.css"
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    return(
        
        <div className="home">
            <div className="clouds"/>
            <nav className="bg-[#EDF7FF]/90  my-10 mx-15 p-5 rounded-2xl">
              <p className="text-[#0069A8] text-xs uppercase pb-1 font-semibold">welcome</p>
              <h1 className="text-[#052F4A] text-3xl font-bold pb-2">Welcome To My Weather Verse</h1>
              <p className="text-[#024A70] text-sm">Real-time weather insights with smart suggestions and alerts</p>
            </nav>

            <main className="mt-15 w-[70%] mx-auto bg-[#EDF7FF]/90 rounded-3xl shadow-2xl">
              <div className=" py-10 text-center">
                <h1 className="text-[#04283e] text-2xl font-bold mb-2">Know Your Weather!!  Plan Your Day :)</h1>
                <p className="text-[#024A70]">Real-time weather insights with smart suggestions and alerts.</p>

                <div className="flex justify-center text-[#024A70] gap-10 mt-10 mb-10">
                <p className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-3 rounded-xl hover:scale-105 transition">🌡 Live Temperature</p>
                <p className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-3 rounded-xl hover:scale-105 transition">⚠️ Smart Alerts</p> 
                <p className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-3 rounded-xl hover:scale-105 transition">📊 Forecast</p>  
                <p className="bg-[#e7f4fd] border border-[#bcd5e7] backdrop-blur-md p-3 rounded-xl hover:scale-105 transition">🌪 Wind Status</p> 
                </div>

                <button onClick={() => navigate("/weather")} className=" text-[#daedf8] bg-[#286eca] hover:bg-[#1F5AA6] p-3 px-5 rounded-xl">
                  Explore Weather →
                </button></div>
              </main>
      </div>

        
        
    )
}

export default Home