const router = require(`express`).Router()
const crypto = require('crypto');
const User = require('../models/').User

router.post('/',(req,res)=>{
    const salt = req.body.email
    const hash = crypto.createHmac(`sha256`,salt).update(req.body.password).digest(`hex`)

    User.findOne({
        where:{
            email:req.body.email,
            password:hash
        }
    })
    .then(user =>{
        if(user){
            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                payment: []
            }
            res.redirect('/')
        }else{
            res.redirect('/?error="Username atau Password salah"')
        }
    })
    .catch(err =>{
        console.log(err);
        
        res.send(err)
    })
})

module.exports = router