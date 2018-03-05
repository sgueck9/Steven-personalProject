import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {connect} from 'react-redux'
import './Checkout.css'
import {getUser, cartTotal} from '../../ducks/users'
import cart from '../../cart.jpg'
import {ToastContainer, toast} from 'react-toastify'


export class Checkout extends Component{
     constructor(){
         super()
         this.state ={
             cartTotal: 0 
         }
     }
    
    
    componentDidMount(){
         this.totalPrice()
         this.props.getUser()
         this.props.cartTotal()
     }
     totalPrice(){
        axios.get('/api/totalprice').then(response=>{
            console.log(response)
            this.setState({cartTotal : response.data * 100})
            console.log(this.state.cartTotal)
        })
    }
    
    onToken = token => {
            console.log('token', token);
            token.card = void 0;
            console.log('cart total', this.state.cartTotal)
            const  amount  = this.state.cartTotal
            axios.post('/api/payment', { token, amount })
              .then(charge => { console.log('charge response', charge.data) })
              console.log('userData', this.props.userData)
            axios.delete(`/api/gonecart/${this.props.userData.id}`).then(response=>{
                this.setState({cartTotal: 0})
                this.props.cartTotal()
                toast.info('Purchase Successful!')
            })
    }

          
    render(){
      let cartValue = this.props.cartValue
      let userData = this.props.userData

        return(
            <div className='mainCheckout'>
            <ToastContainer autoClose={2500}/>
                <div className='header'>
                <div className='userName'><p>Logged in as {userData.nickname}</p></div>
                <div className='headTitle'>STEVE'S SPORTS COLLECTIBLES</div>
                <a href={process.env.REACT_APP_CART} className='cartHolder'>
                    <div className='cartThing'><img src={cart} className='cartIcon'/>( {cartValue} )</div>
                </a>
                <a className='logoutButton' href={process.env.REACT_APP_LOGOUT}>
                <button>LOGOUT</button>
                </a>
                </div>
                    <div className='background2Checkout'>
                    <div className='checkoutContainer'>
                <div className='checkoutPrice'>The total price of your purchase will be: ${this.state.cartTotal / 100}.00</div>
                <div className='card'>Press pay with card to finalize your order</div>
                <StripeCheckout className='stripe'
                    token={this.onToken}
                    stripeKey={process.env.REACT_APP_PUBLIC_KEY}
                    amount={this.state.cartTotal}
                />
               
                <a href={process.env.REACT_APP_LOGOUT} className='buttons'>
                    <button>LOGOUT</button>
                </a>
                <a href={process.env.REACT_APP_CART} className='buttons2'><button>Back to cart</button></a>
                <a href={process.env.REACT_APP_STOREHOME} className='buttons2'><button>Return to shopping</button></a>
            </div>
            </div>
            </div>
            
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.user,
        cartValue: state.cartValue
    }
}
export default connect(mapStateToProps, {getUser, cartTotal})(Checkout)