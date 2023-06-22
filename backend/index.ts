import express from "express";
import diagnoseRouter from "./src/routes/diagnose";
import patientRouter from "./src/routes/patient";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("PONG");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
