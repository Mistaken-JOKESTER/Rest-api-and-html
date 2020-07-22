const mongoose = require('mongoose')
const validator = require('validator')
const { Timestamp } = require('mongodb')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        vlaidate: (value) => {
            if(!validator.isEmail(value)){
                return new Error('Provide a valid E-mail')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        validate: (value) => {
            if(!validator.isAlphanumeric(value)){
                throw new Error('Password should be alphanumeric')
            }
        }
    },
    confPassword:{
        type: String,
        required: [true],
        minlength: 8,
        validate: function(value) {
            if(this.password !== value){
                throw new Error('Password do not match')
            }
        }
    },
    token:{
        type: String,
    },
    refreshToken:{
        type: String,
    }
}, {
    timestamps: { createdAt: 'created_at' } 
})


userSchema.methods.generateToken = async function() {
    try{
        user = this
        const token = jwt.sign({ id:user._id }, 'this is a secret')
        const refreshToken = jwt.sign({id:user._id}, 'this is refresh secret')
        
        user.refreshToken = refreshToken
        user.token = token
        await user.save()

        return refreshToken
    } catch(e){
        throw new Error({msg:'Something went wrong'})
    }
}



const User = mongoose.model('User', userSchema)

module.exports = User