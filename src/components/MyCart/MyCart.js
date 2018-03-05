import React, {Component} from 'react'
import './myCart.css'
import {connect} from 'react-redux'
import {getUser, cartTotal} from '../../ducks/users'
import axios from 'axios'
import cart from '../../cart.jpg'
import {toastContainer, toast, ToastContainer} from 'react-toastify'

export class MyCart extends Component {
constructor(){
    super()
    this.state = {
        data: [],
        
    }
    this.viewCart = this.viewCart.bind(this)
}

componentDidMount(){
    this.viewCart()
    this.props.cartTotal()
    this.totalPrice()
    this.props.getUser()
}
handleClickAdd(product){
    this.totalPrice()
    this.cartQuantity(product.quantity*1 + 1, product.cart_id)
    this.totalPrice()
}
handleClickDelete(product){
    this.totalPrice()
    this.removeFromCart(product.cart_id)
    this.props.cartTotal()
    this.totalPrice()
    this.props.cartTotal()
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
        toast.error('Item Removed from cart')
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
        let cartValue = this.props.cartValue
        let userData = this.props.userData

        const displayCart = this.state.data.map((product, i)=>{
            return <div key={i}  >
                       <div className='cartGrid'>
                            <div className='productsCart'>
                            <h3>{product.product_name}</h3>
                            <h4>price: ${product.price}</h4>
                            <h4>Quantity: {product.quantity}</h4>
                            <button onClick={()=>{this.handleClickAdd(product)}}>add more</button>
                            <div className='cartPhoto'>
                                <img style={{height:'160px'}} src={product.img}/>
                            </div>
                            <button onClick={()=>{this.handleClickDelete(product)}}>Remove from cart</button>
                            </div>
                        </div>
            </div>
        })
        return(
            <div className='mainCart'>
            <ToastContainer autoClose={2500}/>
                <div className='header'>
                    <div className='userName'><p>Logged in as {userData.nickname}</p></div>
                    <div className='headTitle'>STEVE'S SPORTS COLLECTIBLES</div>
                    <a className='cartHolder'>
                        <div className='cartThing'><img src={cart} className='cartIcon'/>( {cartValue} )</div>
                    </a>
                    <a className='logoutButton' href={process.env.REACT_APP_LOGOUT}>
                        <button>LOGOUT</button>
                    </a>
                </div>
                <div className='background2Cart'>
                    <div className='subTotal'>
                        <a className='price'>Subtotal : ${this.state.cartTotal}.00</a>
                        <a href={process.env.REACT_APP_STOREHOME} className='back2store'><button>back to store</button></a>
                        <a href={process.env.REACT_APP_CHECKOUT} className='cartButtons'><button>Checkout!</button></a>
                        <a href={process.env.REACT_APP_LOGOUT} className='cartButtons'><button>LOGOUT</button></a>
                    </div>
                    <div className='cartGrid'>
                        {displayCart}  
                    </div>
                       
                    
                    </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        userData: state.user,
        cartValue: state.cartValue
    }
}
export default connect(mapStateToProps, {getUser, cartTotal})(MyCart)
