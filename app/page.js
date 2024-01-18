'use client'


import Image from 'next/image'
import { useState, useEffect } from 'react';


function polindrome(str) {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;

}



export default function Home() {
  const [time, setTime] = useState(new Date());
  const [hash, setHash] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const crypto = require('crypto');
    const express = require('express');
    const multer = require('multer');
    const app = express();
    const upload = multer();

    app.post('/upload', upload.single('file'), (req, res) => {
      const hash = crypto.createHash('sha256');
      hash.update(req.file.originalname);
      res.send(hash.digest('hex'));
    });

    app.listen(3000);


    const data = await response.text();
    setHash(data);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  const formatString = (date) => {
    let jam = date.getHours();
    let menit = date.getMinutes();
    let detik = date.getSeconds();
    let ampm = jam >= 12 ? 'PM' : 'AM';

    jam = jam % 12;
    jam = jam ? jam : 12;
    menit = menit < 10 ? '0' + menit : menit;

    return `${jam}:${menit}:${detik} ${ampm}`;
  };

  return (
    <div>
      <h1>Next.js + rust</h1>


      <h2>{formatTime(time)}</h2>
      <h2>{formatString(time)}</h2>


      <form
        method='post'>
        <input type='file' name='convert' onChange={handleFileUpload}></input>

        <p>{hash}</p>
      </form>


      <button name='download' >Download encrypted file</button>


    </div>
  );
}
