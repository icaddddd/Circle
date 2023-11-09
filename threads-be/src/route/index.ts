import express = require("express");
import { Request, Response } from "express";
import controllersThreads from "../controllers/ThreadController";
import AuthController from "../controllers/AuthController";
import { upload } from "../middlewares/uploadFIle";
import authenticate from "../middlewares/auth";
import LikesController from "../controllers/LikesController";
import RepliesController from "../controllers/RepliesController";
import FollowController from "../controllers/FollowController";
import ProfileUserController from "../controllers/ProfileUserController";
import ThreadOrang from "../services/ThreadOrang";
import SearchController from "../controllers/SearchController";

const router = express.Router();

// router.get("/", (req: Request, res: Response) => {
//     res.send("Hello from v1")
// })

// router.get("/threads", (req: Request, res: Response) => {
//     res.status(200).json({
//         message: "Hello this is threads!"
//     })
// })

router.get("/thread", authenticate, controllersThreads.find);
router.get("/thread/:id", authenticate, controllersThreads.findOne);
// router.post("/thread", authenticate, upload("image"), ThreadQueue.create);
router.post("/thread", authenticate, upload("image"), controllersThreads.create);
// router.delete("/thread/delete/:id", controllersThreads.delete)
// router.patch("/thread/update/:id", controllersThreads.update)

router.get("/users", authenticate, FollowController.notFollowed);

router.get("/follows", authenticate, FollowController.find);
router.post("/follow", authenticate, FollowController.create);
router.delete(
  "/follow/:followed_user_id",
  authenticate,
  FollowController.delete
);

router.post("/like", authenticate, LikesController.create);
router.delete("/like/:thread_id", authenticate, LikesController.delete);

router.get("/replies", authenticate, RepliesController.find);
router.post("/reply", authenticate, RepliesController.create);

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/check", authenticate, AuthController.checking);

router.patch("/user/update/:id", authenticate, upload("picture"), ProfileUserController.patch);
router.get("/user/:id", authenticate, ProfileUserController.findOne); 
router.get("/userprofile/:id", authenticate, ProfileUserController.findAll);

router.get("/threadorang/:id", authenticate, ThreadOrang.findOne);

router.get("/search", authenticate, SearchController.findAll);

export default router;
