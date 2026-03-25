import serverless from "serverless-http";
import { router } from "../src/api/routes/index";
import { app } from "../src/api/server";

app.use("/.netlify/functions/app", router);
export const handler = serverless(app);
