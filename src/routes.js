
var { generateTicketNumber } = require('./controller');
var express = require('express');

class Routes {

    static getRouter(){
        const router = express.Router();
        router.post('/ticket',generateTicketNumber);

        return router;
    }

}



module.exports = Routes.getRouter();