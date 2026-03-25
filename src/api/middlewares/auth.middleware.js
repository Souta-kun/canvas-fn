import { config } from "../../../config.js";
import { fail } from "../dtos/api-result.dto.js";

const getExpectedApiKey = () => config.API_KEY;
const getExpectedPin = () => config.PIN;

export const authMiddleware = (req, res, next) => {
  const expectedApiKey = getExpectedApiKey();
  const apiKey = req.header("api_key")?.trim();
  if (!expectedApiKey) {
    console.error("API key no configurada");
    return fail(res, 500, "API key no configurada");
  }
  if (!apiKey || apiKey !== expectedApiKey) {
    console.error("No autorizado");
    return fail(res, 401, "No autorizado");
  }
  const expectedPin = getExpectedPin();
  const pin = req.header("pin")?.trim();
  if (!expectedPin) {
    console.error("PIN no configurado");
    return fail(res, 500, "PIN no configurado");
  }
  if (!pin || pin !== expectedPin) {
    console.error("No autorizado");
    return fail(res, 401, "No autorizado");
  }
  return next();
};
