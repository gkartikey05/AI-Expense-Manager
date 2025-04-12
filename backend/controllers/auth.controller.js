const { registerSchema, loginSchema } = require("../utils/zodSchema");
const prisma = require("../utils/prisma");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//---------------register controller-----------------------
const registerController = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { fullName, email, password } = result.data;

    const isEmailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (isEmailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    // generate token
    generateToken(res, user.id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in registerController:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//--------------login controller---------------------------
const loginController = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { email, password } = result.data;

    // get user info
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // match password
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Password did not match",
      });
    }

    // get user details except password
    const user = await prisma.user.findUnique({
      where: {
        id: userExists.id,
      },
      omit: {
        password: true,
      },
    });

    generateToken(res, user.id);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//--------------logout controller--------------------------
const logoutController = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.clearCookie("token", options);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



module.exports = {
  registerController,
  loginController,
  logoutController,
};
