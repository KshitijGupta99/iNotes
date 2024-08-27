require("dotenv").config();

const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var fetchData = require('../middleware/fetchData.js')

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup',
    [body('username').isLength({ min: 3 }),            // passing constraints to porperties
    body('email').isEmail(),                 // validating the email
    body('password').isLength({ min: 6 })], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(406).json({ errors: errors.array() });
        }

        try {

            let user = await User.findOne({ username: req.body.username });        //checking if a user with same email exsist or not
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this username already exists" });
                //if exsist throwing an error
            }
            user = await User.findOne({ email: req.body.email });        //checking if a user with same email exsist or not
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" });
                //if exsist throwing an error
            }


            const salt = await bcrypt.genSaltSync(10);
            const hashkey = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                username: req.body.username,
                password: hashkey,
                email: req.body.email,

            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({ authtoken });

        } catch (error) {

            console.error(error.message);
            res.status(500).send("Some Error occured");

        }
    })







router.post('/login', async (req, res) => {                             //making a route for POST request for LOGIN
    const { username, password } = req.body;
    try {
        console.log('Finding user in database...');
        let user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        console.log('User found:', user);
        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
        console.log({authtoken})

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Some Error occured");

    }

});


router.post('/userdata', fetchData, async (req, res) => {
    try {
        var userId = req.user.id;
        var user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }

})

module.exports = router;