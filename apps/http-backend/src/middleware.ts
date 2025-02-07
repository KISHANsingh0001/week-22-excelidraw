import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface customizedRequest extends Request {
    userId: string;
}
export function middleware(req: customizedRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers["authorization"] ?? "";

        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded === String) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "Unauthorized"
            })
        }
    }
    catch(e){
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}