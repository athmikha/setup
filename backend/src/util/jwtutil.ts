import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export function generateJWTTokenUsingPrisma(userDetail: any): string {
  const tokenPayload = {
    email: userDetail.email,
    password: userDetail.password
  };
  const secretKey = "foxsens";
  const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
  console.log("Generated Token is : ", token);
  return token;
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken: string = req.headers.authorization as string;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new Error("You are not authorized to see this page.");
    }

    const token: string = bearerToken.split(" ")[1];

    if (!token) {
      throw new Error("You are not authorized to see this page.");
    }

    jwt.verify(token, "harbinger", async (err, payload) => {
      try {
        if (!err && payload) {
          req.user = payload as any; 
          next();
        } else {
          throw new Error("You are not authorized to see this page.");
        }
      } catch (err: any) {
        return res.status(401).json({ message: err.message });
      }
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};
