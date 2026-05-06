import jwt from "jsonwebtoken";

export const generateJwtToken = (data) => {
  try {
    const tokrn = jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    return tokrn;
  } catch (error) {
    throw new Error("Error generating JWT token: " , error.message);
  }
};
