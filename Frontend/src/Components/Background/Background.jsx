import React from 'react'
import './Background.css'
import video1 from '../../assets/vvv.mp4';
import pic1 from '../../assets/pic1.jpeg';
import pic2 from '../../assets/pic2.jpeg';
import pic3 from '../../assets/pic3.jpeg';
import pic4 from '../../assets/pic4.jpeg';
import pic5 from '../../assets/pic5.jpeg';

const Background = ({playStatus,count}) => {
 
      if(playStatus)
      {
return(
<video className='background fade-in' autoPlay loop muted>
    <source src={video1} type='video/mp4'/>
</video>
)
      }
      else if(count===0)
      {
        return <img src={pic1} className='background fade-in' alt=""/>
      }
      else if(count===1)
      {
        return <img src={pic2} className='background fade-in' alt=""/>
      }
      else if(count===2)
      {
        return <img src={pic3} className='background fade-in' alt=""/>
      }
      else if(count===3)
      {
        return <img src={pic4} className='background  fade-in' alt=""/>
      }
      else if(count===4)
      {
        return <img src={pic5} className='background fade-in' alt=""/>
      }


  
}

export default Background
