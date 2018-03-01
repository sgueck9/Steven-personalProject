require('dotenv').config()
const express = require('express')
, session = require('express-session')
, passport= require('passport')
, Auth0Strategy = require('passport-Auth0')
, massive = require('massive')
, bodyParser = require('body-parser')
, stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
, {joesPennyFunction} = require('../src/controllers/joesPennyFunction')

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENTID,
    CLIENTSECRET,
    CALLBACKURL,
    CONNECTION_STRING
} = process.env

const app = express()

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())


massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
})

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENTID,
    clientSecret: CLIENTSECRET,
    callbackURL: CALLBACKURL,
    scope: 'openid profile'
}   , function(accessToken, refreshToken, extraParams, 
    profile,done){
        
        const db = app.get('db')
        const {sub, nickname, name, picture}= profile._json
console.log('find user', profile._json )
        db.find_user([sub]).then( response => {
            if(response[0]){
                done(null, response[0].id)
            }else{
                console.log('create user')
                db.create_user([name, picture, sub, nickname]).then(response =>{
                    done(null, response[0].id)
                })
            }
        })

}))

passport.serializeUser((id, done)=>{
    console.log(id)
    done(null, id)
})
passport.deserializeUser((id, done)=>{
    const db = app.get('db')
    db.find_logged_in_user([id]).then( res => {
        done(null, res[0])
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: process.env.REACT_APP_STOREHOME
}))

app.get('/auth/me', (req, res)=>{
    if(!req.user){
        res.status(404).send('Not logged in')
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req, res)=>{
    req.logout()
    res.redirect(process.env.REACT_APP_HOMEPAGE)
})

app.get('/api/products',(req, res)=>{
    app.get('db').select_all_products().then(response =>{
        res.status(200).send(response)
    })
})
app.get('/api/mycart', (req, res)=>{
    let userID=req.user.id
    app.get('db').view_cart([userID]).then(response =>{
        console.log(response)
        res.status(200).send(response)
    })
})



app.get('/logout', (req, res)=>{
    req.logout(
    res.redirect(process.env.REACT_APP_HOMEPAGE)
    )
} )

app.post('/api/addToCart', (req, res)=>{
    let  {prodID} =req.body
    let userID=req.user.id
    let db = app.get('db')
    db.add_to_cart([prodID, userID]).then(response=>{
        db.query(`select * from cart where user_id = ${userID}`).then(response=>{
            res.status(200).send(response)
        }).catch(console.log)
        

        
    }).catch(console.log)
    
    console.log(req.body)
    console.log(req.user.id)
    
})
app.delete('/api/removefromcart/:id', (req, res)=>{
    console.log(req.params.id)
    let userID=req.user.id
    app.get('db').remove_from_cart([req.params.id]).then(response =>{
        return app.get('db').view_cart([userID]) 
        
    })
    .then(response=>{
        console.log(response)
        res.status(200).send(response)
    })
    .catch(err => console.log(err))
})

app.get('/api/cartcount', (req, res)=>{
    app.get('db').cart_count([req.user.id]).then(response=>{
        console.log(response)
        res.status(200).send(response[0].count)
    })
})
app.get('/api/totalprice', (req, res)=>{
    app.get('db').total_price([req.user.id]).then(response=>{
        price = response[0].total_price
        console.log(price)
        res.status(200).send(price)
    })
})

app.put('/api/cartquantity/:quantity/:cart_id', (req, res)=>{
    console.log(req.params.quantity, req.params.cart_id)
    app.get('db').update_cart([req.params.quantity, req.params.cart_id]).then(response=>{
        console.log(response)
        app.get('db').view_cart([response[0].user_id]).then(response=>{
            res.status(200).send(response)
        })
    })
})

app.post('/api/payment', (req, res, next) => {
    console.log('amount', req.body.amount)
    const amountArray = req.body.amount.toString().split('');
    const convertedAmt = joesPennyFunction(amountArray);
    console.log('converted amount', convertedAmt)
    const charge = stripe.charges.create(
        {

            amount: convertedAmt,
            currency: 'usd',
            source: req.body.token.id,
            description: 'Stripe Checkout test charge'
        },
        function(err, charge) {
            if (err) return res.sendStatus(500);
            else return res.sendStatus(200);
        }
    );
});


app.listen(SERVER_PORT, ()=>{
    console.log(`Server listening on Port: ${SERVER_PORT}`)
})