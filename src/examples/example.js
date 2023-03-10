import { HttpStatusCode } from "../constants/HttpStatusCode.constants.js";
import { SweetPotatoApp } from "../index.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { registerRoutes } from "./routes/index.js";

async function bootstrap() {
    const app = new SweetPotatoApp(); //loading app instance

    app.registerGlobalPrefix('api/v1'); //registering global prefix
    
    registerRoutes(app); //loading routes from other files

    app.get('example', loggerMiddleware, async ({headers, queries, params}) => {
        // you can get the headers, body, query params and route params from request and also add multiples middlewares
        app.finishRequest(HttpStatusCode.SUCCESS,{ //default code=200
            received: {
                headers,
                queries,
                params
            }
        })
    });
    app.listen();//default port is 8000
}
bootstrap();