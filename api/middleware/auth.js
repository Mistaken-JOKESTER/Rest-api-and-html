const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate  = async (req, res, next) => {
    try{
        const token = await req.headers['auth']
        const decode = jwt.verify(token, 'this is refresh secret')
        const user = await User.findOne({_id:decode.id, refreshToken: token})

        if(!user){
            throw new Error()
        }

        req.user = {
            user:{ name: user.name, email: user.email},
            id: user._id
        }
        next()
    } catch (e) {
        res.status(401).send({error: 'please Login'})
    }
}

module.exports ={ authenticate }