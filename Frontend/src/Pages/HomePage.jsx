import React, { useEffect, useState } from 'react';
import Background from '../Components/Background/Background';
import Navbar from '../Components/Navbar/Navbar';
import Datas from '../Components/Datas/Datas';

const HomePage = () => {
  let data = { text1: "dive into", text2: "what u love" };
  const [count, setCount] = useState(4);
  const [playStatus, setPlayStatus] = useState(true);

  useEffect(() => {
     setInterval(() => {
      setCount(prev => (prev === 4 ? 0 : prev + 1));
    }, 3000);
  }, []);

  return (
    <div>
      <Background playStatus={playStatus} count={count} />
      <Navbar />
      <Datas 
        setPlayStatus={setPlayStatus}
        data={data}
        count={count}
        playStatus={playStatus}
        setCount={setCount}
      />
    </div>
  );
};

export default HomePage;
