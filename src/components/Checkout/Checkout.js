import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

export default class Checkout extends Component{
     constructor(){
         super()
         this.state ={
             cartTotal: 0 
         }
     }
    
    
    componentDidMount(){
         this.totalPrice()
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
    }

          
    render(){
      
        return(
            <div>
                <div>The total price of your purchase will be: ${this.state.cartTotal / 100}.00</div>
                <div>Press pay with card to finalize your order</div>
                <a href={process.env.REACT_APP_LOGOUT}>
                    <button>LOGOUT</button>
                </a>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={process.env.REACT_APP_PUBLIC_KEY}
                    amount={this.state.cartTotal}
                />
                <a href={process.env.REACT_APP_CART}><button>Back to cart</button></a>
                <a href={process.env.REACT_STOREHOME}><button>Return to shopping</button></a>
            </div>
        )
    }
}