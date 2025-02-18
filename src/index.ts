import { app } from "./cmd/server"
import { Signale } from "signale";
import { database } from "./db/Database";
const logger = new Signale({
  secrets: ["([0-9]{4}-?)+"],
});

const port = process.env.PORT || 3000;

try {
  //database.connect();
  console.log("Servidor iniciado correctamente");
  app.listen(port, () => {
    logger.success("Server listening on port:", port);
  });
} catch (error) {
  console.error("No se pudo iniciar el servidor:", error);
}