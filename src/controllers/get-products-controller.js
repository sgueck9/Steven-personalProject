import React from 'react'
import axios from 'axios' 


module.exports = function getProducts(){
    axios.get('/api/view')
}