const prisma = require("../utils/prisma");
const { userSchema } = require("../utils/zodSchema");
const uploadToCloudinary = require("../config/cloudinary");

// get user data
const getUserData = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        transactions: true,
        goals: true,
        budgets: true,
      },
      omit: { password: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
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

// ------------user update controller-----------------
const updateUserData = async (req, res) => {
  const userId = req.userId;

  try {
    const file = req.file;

    // Validate data
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { fullName, phoneNumber } = result.data;

    // Create update object
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    // Upload image if exists
    if (file) {
      const imageUrl = await uploadToCloudinary(file.path);
      if (imageUrl) updateData.profile = imageUrl;
    }

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  updateUserData,
  getUserData,
};
