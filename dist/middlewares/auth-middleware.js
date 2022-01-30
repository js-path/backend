"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = require("../service/token-service");
function default_1(req, res, next) {
    try {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(req.headers));
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(400).json({ message: 'Դուք լօգին եղած չեք։' });
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(400).json({ message: 'Դուք լօգին եղած չեք։' });
        }
        const userData = token_service_1.tokenService.validate(accessToken);
        if (!userData) {
            return res.status(400).json({ message: 'Դուք լօգին եղած չեք։' });
        }
        // req.user = userData;
        next();
    }
    catch (e) {
        return res.status(400).json({ message: 'Դուք լօգին եղած չեք։' });
    }
}
exports.default = default_1;
;
//# sourceMappingURL=auth-middleware.js.map