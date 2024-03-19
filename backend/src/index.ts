import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

//routes
import myUserRoute from "../routes/myUserRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database");
});

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/test", async (req: Request, res: Response) => {
//   res.json({ message: "hello" });
// });

app.use("/api/my/user", myUserRoute);

app.listen(8000, () => {
  console.log("Server starts on localhost:8000");
});

//password: vNouBkPBtI6zD5CD
