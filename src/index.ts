import { app } from "./cmd/server";
import { Signale } from "signale";
import { database } from "./db/Database";

const logger = new Signale({
  secrets: ["([0-9]{4}-?)+"],
});

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await database.connect();
   
    app.listen(port, () => {
      logger.success(`Server listening on port: ${port}`);
    });
  } catch (error) {
    logger.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer(); 
