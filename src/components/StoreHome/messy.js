import React, {Component} from 'react'
import axios from 'axios'
import './storehome.css'
import {connect} from 'react-redux'
import {getUser, selectAllProducts, cartTotal} from '../../ducks/users'

import cart from '../../cart.jpg'



export class StoreHome extends Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         data: [{},{},{}],
    //         // cartValue: 0,
    //         // userName: ''
    //         // userData: this.userData,
    //         // user: {}

    //         }
    // }
    
    componentDidMount(){
        // this.selectAllProducts()
        // this.cartTotal()
        // this.theUserName()
        this.props.selectAllProducts()
        this.props.getUser()
        this.props.cartTotal()
    }
    

    // selectAllProducts(){
    //     axios.get('/api/products').then(response =>{
    //         console.log(response.data)
    //         this.setState({data: response.data}) 
            
    //     })

    // }
    addToCart(prodID){
        axios.post('/api/addToCart', {prodID}).then(response=>{
            this.props.cartTotal()
        })
    }
    
    // cartTotal(){
    //     axios.get('/api/cartcount').then(response => {
    //         console.log(response.data)
    //         this.setState({cartValue: response.data})
    //     })
    // }
   

    render(){
        
    //    let cartValue = this.props
    //     let userData = this.props
    //     let products = this.props 
        

        return(
            <div className='main'>
                <div className='header'>
                    <div className='userName'><p>Logged in as {this.props.userData.nickname}</p></div>
                    <a href='http://localhost:3000/#/mycart'className='cartHolder'>
                        <div className='cartThing'><img src={cart} className='cartIcon' />( {this.props.cartValue} )</div>
                    </a>
               </div>
                <div className='products'>
                This is the Store Home, thanks for logging in!! :)
                </div>
                <div className='products'>
                    <img className= 'prodPic' src={this.props.products[1].img}/>
                    <div>
                        {(this.props.products[1].product_name)}
                    </div>
                        <div>
                            ${(this.props.products[1].price)}
                            <button 
                                onClick={e=>{this.addToCart(this.props.products[1].id)}}>add to cart
                            </button>
                        </div>
                    
                </div>     
                <div className='products'>
                <img className= 'prodPic' src={this.props.products[0].img}/>
                <div>
                {(this.props.products[0].product_name)}
                </div>
                    <div>
                        ${(this.props.products[0].price)}
                        <button 
                            onClick={e=>{this.addToCart(this.props.products[0].id)}}>add to cart
                        </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={this.props.products[2].img}/>
                    <div>{this.props.products[2].product_name}</div>
                    <div>${this.props.products[2].price}
                        <button onClick={e=>{this.addToCart(this.props.products[2].id)}}>
                        add to cart
                        </button>
                    </div>

                </div>

                <a href='http://localhost:3000/#/mycart'>
                    <button>My Cart</button>
                </a>               

                <a href='http://localhost:3010/logout'>
                    <button>LOGOUT</button>
                </a>
            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        userData: state.user,
        products: state.products,
        cartValue: state.cartValue
    }
}
export default connect(mapStateToProps, {getUser, selectAllProducts, cartTotal})(StoreHome)
