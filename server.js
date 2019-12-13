const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register.js');
const signin = require('./Controllers/signin.js');
const profile = require('./Controllers/profile.js');
const image = require('./Controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'rucha',
    password : '',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {res.send(db.users) })
app.post('/signin', (req, res) => {signin.signinHandler(req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.registerHandler(req, res, bcrypt, db)})
app.get('/profile/:id', (req,res) => {profile.profileHandler(req, res, db)})
app.put('/image', (req,res) => {image.imageHandler(req, res, db)})
app.post('/imageurl', (req,res) => {image.apiHandler(req, res)})


app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on port ${process.env.PORT}');
})

