const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')


//register
exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log("register")
        console.log("username",username);
        console.log("pass",password);
        console.log("email",email);

        // Validation
        if (!username || !password || !email) {
            return res.status(400).json({ error: "Username, password, and email are required." });
        }

        // Check if the user already exists (you may want to adjust this logic based on your requirements)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email." });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: 'User register successfully',user })
    } catch (error) {
        // Handle unexpected errors
        console.error("Error during registration:", error);
        res.status(500).json({ error: 'Register failed' })
    }

}

//login

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        console.log("login")
        console.log("username----",username);
        console.log("password=====",password)
        // Validation
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id,username: user.username }, 'this-can-be-any-random-key', {
            expiresIn: '1h',
        });
        // Respond with token
        res.status(200).json({ token,user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};

//get the user

exports.getdetails = (req, res) => {
    User.find()
        .then((user) => {
            return res.status(200).send(user)
        }).catch((err) => {
            return res.status(500).send(err.message)
        })
}