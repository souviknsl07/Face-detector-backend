const express= require('express');
const bcrypt = require('bcrypt-nodejs');
const cors= require('cors');
const knex= require('knex');

const register= require('./Controllers/Register');
const signin= require('./Controllers/Signin');
const profile= require('./Controllers/Profile');
const image= require('./Controllers/Image');

const db=knex({
	client: 'pg',
  	connection: {
	    host : 'postgresql-symmetrical-38924',
	    user : 'postgres',
	    password : 'test',
	    database : 'smart-brain'
  	}
});


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req,res)=>{res.send('it is working')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res)=> {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
app.put('/image', (req, res)=> {image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res)=> {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000);





