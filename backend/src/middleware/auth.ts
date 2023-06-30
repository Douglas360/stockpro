import { NextFunction, Request, Response } from "express";
import { verify, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

interface Payload {
    sub: string;
}

interface AuthRequest extends Request {
    userId?: string;
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
    // Check if the JWT_SECRET environment variable is set
    if (!process.env.JWT_SECRET) {
        return next(new Error("JWT_SECRET environment variable is not set"));
    }

    // Receive the token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token was not provided" }).end();
    }

    const [, token] = authToken.split(" ");

    // Validate token
    try {
        const decodedToken = verify(token, process.env.JWT_SECRET) as Payload;
        req.userId = decodedToken.sub; // Attach the user ID to the request object
        return next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ error: "Token expired" }).end();
        }
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid Token" }).end();
        }
        return next(new Error("An error occurred while verifying the token"));
    }
}
