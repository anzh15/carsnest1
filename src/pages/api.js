import React from react;
import { useState } from "react";

const[data, setData] = useState('');
setData("Loading...");

fetch('http://localhost:5000/')
  .then(res => res.text())
  .then(data => console.log(data));