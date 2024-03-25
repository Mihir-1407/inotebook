const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Mihir";
var fetchuser = require('../middleware/fetchuser')


//Route 1: Create a user using: POST "/api/auth/createuser" .No login required
router.post(
	"/createuser",
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email").isEmail(),
		body("password").isLength({ min: 3 }),
	],
	async (req, res) => {
		success = false;
		//if there are errors return status code 400 the error message
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success, errors: errors.array() });
		}

		try {
			// Check whether a user with this email exists
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({ success, errors: "Sorry a user with this email already exists" });
			}

			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);

			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});

			const data = {
				user: {
					id: user.id,
				},
			};
			success = true;
			const authToken = jwt.sign(data, JWT_SECRET);
			res.json({ success, authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some Error Occured");
		}
	}
);

//Route 2: Login a user using: POST "/api/auth/login" .No login required
router.post(
	"/login",
	[body("email", "Enter a valid email").isEmail(), body("password", "Password cannot br blank").exists()],
	async (req, res) => {
		let success = false;
		//if there are errors return status code 400 the error message
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: "Please login with correct credentials!" });
			}

			const passCompare = await bcrypt.compare(password, user.password);
			if (!passCompare) {
				return res.status(400).json({ success, errors: "Please login with correct credentials!" });
			}

			const data = {
				user: {
					id: user.id,
				},
			};
			const JWT_SECRET = "Mihir";
			const authToken = jwt.sign(data, JWT_SECRET);
			success = true;
			res.json({ success, authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);



//Route 3: Get loggedin user details using POST '/api/auth/getuser', Login required
router.post('/getuser',fetchuser,async (req,res)=>{

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}

})


module.exports = router