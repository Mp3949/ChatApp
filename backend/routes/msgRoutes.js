import express from "express";
import { getMessage, sendMessage } from "../controllers/msgController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage); // ID  JENE SEND KRE CHHE TENI ID
router.route("/:id").get(isAuthenticated,getMessage); // receiverId

export default router;