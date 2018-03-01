import axios from 'axios'


const initialState = {
    user: {},
    products:[{}, {}, {}, {}, {}, {}, {}, {}, {}],
    cartValue: 0 
}

const GET_USER = 'GET_USER'
const SELECT_ALL_PRODUCTS = 'SELECT_ALL_PRODUCTS'
const CART_TOTAL = 'CART_TOTAL'
const ADD_TO_CART= 'ADD_TO_CART'

export function getUser(){
    const user = axios.get('auth/me').then(response=>{
        console.log(response)
        return response.data
    })
    return {
        type: GET_USER,
        payload: user
    }
}
export function selectAllProducts(){
    const products = axios.get('/api/products').then(response=>{
        console.log(response.data)
        return response.data
    })
    return {
        type: SELECT_ALL_PRODUCTS,
        payload: products
    }
}
export function cartTotal(){
    const cartValue = axios.get('/api/cartcount').then(response=>{
        return response.data
    })
    return {
        type: CART_TOTAL,
        payload: cartValue
    }
}
export function addToCart(prodID){
    console.log('got add to cart')
    const add = axios.post('/api/addToCart', {prodID}).then(response=>{
        console.log(response.data)
        return response.data
    })
    return {
        type: ADD_TO_CART,
        payload: add
    }
}

export default function reducer(state = initialState, action){
    console.log(action)
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case SELECT_ALL_PRODUCTS + '_FULFILLED':
            return Object.assign({}, state, {products: action.payload})
        case CART_TOTAL + '_FULFILLED':
            return Object.assign({}, state, {cartValue: action.payload})
        case ADD_TO_CART + '_FULFILLED':
            console.log(action.payload)
            return Object.assign({}, state, {cartValue: action.payload.length})
        default :
            return state 
    } 
}

