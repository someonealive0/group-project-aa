import React from 'react';
import './App.css';
import axios from 'axios'
const ROOT_URL = "/"

const login = () => {
    return axios.get(ROOT_URL + "test_msg")
    .then((response) => {
      console.log(response.data)
    })
}

function App() {
  return (
    <>
      <p>Test</p>
      <button onClick={login}>Log a test message</button>
    </>  
  );
}

export default App;
