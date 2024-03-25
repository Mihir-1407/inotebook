import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
	const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
	let navigate = useNavigate();
	const host = "http://localhost:5000";

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password } = credentials;
		const response = await fetch(`${host}/api/auth/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});
		const json = await response.json();
		console.log(json);

		if (json.success) {
			//Save the auth token and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/");
			props.showAlert("Account Created Successfully", "success");
		} else {
			props.showAlert("Invalid Credentials", "danger");
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div>
			<h2>Please Signup to use Notebook</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group my-3">
					<label htmlFor="name">Name </label>
					<input
						type="text"
						required
						minLength={2}
						name="name"
						value={credentials.name}
						onChange={onChange}
						className="form-control"
						id="name"
						aria-describedby="nameHelp"
						placeholder="Enter your name"
					/>
				</div>
				<div className="form-group my-3">
					<label htmlFor="exampleInputEmail1">Email </label>
					<input
						type="email"
						required
						name="email"
						value={credentials.email}
						onChange={onChange}
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						required
						minLength={3}
						name="password"
						value={credentials.password}
						onChange={onChange}
						className="form-control"
						id="password"
						placeholder="Password"
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="cpassword">Password</label>
					<input
						type="password"
						required
						minLength={3}
						name="cpassword"
						value={credentials.cpassword}
						onChange={onChange}
						className="form-control"
						id="cpassword"
						placeholder="Confirm Password"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Signup;
