import express, { Request, Response } from "express";
import prisma from "../prisma/client";


const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include:{
        teacher_sub:true,
        userAuth:true
      }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
})


router.post("/", async (req: Request, res: Response) => {
  const { formData } = req.body;
  try {
    const name=formData.get("name") as string;
    const email = formData.get("email") as string;
    const photo_profile = formData.get("photo_profile") as string;
    const classes = formData.get("clasess") as string;
    const absent = formData.get("absent") as string;
    const generation = formData.get("generation") as string;
    const school_origin = formData.get("school_origin") as string;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        photo_profile,
        absent,
        generation,
        classes,
        school_origin,
      }
    });
    res.status(201).json(newUser);
    
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
