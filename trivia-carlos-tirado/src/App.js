import './App.css'
import React, { useEffect, useState } from 'react'
import CategoryList from './components/CategoryList'
import axios from 'axios'


function App() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then((res) => setCategories(res.data.trivia_categories))
    }, [])

    return (
        <div className='header'>
            <CategoryList categories={categories} />
        </div>
    );
}

export default App




    


















































