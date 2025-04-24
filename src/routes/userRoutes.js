import { Router } from "express";
import { getUserById, getUsers, updateUser, createUser, deleteUser } from "../controllers/userControler.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
