
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const PORT = process.env.PORT || 3000
require('dotenv').config()
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())


app.post('/send', async (req, res) => {
    const { name, lastName, email, message } = req.body

    const contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>${name}</li>
            <li>${lastName}</li>
            <li>${email}</li>
        </ul>
        <p>${message}</p>
    `
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const info = await transporter.sendMail({
            from: 'My Portfolio',
            to: 'medina.ifrain@gmail.com',
            subject: "New message from your Portfolio",
            html: contentHTML
        })
        if (info.messageId) {
            res.status(200).json(info)
        }
    } catch (error) {
        res.status(500).json(error)
    }



})

app.listen(PORT, () => {
    console.log(`Server started in PORT: ${PORT}`);
})

module.exports = app