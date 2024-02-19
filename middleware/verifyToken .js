const jwt = require('jsonwebtoken');

const verifytoken = (req,res,next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(200).send({
            success : false,
            message : "Token is blank"
        })
    }
   var jsontoken = token.split(' ')[1];

    jwt.verify(jsontoken, 'user', (err, decoded) => {
        if (err) {
          return res.status(403).send({ 
            success : false,
            message: 'Token is not valid' 
          });
        }
       
        req.user = decoded; 
        next();
      });
   
}

const adminrole = (role) => {
    return (req,res,next) => {
          
       if(req.user && role.includes(req.user.user.role)){
            return next();
       }
       res.status(403).send({
        success : false,
        message : "access denied by admin"
       })

    }
}



module.exports = {
    verifytoken,
    adminrole,
    
}