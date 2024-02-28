import { Response, Request, NextFunction } from "express";
export declare function generateJWTTokenUsingPrisma(userDetail: any): string;
export declare const verifyAccessToken: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
