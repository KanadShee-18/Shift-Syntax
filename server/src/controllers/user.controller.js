import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    if (!username || !email || !password) {
      res.status(401).json({
        success: false,
        message: "All fields are mantatory to register!",
      });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({
        success: false,
        message: "User with same email exists!",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // const hashedPassword = await argon2.hash(password);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    res.status(200).json({
      success: true,
      message: "User has been registered successfully!",
      data: {
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
      },
    });
  } catch (error) {
    console.log("Error in registering the user: ", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while registering the user!",
      error: error.message ?? "Some non user friendly error",
    });
    return;
  }
};

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(401).json({
//         success: false,
//         message: "All fields are required",
//       });
//       return;
//     }

//     const doesUserExists = await User.findOne({ email }).exec();
//     if (!doesUserExists) {
//       return res.status(404).json({
//         success: false,
//         message: "User not exists in DB. Please register first",
//       });
//     }

//     const payload = {
//       email: doesUserExists.email,
//       id: doesUserExists.id,
//     };

//     if (await bcrypt.compare(password, doesUserExists.password)) {
//       const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "24h",
//       });
//       const user = doesUserExists.toObject();
//       user.token = token;
//       user.password = undefined;

//       const options = {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         // secure: process.env.NODE_ENV === "production",
//         httpOnly: true,
//       };

//       res
//         .status(200)
//         .cookie("authToken", token, options)
//         .json({
//           success: true,
//           message: "Login Successfull!",
//           loggedUser: {
//             token,
//             data: user,
//           },
//         });
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "Password is not correct",
//       });
//     }
//   } catch (error) {
//     console.log("Error in signing in the user: ", error);
//     return res.status(500).json({
//       success: false,
//       message: "Some error occurred while signing the user!",
//       error: error.message ?? "Some non user friendly error",
//     });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password both fields are required!",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not exists!",
      });
    }
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("Password matching res: ", passwordMatched);

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Password is not correct!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Login Successfull!",
      });
    }
  } catch (error) {
    console.log("Error in logging in the user: ", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while logging the user!",
      error: error.message ?? "Some non user friendly error",
    });
    return;
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    const dbUser = await User.findById(userId);

    res.status(200).json({
      success: true,
      data: {
        id: dbUser._id,
        email: dbUser.email,
        username: dbUser.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.json({
      success: true,
      message: "User logout successfully!",
    });
  } catch (error) {
    console.log("Error while logging out the user", error);
    return res.status(500).json({
      success: false,
      error: error.message ?? "Some internal error occurred!!",
    });
  }
};
