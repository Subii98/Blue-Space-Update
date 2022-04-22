import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import Platform from "../models/platformModel.js";



const searchRouter = express.Router();


searchRouter.post("/", async (req, res) => {
    console.log('request to search router', req.body);
  var test = "/.*" + req.body.search + ".*/";
  console.log(test);
    Platform.find(
        {
            $or: [
                { title: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
                { tag1: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
                { tag2: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
                { tag3: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
                { userName: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
            ],
        },
        (err, item) => {
            if (err) {
                res.send(err);
            }
            console.log(item);
            console.log(item.length);
            let searchRes = [];

            item.forEach(function (doc) {
                searchRes.push(doc);
            });

            return res.status(200).json({
                success: true,
                search: searchRes,
                message: "User updated!",
            });
        }
    );
    
    
});


export default searchRouter;
