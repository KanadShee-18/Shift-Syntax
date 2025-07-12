import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isUserAuthenticated = async (req, res, next) => {
  try {
    console.log("Res cookies coming as: ", res.cookies);

    const token =
      req.cookies.authToken ||
      req.body.token ||
      req.header("authorization").replace("Bearer ", "");

    console.log(`Token comes in backend as: ${token}`);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is missing!",
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded data from token: ", decoded);
      next();
    } catch (error) {
      res.status(402).json({
        error: error.message,
        success: false,
        message: "Some error occurred while verifying the token.",
      });
    }
  } catch (error) {
    res.status(402).json({
      error: error.message ?? "Some internal error occurred",
      success: false,
      message: "Error in verifying the token",
    });
  }
};
