import React from 'react'
import { useState } from 'react'
import Questions from './Questions'



function CategoryList({ categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryURL, setCategoryURL] = useState()
    const onClick = () => {
        console.log('categories')
    }
    const handleSelectedCategory = (selected) => {
        console.log(`selected category: ${selected.name}, id: ${selected.id}`)
        setSelectedCategory(selected)
        makeURL(selected)
    }
    const makeURL = (selectedCategory) => {
        setCategoryURL(`https://opentdb.com/api.php?amount=5&category=${selectedCategory.id}&type=multiple`)
    }

    return (
        <div className=''>
            {selectedCategory ? (<h1>{selectedCategory.name}</h1>) : (<h1>Category List</h1>)}
            {selectedCategory ? (<Questions categoryID={categoryURL} /> ) : (categories.map((category) =>
            <div className='container'>
    
            <button  onClick={() => handleSelectedCategory(category)}>{category.name}</button></div>
                    
                )
            )}
        </div >
    )
}

export default CategoryList