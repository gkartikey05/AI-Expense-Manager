const jwt = require("jsonwebtoken");

const generateToken = (res, id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    const options = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, options);
  } catch (err) {
    console.error("Error in generating token:", err);
  }
};

module.exports = generateToken;
