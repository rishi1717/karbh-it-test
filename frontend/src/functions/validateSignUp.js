const validateSignUp = (data) => {
	const errors = {}
	const pswPattern = /^[a-zA-Z0-9]{8,}$/
	const mobilePattern = /^[0-9]{10}$/
	if (data.get("name").length < 3) {
		errors.name = "Name must be at least 3 characters"
	}
	if (pswPattern.test(data.get("password")) === false) {
		errors.password = "Password must not contain special characters"
	}
	if (mobilePattern.test(data.get("mobile")) === false) {
		errors.mobile = "Not a valid mobile number"
	}
	if (data.get("mobile").length !== 10) {
		errors.mobile = "Mobile must be 10 digits"
	}
	if (data.get("password").length < 8) {
		errors.password = "Password must be at least 8 characters"
	}
	if (!data.get("name")) {
		errors.name = "Name is required"
	}
	if (!data.get("mobile")) {
		errors.mobile = "Mobile number is required"
	}
	if (!data.get("password")) {
		errors.password = "Password is required"
	}
	return errors
}

export default validateSignUp
