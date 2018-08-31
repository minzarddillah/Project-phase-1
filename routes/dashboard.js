const router    = require(`express`).Router()
const Sequelize = require('sequelize')
const roomList  = require('./roomList')
const Model     = require('../models/')
const checkUser = require('../helpers/checkUserKosan')
const User      = Model.User
const Hotel     = Model.Hotel
const Room      = Model.Room
const Location  = Model.Location
const Op        = Sequelize.Op


router.use('/',(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/')
    }
})

router.get('/',(req,res)=>{
    User.findById(req.session.user.id)
        .then(user =>{
            return user.getHotels({
                order: [[`id`,`ASC`]],
                include: {
                    model: Location
                }
            })
        })
        .then(kosan =>{
            // res.send(kosan)
            res.render(`dashboard`,{kosan})
        })
        .catch(err =>{
            res.send(err)
        })
})

router.get('/edit/:id',checkUser,(req,res)=>{
    var locations = []
    var kosan = null
    Hotel.findById(req.params.id)
        .then(kost =>{
            kosan = kost
            return kost.getLocation()
        })
        .then(location =>{
            locations.push(location)
            return Location.findAll({
                where:{
                    id:{
                        [Op.ne]: locations[0].id
                    }
                }
            })
        })
        .then(dataLokasi =>{
            dataLokasi.forEach(lokasi => {
                locations.push(lokasi)
            });
            res.render(`editKost`,{kost:kosan,locations})
        })
        .catch(err =>{
            res.send(err)
        })
})

router.post('/edit/:id',(req,res)=>{
    Hotel.update({    
        name: req.body.name,
        address: req.body.alamat,
        typeKost: req.body.tipeKost,
        foto: req.body.foto
    },{
        where: {
            id:req.params.id
        }
    })
    .then(data =>{
        res.redirect('/dashboard')
    })
    .catch(err =>{
        res.send(err)
    })
})

router.get('/delete/:id',checkUser,(req,res)=>{
    Hotel.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(success =>{
        return Room.destroy({
            where: {
                kostId: req.params.id
            }
        })
    })
    .then(success =>{
        res.redirect('/dashboard')
    })
    .catch(err =>{
        res.send(err)
    })
})

router.get('/roomList/:id',checkUser, (req,res)=>{
    Hotel.findById(req.params.id)
    .then(kost=>{
        return kost.getRooms({
            order:[[`id`,`ASC`]]
        })
    })
    .then(kamarKost =>{
        res.render(`roomList`,{kamarKost,idKost:req.params.id})
    })
    .catch(err =>{
        res.send(err)
    })
})

router.get('/addRoom/:idKost', (req,res)=>{
    res.render('addRoom',{idKost:req.params.idKost})
})

router.post('/addRoom/:idKost', (req,res)=>{
    Room.create({
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo,
        kostId: req.params.idKost
    })
    .then(room =>{
        res.redirect(`/dashboard/roomList/${req.params.idKost}`)
    })
})

router.use('/roomList',roomList)

module.exports = router