"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSignIn = void 0;
const express_jwt_1 = require("express-jwt");
exports.requireSignIn = (0, express_jwt_1.expressjwt)({
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
