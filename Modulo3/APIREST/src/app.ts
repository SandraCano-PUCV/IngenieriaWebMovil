import express from "express";
import usersRoutes from "./routes/users.routes.js";
const app = express();

app.use(express.json());
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando con Express y TypeScript"
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});