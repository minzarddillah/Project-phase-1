const router = require(`express`).Router()
const Model = require('../models/')
const Payment = Model.Payment
const Room = Model.Room

router.use('/',(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/')
    }
})

router.get('/',(req,res)=>{
    let paymentData = req.session.checkout
    paymentData.userEmail = req.session.user.email
    let tanggalCheckIn = req.session.checkout.checkIn.split('-')
    let date = new Date(tanggalCheckIn[0],tanggalCheckIn[1],tanggalCheckIn[2])
    date.setMonth(date.getMonth()+1)


    Payment.create(paymentData)
    .then(payment =>{
        req.session.user.payment.push(req.session.checkout)
        return Room.update({
            userId: req.session.user.id,
            rentStatus:true,
            dueDate: date,
        },{
            where: {
                id:  paymentData.roomId
            }
        })
    })
    .then(success =>{
        res.render(`successPayment`)
    })
    .catch(err =>{
        res.send(err)
    })
})


module.exports = router