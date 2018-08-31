const router = require(`express`).Router()
const Hotel = require('../models/').Hotel
const Locations = require('../models/').Location

router.use('/',(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/')
    }
})

router.get('/',(req,res)=>{
    Locations.findAll()
        .then(locations =>{
            res.render(`kost`,{locations})
        })
    
})

router.post('/',(req,res)=>{
    let dataKost = {    
        name: req.body.name,
        address: req.body.kota,
        typeKost: req.body.tipeKost,
        foto: req.body.foto,
        userId: req.session.user.id,
        alamat: req.body.alamat
    }
    // res.send(dataKost)
    Hotel.create(dataKost)
    .then(kosan =>{
            res.redirect('/dashboard')
    })
    .catch(err =>{
        res.send(err)
    })

})

module.exports = router