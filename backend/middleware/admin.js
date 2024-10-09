
const admin = (req,res,next) => {

    if(req.user && req.user.role === 'admin'){
        return next() 
    }
    res.status(403).json({
        message : 'Not authorized as a admin'
    })
}

module.exports = admin