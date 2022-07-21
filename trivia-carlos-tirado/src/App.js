import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then((res) => setCategories(res.data.trivia_categories))
}, []) 

  return (
    <div className='triviagame'>
      <h1>All categories</h1>
    </div>
  
    );
  }
  
  export default App;














































  //<div><CategoryList categories={categories}></CategoryList></div>