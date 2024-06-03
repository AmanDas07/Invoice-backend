import { Request, Response, NextFunction } from 'express';
import { expressjwt as jwt } from 'express-jwt';

export const requireSignIn = jwt({
    secret: 'VCYGSCIAVBICUABICBABAIBICABIABSIUBALHSBCAB',
    algorithms: ['HS256'],
    requestProperty: 'auth',
});

/*export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
        return res.status(401).send({ message: "User not authenticated" });
    }

    next();
};*/