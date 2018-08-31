const router = require(`express`).Router();
const Room = require('../models/').Room
router.get('/:id',(req,res)=>{
    Room.findById(req.params.id)
    .then(kamar =>{
        return kamar.getUser()
    })
    .then(user =>{
        // res.send(user)
        res.render(`showUser`,{user})
    })
})

module.exports = router