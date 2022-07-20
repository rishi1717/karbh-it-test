const validateSignIn = (data) => {
	const errors = {}
	if (!data.get("mobile")) {
		errors.mobile = "Mobile number is required"
	}
	if (!data.get("password")) {
		errors.password = "Password is required"
	}
	return errors
}

export default validateSignIn
