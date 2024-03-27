import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {

  origin: function (origin, callback) {

    const whitelist = [process.env.FRONTEND_URL];

    // Allow API requests throught Thunder Client
    if(process.argv[2] === '--api'){
      whitelist.push(undefined)
    }

    // Allow requests with localhost:port as origin
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
