//create helper method that validate user data on signup process
exports.userSignupValidator = (req,res,next) => {
    //check() comes coz we have validator method
    req.check("name", "Name is required").notEmpty();
    //use reqular expressions to check email
    req.check("email", "Email must be between 3 to 32 characters")
        //check for email pattern
        .matches(/.+\@.+\..+/)
        // send message
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
        //check for password, if we don't get password send message "password is required"
        req.check("password", "Password is required").notEmpty();
        req.check("password")
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/) // atleast 1 digit
        .withMessage("Password must contain a number");
        const errors = req.validationErrors(); // returns errors
        //check for error, if error, map through each of the errors and return the 1st error as json response
        if(errors){
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({error: firstError});
        }
        next(); // whether it succeeded or failed, it will check for other phase, otherwise if we don't put next our application will hault
        // everytime to create middleware we need to have next()


};