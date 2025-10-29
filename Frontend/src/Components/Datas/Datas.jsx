import React from 'react'
import './Datas.css'     
import arrow_btn from '../../assets/arrow_btn.png'
import play_icon from '../../assets/play_icon.png'
import pause_icon from '../../assets/pause_icon.png'
import { useNavigate } from 'react-router-dom'
const Datas = ({ data, setCount, setPlayStatus, playStatus, count }) =>
   {
  const navigate = useNavigate() 
  
  const handleGetStarted = () => {
    navigate('/AllLogin');
  };

  return (
    <div className='datas'>
      <div className="text">
        <p>{data.text1}</p>
        <p>{data.text2}</p>
      </div>

      <div className='explore'  style={{ cursor: 'pointer' }}>
        <p>Get Started</p>
       <button onClick={handleGetStarted} > <img src={arrow_btn} alt="Arrow Button"/> </button>
      </div>

      <div className='dot-play'>
        <ul className='dots'>
          <li onClick={() => setCount(0)} className={count === 0 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setCount(1)} className={count === 1 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setCount(2)} className={count === 2 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setCount(3)} className={count === 3 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setCount(4)} className={count === 4 ? "hero-dot orange" : "hero-dot"}></li>
        </ul>
        <div className="play">
          <img onClick={() => setPlayStatus(!playStatus)} src={playStatus ? pause_icon : play_icon} alt="" />
         
        </div>
      </div>
    </div>
  )
}


export default Datas
