import React, {Component} from 'react'
import './storehomegrid.css'
import {connect} from 'react-redux'
import {getUser, selectAllProducts, cartTotal, addToCart} from '../../ducks/users'
import cart from '../../cart.jpg'
import { ToastContainer, toast } from 'react-toastify';
// this should work


export class StoreHome extends Component{
    
    componentDidMount(){
        this.props.selectAllProducts()
        this.props.getUser()
        this.props.cartTotal()
    }

    addToCart(prodID){

         this.props.addToCart(prodID)
         this.props.cartTotal()
         toast.info('Item added to cart!')
        }
         
    render(){
        
        let cartValue = this.props.cartValue
        let userData = this.props.userData
        let products = this.props.products 
        
        return(
            <div className='main'>
            <ToastContainer autoClose={2500}/>
                <div className='header'>
                    <div className='userName'><p>Logged in as {userData.nickname}</p></div>
                    <div className='headTitle'>STEVE'S SPORTS COLLECTIBLES</div>
                    <a href={process.env.REACT_APP_CART} className='cartHolder'>
                        <div className='cartThing'><img src={cart} className='cartIcon' />( {cartValue} )</div>
                    </a>
                    <a className='logoutButton' href={process.env.REACT_APP_LOGOUT}>
                    <button>LOGOUT</button>
                </a>
               </div>
               <div className='body'>
                    <div className='background2'>
                    <div className='thanks'>
                    Thanks for logging in! you can now begin shopping
                    </div>
                    <div className='prodGrid'>
               
                    <div className='products'>
                        <img className= 'prodPic' src={products[1].img}/>
                    <div>
                        {(products[1].product_name)}
                    </div>
                        <div>
                            <div>
                            Price: ${(products[1].price)}
                            </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[1].id)}}>add to cart
                            </button>
                        </div>
                    </div>     
                    <div className='products'>
                        <img className= 'prodPic' src={products[0].img}/>
                        <div>
                            {(products[0].product_name)}
                    </div>
                    <div>
                        <div>
                            Price: ${(products[0].price)}
                        </div>
                        <button className='addToCart'
                            onClick={e=>{this.addToCart(products[0].id)}}>add to cart
                        </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[2].img}/>
                    <div>{products[2].product_name}</div>
                    <div>
                        <div>Price: ${products[2].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[2].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[3].img}/>
                    <div>{products[3].product_name}</div>
                    <div>
                        <div>Price: ${products[3].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[3].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[4].img}/>
                    <div>{products[4].product_name}</div>
                    <div>
                        <div>Price: ${products[4].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[4].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[5].img}/>
                    <div>{products[5].product_name}</div>
                    <div>
                        <div>Price: ${products[5].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[5].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[6].img}/>
                    <div>{products[6].product_name}</div>
                    <div>
                        <div>Price: ${products[6].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[6].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[7].img}/>
                    <div>{products[7].product_name}</div>
                    <div>
                        <div>Price: ${products[7].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[7].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div className='products'>
                    <img className='prodPic' src={products[8].img}/>
                    <div>{products[8].product_name}</div>
                    <div>
                        <div>Price: ${products[8].price}
                    </div>
                            <button className='addToCart'
                                onClick={e=>{this.addToCart(products[8].id)}}>
                                add to cart
                            </button>
                    </div>
                </div>
                <div> 
                    <a href={process.env.REACT_APP_CART}>
                        <button className='bottom'>My Cart</button>
                    </a>              
                    <a href={process.env.REACT_APP_CHECKOUT}>
                        <button className='bottom'>Checkout</button>
                    </a>
                </div>  
             </div> 
                                 
                    </div>   
                </div>
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
export default connect(mapStateToProps, {getUser, selectAllProducts, cartTotal, addToCart})(StoreHome)
