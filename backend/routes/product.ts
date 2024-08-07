import express, { Router, Request, Response } from "express";
import { Product } from "../Schemas/product";
import { UploadedFile } from "express-fileupload";
import path from "path";

export const router: Router = express.Router();

router.get("/all", async (_: Request, res: Response) => {
  try {
    const result = await Product.find({}).exec();
    res.status(200).send({ products: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});
router.post("/add", async (req: Request, res: Response) => {
  try {
    if (req.files) {
      const uploadedFile: UploadedFile | UploadedFile[] = req.files
        .image as UploadedFile;
      const uploadPath: string = path.resolve("./public/" + uploadedFile.name);
      req.body.image = `${process.env.SERVER_URL}:${process.env.PORT}/${uploadedFile.name}`;
      await uploadedFile.mv(uploadPath);
      req.body.description = JSON.parse(req.body.description)
      const product = new Product(req.body);
      const result = await product.save();
      res.status(200).send({ product: result, message: "success" });
    }
    else{
      res.status(400).send("Product image is missing");
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error });
  }
});

router
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    try {
      const result = await Product.findById(req.params.id).exec();
      if (!result) {
        return res.status(404).send({ message: "Product doesn't exist." });
      }
      res.status(200).send({ product: result });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      await Product.updateOne({ _id: req.params.id }, req.body).exec();
      res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await Product.deleteOne({ _id: req.params.id }).exec();
      res.status(200).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  });
