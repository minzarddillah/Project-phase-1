const router = require(`express`).Router()
const Model = require('../models/')
const Room = Model.Room
const Hotel = Model.Hotel

router.get('/:idKost',(req,res)=>{
    var kost = null
    Hotel.findById(req.params.idKost)
    .then(kosan =>{
        kost = kosan
        return kosan.getRooms()

    })  
    .then(rooms =>{
        res.render(`kamarKost`,{kamarKost:rooms,kost})
    })
})

router.use('/:idKost/addRent',(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
    res.redirect(`/listRoom/${req.params.idKost}`)
    }
})

router.get('/:idKost/addRent/:idKamar',(req,res)=>{

    let idKamar = req.params.idKamar
    Room.findById(idKamar)
    .then(kamar =>{
        req.session.inovice = kamar
        res.render(`chekIn`,{kamar, idKost:req.params.idKost, idKamar})
    })
})

router.post('/:idKost/addRent/:idKamar',(req,res)=>{

    let idKamar = req.params.idKamar
    let kamarKost = null
    Room.findById(idKamar)
    .then(kamar =>{
        kamarKost = kamar
        return kamar.getHotel()
    })
    .then(kost =>{
        req.session.checkout = {
            namaKost: kost.name,
            tipeKost: kost.typeKost,
            description: kamarKost.description,
            price: kamarKost.price,
            checkIn: req.body.checkIn,
            UserId: req.session.user.id,
            roomId: req.params.idKamar
        }
        res.render('checkout',{kamarKost, kost, checkIn: req.body.checkIn})
    })
})

module.exports = router