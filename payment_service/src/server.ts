import { ExpressApp } from "./express-app";
import { logger } from "./utils";
const PORT = process.env.APP_PORT || 9003;

export const StartServer = async () => {
  const expressApp = await ExpressApp();
  expressApp.listen(PORT, () => logger.info(`App is listening port ${PORT}!`));

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("server is on");
});
