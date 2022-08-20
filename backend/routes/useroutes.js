const express = require("express")
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/middleware')
const JWT_Secret = 'mai@hu#don'

router.post('/signin', async (req, res) => {

    const { EmployeeName, Email, PhoneNumber, Password } = req.body
    const foundUser = await User.findOne({ Email });
    let salt = await bcrypt.genSalt(10);
    let passwordHash = await bcrypt.hash(Password, salt)
    if (foundUser) {
        res.status(404).json({ message: "Email Already exist !" })
    }
    else {

        const user = await User.create({
            EmployeeName: EmployeeName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Password: passwordHash,
        })

        const data = {
            id: user.id
        }

        const authToken = jwt.sign(data, JWT_Secret);
        res.send({ authToken })
    }

})

router.post('/login', async (req, res) => {
    let foundEmail = await User.findOne({ Email: req.body.Email })
    if (!foundEmail) {
        return res.status(400).json({ message: "Enter Wrong Information!" })
    } {
        const checkPass = await bcrypt.compare(req.body.Password, foundEmail.Password)
        if (!checkPass) {
            return res.status(400).send("That password doesnt exist !")
        }
        else {
            const payload = {

                id: foundEmail.id

            }
            const authToken = jwt.sign(payload, JWT_Secret);
            res.send({ authToken })
        }
    }
})

router.post('/forgetPass', async (req, res) => {
    let foundEmail = await User.findOne({ Email: req.body.Email })
    if (!foundEmail) {
        return res.status(400).json({ message: "Enter Wrong Information!" })
    }
    else {
        let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(req.body.Password, salt)
        await User.updateOne({ Password: foundEmail.Password }, { $set: { Password: passwordHash } })
        const data = {
            id: foundEmail.id
        }

        const authToken = jwt.sign(data, JWT_Secret);
        res.send({ authToken })
    }
})


router.get('/fetchuser', fetchUser, async (req, res) => {
    const userId = req.user
    let user = await User.findById(userId)
    res.send({ user })
})

module.exports = router