const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const { authenticate } = require('../middleware/auth')


const router = express()

router.post('/register',async (req, res) => {
    const exesist = await User.findOne({email: req.body.email})

    if(exesist){
        return res.send({msg:'Email is invalid'})
    }

    const user = new User(req.body)
    
    try{
        await user.save()
        res.status(200).send({message: 'You are registed and can proceede to login page'})

    } catch (e){
        res.send(e)
    }
})


router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({email})

        if(!user || user.password !== password ){
            return res.send({ emsg: 'Invalid Email or password'})
        }

        if(user.refreshToken){
            return res.send({emsg:'You are already loged in somewhere else'})
        }

        const token = await user.generateToken()
        res.status(200).send(token)
            
    } catch(e) {
        res.status(500).send({emsg: 'something went wrong please trya again'})
    }
    
})

router.post('/welcome', authenticate,async (req, res) =>{
    try{
        res.send(req.user.user)
    } catch(e){
        res.status(500).send()
    }
})

router.post('/logout', authenticate,async (req, res) => {
    try{
        await User.findOneAndUpdate(
            {_id: req.user.id}, 
            {refreshToken: undefined, token:undefined})
            res.send({msg: 'You are loged OUt'})
    } catch(e) {
        res.status(500).send({emsg: 'Something went wrong'})
    }
})

router.delete('/deleteAcount', authenticate, async (req, res) => {
    try {
        const user = User.findOneAndRemove({_id:req.user.id})
        res.status(200).send({msg: 'you are logged out'})
    } catch (e) {
        res.status(500).send({emsg: 'Something Went Wrong'})
    }
})


module.exports = router