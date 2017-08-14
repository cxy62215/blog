const express = require('express')
const router = express.Router()
const secret = require('../../config').jwt
const jwt = require('jsonwebtoken')
const db = require('../db/db.js')
const sha1 = require('sha1')
const rand = require('csprng')

const creatToken = (id, name) => {
    return jwt.sign({
        id: id,
        name: name
    }, secret.cert, { expiresIn: '7d' })
}
router.post('/api/resgin',(req,res) => {
    const salt = rand(160, 36)
    const users = {
      name: req.body.name,
      password: sha1(req.body.password+salt),
      salt:salt
    }
    db.User(users).save()
    db.User.find({name:users.name},(err,doc) => {
        if(err){
            console.log(err)
        }else{
            const token = creatToken(doc._id, doc.name)
            res.status(200).send({
                id: doc._id,
                name: doc.name,
                token: token
            })
        }
    })

})


module.exports = router