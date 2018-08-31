const router = require(`express`).Router()

router.get('/',(req,res)=>{
    req.session.user = null
    res.locals.user = null
    res.redirect('/')
})

module.exports = router