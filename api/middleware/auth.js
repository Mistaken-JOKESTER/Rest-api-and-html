const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate  = async (req, res, next) => {
    try{
        const token = await req.headers['auth']
        const decode = jwt.verify(token, 'this is refresh secret')
        const user = await User.findOne({_id:decode.id})

        if(!user.tokens.includes(token)){
            return new Error()
        }

        req.user = {
            user:{ username: user.name, email: user.email},
            id: user._id
        }
        next()
    } catch (e) {
        return new Error(e)
    }
}

module.exports ={ authenticate }