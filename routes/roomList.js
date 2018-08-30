const router    = require(`express`).Router()
const Room      = require('../models/').Room

router.get('/:idKost/edit/:id',(req,res)=>{
    Room.findById(req.params.id)
    .then(kamar => {
        res.render(`editKamarKost`,{kamar, idKost:req.params.idKost, idKamar:req.params.id})
    })
    .catch(err =>{
        res.send(err)
    })

})

router.post('/:idKost/edit/:id',(req,res)=>{
    Room.update({
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo
    },{
        where: {
            id: req.params.id
        }
    })
    .then(room =>{
        res.redirect(`/dashboard/roomList/${req.params.idKost}`)
    })
    .catch(err =>{
        res.redirect(`/dashboard/roomList/${req.params.idKost}?err=error`)
    })
})

router.get('/:idKost/delete/:idKamar',(req,res)=>{
    Room.destroy({
        where: {
            id:req.params.idKamar
        }
    })
    .then(succeess => {
        res.redirect(`/dashboard/roomList/${req.params.idKost}`)
    })
    .catch(err => {
        res.redirect(`/dashboard/roomList/${req.params.idKost}?err=error`)
    })
})

module.exports = router