const jwt = require('jsonwebtoken')

module.exports={
    authenticate(req, res, next){
        jwt.verify(req.cookies.userToken,
            process.env.JWT_SECRET,
            (error,payload)=>{
                if(error){
                    console.log(error);
                    res.status(401).json({verified: false})
                }
                else{
                    console.log(payload);
                    req.jwtpayload = payload;
                    next()
                }
            })
    }
}