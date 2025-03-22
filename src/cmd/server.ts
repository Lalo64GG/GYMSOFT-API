import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "../config/cors";
import { outletRouter } from "../outlets/infraestructure/http/routers/OutletRouter";
import { gimnasioRouter } from "../gimnasio/infraestructure/http/routers/GimnasioRouter";
import { routerUpload } from "../shared/FilesUpload/infraestructure/http/routers/RouterUploads";
import { planRouter } from "../plans/infrastructure/http/routers/PlanRouter";
import { userRouter } from "../user/infraestructure/http/routers/RouterUser";
import { ownerRouter } from "../owner/infrastructure/http/routers/OwnerRouter";

dotenv.config();

export const app = express();

app.use(helmet.hidePoweredBy());
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/owner", ownerRouter);
app.use("/outlet", outletRouter);
app.use("/plan", planRouter);
app.use("/gimnasio", gimnasioRouter);
app.use("/user", userRouter)
app.use("/files", routerUpload);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is running");
});
