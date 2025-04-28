import jwt, { decode } from 'jsonwebtoken'


export const checkEmail = (req, res, next) => {
    const { email } = req.body
    if (email && email.contains('@')) {
        return next()
    }
    res.status(400).send({ error: 'invalid email!' })
}



export const checkAuth = (req, res, next) => {

    if (!req.headers.authorization) {
      
        return res.status(401).send('Authorization failed!')
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send('Authorization failed!')
    }



    jwt.verify(token, 'HT2yg75FXgfvy', (error, decoded) => {
        if (error || !decoded) {
            return res.status(401).send('Authentication failed!')
        }
        if (decoded) {
       
            next()
        }
    })
}