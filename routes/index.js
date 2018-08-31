const router        = require(`express`).Router();
const register      = require('./register')
const login         = require('./login')
const logout        = require('./logout')
const promosiKost   = require('./kost')
const listRoom      = require('./listRoom')
const dashboard     = require('./dashboard')
const Model         = require('../models/')
const checkout      = require('./checkout')
const showUser      = require('./showUser')
const Locations     = Model.Location
const Hotel         = Model.Hotel
const Room          = Model.Room

router.get('/',(req,res)=>{
    if(req.query.error){
        res.locals.error = req.query.error
    }
    var locations = null
    Locations.findAll()
        .then(kota =>{
            locations = kota
            return Hotel.findAll({
                include: {
                    model: Locations
                }
            })
        })
        .then(kosan =>{
            res.render(`home`,{locations,kosan})
        })
        .catch(err =>{
            res.send(err)
        })
})

router.post('/find',(req,res)=>{
    let error = null
    if(req.query.error){
        error = req.query.error
    }

    Locations.findOne({
        include: [{
            model: Hotel,
            as: `Hotels`,
            where: {
                typeKost: req.body.tipeKost
            },
            include: [{
                model: Room,
                as: `Rooms`
            }]
        }],
        where: {
            name: req.body.alamat,

        }
    })
    .then(location =>{
        let kosanYangKosong = []
        let semuaKosan = []
        if(location){
            location.Hotels.forEach(kost => {
                kost.Rooms.forEach(kamar =>{
                    if(!kamar.rentStatus){
                        kosanYangKosong.push({
                            kostName: kost.name,
                            kostId: kost.id,
                            id: kamar.id,
                            kostId: kamar.kostId,
                            rentStatus: kamar.rentStatus,
                            description: kamar.description,
                            price: kamar.price,
                            photo: kamar.photo
                        })
                    }
                    semuaKosan.push({
                        kostName: kost.name,
                        kostId: kost.id,
                        id: kamar.id,
                        kostId: kamar.kostId,
                        rentStatus: kamar.rentStatus,
                        description: kamar.description,
                        price: kamar.price,
                        photo: kamar.photo
                    })
                })
            });
        }else{
            res.redirect('/find?error="Kamar Kost Tidak Ditemukan"')
        }
        if(req.body.filter){
            res.render(`findKamar`,{ kosan: kosanYangKosong, error })
        }else{
            res.render(`findKamar`,{ kosan: semuaKosan, error })
        }

        // res.send(kosanYangKosong)
    })
})

router.get('/find',(req,res)=>{
    let error = null

    if(req.query.error){
        error = req.query.error
    }

    res.render(`findKamar`, { kosan: [], error })
})

router.use('/register',register)
router.use('/login',login)
router.use('/logout',logout)
router.use('/kost',promosiKost)
router.use('/dashboard',dashboard)
router.use('/listRoom',listRoom)
router.use('/checkout',checkout)
router.use('/showUserRoom',showUser)

module.exports = router