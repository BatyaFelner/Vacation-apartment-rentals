import Advertiser from "../models/advertiser.js";
import jwt from 'jsonwebtoken';


export const register = (req, res) => {
    const { email, password, phone, Anotherphone } = req.body;


    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertisers => {
       
            if (advertisers.length > 0) {
                return res.status(400).send({ error: "Email already exists!" });
            }

        
            const newAdvertiser = new Advertiser({
                email,
                password,
                phone,
                Anotherphone: Anotherphone || null
            });

           
            newAdvertiser.save()
                .then(async advertiser => {
              
                    const token = await jwt.sign(
                        { email, id: advertiser._id },
                        'HT2yg75FXgfvy', 
                        { expiresIn: '1hr' }
                    );

                    res.status(200).send({ advertiser, token });
                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};



export const login = (req, res) => {
 
    const { email, password } = req.body;

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(async users => {
          
            if (users.length == 0) {
                console.log('Email not found!');
                return res.status(404).send({ error: 'Email and password do not match!' });
            }

            
            let [user] = users;

            
            if (user.password !== password) {
                console.log('Password does not match!');
                return res.status(404).send({ error: 'Email and password do not match!' });
            }

          
            const token = await jwt.sign(
                { email, id: user._id }, 
                'HT2yg75FXgfvy', 
                {
                    expiresIn: '1h' 
                }
            );

          
            res.status(200).send({ user, token });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
export const getAll = (req, res) => {
    Advertiser.find()
        .then(a=> {
            res.status(200).send({ a });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};



