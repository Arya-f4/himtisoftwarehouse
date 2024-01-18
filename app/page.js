'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react';
import date from 'date-and-time';
import { toWords } from 'number-to-words';


function formatTimeAsWords() {
  const now = new Date();
  const hours = toWords(now.getHours());
  const minutes = toWords(now.getMinutes());
  const seconds = toWords(now.getSeconds());

  return `${hours} past ${minutes} minutes ${seconds} seconds`;
}
function polindrome(str) {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}
export default function Home() {
  const [time, setTime] = useState(new Date());
  const [hash, setHash] = useState('');
  const [isPalindrome, setIsPalindrome] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setIsPalindrome(polindrome(value));
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    app.listen(3000);

    const data = await response.text();
    setHash(data);
    setIsPalindrome(polindrome(data));
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



  return (
    <div>
      <h1>Next.js + rust</h1>
      <h2>{formatTime(time)}</h2>
      <h2>{formatTimeAsWords()}</h2>

      <form method='post'>
        <input type='file' name='convert' onChange={handleFileUpload}></input>
        <p>{hash}</p>

      </form>
      <form>
        <input type='text' name='polindrome' onChange={handleInputChange} />
        {isPalindrome && <p>The text is a palindrome</p>}
      </form>
      <button name='download'>Download encrypted file</button>
    </div>
  );
}
