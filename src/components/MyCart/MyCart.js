import React, {Component} from 'react'
import './myCart.css'
import axios from 'axios'

export default class MyCart extends Component {
constructor(){
    super()
    this.state = {
        data: [],
        cartTotal: 0
    }
    this.viewCart = this.viewCart.bind(this)
}

componentDidMount(){
    this.viewCart()
    this.cartQuantity()
    this.totalPrice()
}
handleClickAdd(product){
    this.totalPrice()
    this.cartQuantity(product.quantity*1 + 1, product.cart_id)
    this.totalPrice()
}
handleClickDelete(product){
    this.totalPrice()
    this.removeFromCart(product.cart_id)
    this.totalPrice()
}
viewCart(){
    axios.get('/api/mycart').then(response => {
        console.log(response.data)
        this.setState({data : response.data})
    })
}
totalPrice(){
    axios.get('/api/totalprice').then(response=>{
        console.log(response)
        this.setState({cartTotal : response.data})
    })
}
removeFromCart(product){
    axios.delete(`/api/removefromcart/${product}`).then(response =>{
        console.log(response)
        console.log(response.data)
        this.setState({data : response.data})
    })}
cartQuantity(quantity, cart_id){
    console.log(quantity)
    console.log(cart_id)
    console.log(this.state)
axios.put(`/api/cartquantity/${quantity}/${cart_id}`).then(response=>{
    axios.get('api/mycart').then(response=>{
        console.log(response.data)
        this.setState({data: response.data})
    })
})
}
    render(){
        const displayCart = this.state.data.map((product, i)=>{
            return <div key={i} >
                <div>
                <h3>{product.product_name}</h3>
                <h4>price: ${product.price}</h4>
                <h4>Quantity {product.quantity}</h4>
                <button onClick={()=>{this.handleClickAdd(product)}}>add more</button>
                <img style={{width:'200px'}} src={product.img}/>
                <button onClick={()=>{this.handleClickDelete(product)}}>Remove from cart</button>
                </div>
            </div>
        })
        return(
            <div>
                this is the cart 
            
                <div className='cartProducts'>
                    {displayCart} 
                    Subtotal : ${this.state.cartTotal}.00
                    <a href={process.env.REACT_APP_STOREHOME}><button>back to store</button></a>
                    <a href={process.env.REACT_APP_CHECKOUT}><button>Checkout!</button></a>
                    <a href={process.env.REACT_APP_LOGOUT}><button>LOGOUT</button></a>
                </div>
            </div>
        )
    }
}