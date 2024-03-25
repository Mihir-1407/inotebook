import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	let navigate = useNavigate();

	const host = "http://localhost:5000";
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${host}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});
		const json = await response.json();
		console.log(json);

		if (json.success) {
			//Save the auth token and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/");
			props.showAlert("Logged In Successfully", "success");
		} else {
			props.showAlert("Invalid Credentials", "danger");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<h2>Hey! Please Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group my-3">
					<label htmlFor="exampleInputEmail1">Email </label>
					<input
						type="email"
						name="email"
						value={credentials.email}
						onChange={onChange}
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						name="password"
						value={credentials.password}
						onChange={onChange}
						className="form-control"
						id="password"
						placeholder="Password"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
