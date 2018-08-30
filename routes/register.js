const router = require(`express`).Router()
const User = require('../models/').User

router.use('/',(req,res,next)=>{
    if(req.session.user){
        res.redirect('/')
    }
    next()
})

router.get('/',(req,res)=>{
    var err = null
    if(req.query.error){
        err = req.query.error
    }

    res.render(`registerForm`,{err})
})

router.post('/',(req,res)=>{
    let dataRegister = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password
    }
    User.create(dataRegister)
        .then(user =>{
            res.redirect('/')
        })
        .catch(err =>{
            res.redirect(`/register?error=${err.errors[0].message}`)
        })
})



module.exports = router