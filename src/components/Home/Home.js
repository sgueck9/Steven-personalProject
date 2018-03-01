import React, {Component} from 'react'
import './home.css'

export default class Home extends Component{
    render(){
        return(
            <div className='body2'>
                <div className='title'>STEVE'S</div>
                <div className='title2'>SPORTS</div>
                <div className='title3'>COLLECTIBLES</div>
                
                <a href={process.env.REACT_APP_LOGIN}><button className='logButt'>LOGIN</button></a>
                <div className='instruct'>*Please login to begin shopping</div>
            </div>
        )
    }
}



// login(e){
//     e.preventDefault()
//     this.props.socket.emit('login', 'hi')
// }