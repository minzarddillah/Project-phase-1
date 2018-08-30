const Hotel = require('../models/').Hotel

function checkUser(req,res,next){
    Hotel.findById(req.params.id)
    .then(kost =>{
        if(kost.userId === req.session.user.id){
            next()
        }else{
            res.redirect('/')
        }
    })
}

module.exports = checkUser