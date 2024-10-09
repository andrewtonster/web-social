import express from "express";
import { getPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
// router.get("/", addPost);
export default router;
