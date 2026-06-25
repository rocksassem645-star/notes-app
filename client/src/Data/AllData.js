import React, { createContext, useEffect, useState } from 'react'

const apiValue = createContext();

function AllData({children}) {
    const [api,setApi] = useState([]);
    useEffect( ()=>{
        fetch("https://dummyjson.com/products")
        .then( (item)=>{
            return item.json();
        })
        .then( (element)=>{
            setApi(element.products);
        } )
    },[])
  return (
    <apiValue.Provider value={api}>
        {children}
    </apiValue.Provider>
  )
}

export  {AllData,apiValue}