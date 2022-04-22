import express from "express";
import expressAsyncHandler from "express-async-handler";
import Platform from "../models/platformModel.js";
import data from "../data.js";
import QuizModel from "../models/quizModel.js";
import { uploadModule } from "../utils.js";

const platformRouter = express.Router();

platformRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({}); // db select
        res.send(platform);
    })
);

platformRouter.get(
    "/test/insert",
    expressAsyncHandler(async (req, res) => {
        const createdPlatform = await Platform.insertMany(data.platform); // data.js dbinsert
        res.send({ createdPlatform });
    })
);

platformRouter.get(
    "/test/update",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ _id: "618bff04ec6c011eaf2092cc" });
        const editPlatform = await Platform.updateOne(
            { _id: "618bff04ec6c011eaf2092cc" },
            { $set: { title: "newtitle2" } }
        );
        res.send(editPlatform);
    })
);

platformRouter.get(
    "/test/select",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ userName: { $eq: "subinpark22" } }); // db select
        res.send(platform);
    })
);

platformRouter.post(
    "/insert",
    uploadModule.array("file"),
    expressAsyncHandler(async (req, res) => {
        try {
            const {
                userId,
                userName,
                title,
                description,
                subscriber,
                fontFamily,
                titleFontSize,
                descFontSize,
                fontColor,
                tag1,
                tag2,
                tag3,
                quizId,
            } = req.body;
            const bannerPath = req.files[0] ? "/" + req.files[0].path : "";
            const iconPath = req.files[1] ? "/" + req.files[1].path : "";

            const createdPlatform = await Platform.insertMany([
                {
                    userId: userId,
                    userName: userName,
                    // name : name,
                    title: title,
                    description: description,
                    subscriber: subscriber,
                    icon: iconPath,
                    banner: bannerPath,
                    fontFamily: fontFamily,
                    titleFontSize: titleFontSize,
                    descFontSize: descFontSize,
                    fontColor: fontColor,
                    tag1: tag1,
                    tag2: tag2,
                    tag3: tag3,
                    quizId: quizId,
                },
            ]);
            res.send(createdPlatform);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    })
);

// platformRouter.get(
//     "/:userId",
//     expressAsyncHandler(async (req, res) => {
//         const platform = await Platform.findById(req.params.userId);
//         if (platform) {
//             res.send(platform);
//         } else {
//             res.status(404).send({ message: "Platform Not Found" });
//         }
//     })
// );

platformRouter.get(
    "/:userId",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ userId: req.params.userId });
        if (platform) {
            res.send(platform);
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

platformRouter.get(
    "/name/:userName",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.find({ userName: req.params.userName });
        if (platform) {
            res.send(platform);
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

platformRouter.get(
    "/by_id/:_id",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.findById(req.params._id);
        if (platform) {
            res.send(platform);
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

// platformRouter.delete(
//   "/delete/:userId",
//   expressAsyncHandler(async (req, res) => {
//     const platform = await Platform.findById(req.params.userId);
//     if (platform) {
//       const delPlatform = await Platform.deleteOne(platform);
//       res.send({ message: "plaform deleted" });
//     } else {
//       res.status(404).send({ message: "Platform Not Found" });
//     }
//   })
// );

platformRouter.delete(
    "/platformDelete",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.findById(req.body.platformId);
        if (platform) {
            const delPlatform = await Platform.deleteOne(platform);
            res.send({ message: "plaform deleted" });
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

platformRouter.post(
    "/edit",
    uploadModule.array("file"),
    expressAsyncHandler(async (req, res) => {
        const {
            userName,
            title,
            description,
            fontColor,
            tag1,
            tag2,
            tag3,
            platformId,
            icon,
            banner,
        } = req.body;
        const banner_changed = parseInt(req.body.banner_changed);
        const icon_changed = parseInt(req.body.icon_changed);
        let bannerPath = banner;
        let iconPath = icon;
        if (banner_changed && req.files[0]) {
            let file = req.files[0];
            bannerPath = file.path[0] == "/" ? file.path : "/" + file.path;
        }

        if (icon_changed) {
            let file = banner_changed ? req.files[1] : req.files[0];
            if (file) iconPath = file.path[0] == "/" ? file.path : "/" + file.path;
        }

        const editPlatform = await Platform.updateOne(
            { _id: platformId },
            {
                $set: {
                    title: title,
                    description: description,
                    fontColor: fontColor,
                    tag1: tag1,
                    tag2: tag2,
                    tag3: tag3,
                    icon: iconPath,
                    banner: bannerPath,
                },
            }
        );
        res.send(editPlatform);
    })
);

// platformRouter.post(
//   "/edit",
//   expressAsyncHandler(async (req, res) => {
//     const {
//       // userId ,
//       // userName,
//       title,
//       description,
//       // subscriber,
//       // icon,
//       banner,
//       // fontFamily,
//       // titleFontSize,
//       // descFontSize,
//       fontColor,
//       tag1,
//       tag2,
//       tag3,
//       // quizId,
//       platformId,
//     } = req.body;

//     const editPlatform = await Platform.updateOne(
//       { _id: platformId },
//       {
//         $set: {
//           title: title,
//           description: description,
//           // subscriber,
//           // icon,
//           banner: banner,
//           // fontFamily,
//           // titleFontSize,
//           // descFontSize,
//           fontColor: fontColor,
//           tag1: tag1,
//           tag2: tag2,
//           tag3: tag3,
//         },
//       }
//     );
//     res.send(editPlatform);
//   })
// );

platformRouter.put(
    "/update/:userId",
    expressAsyncHandler(async (req, res) => {
        const platform = await Platform.findById(req.params.userId);
        if (platform) {
            await Platform.updateOne({ _id: req.params.userId });
            res.send({ message: "plaform updated" });
        } else {
            res.status(404).send({ message: "Platform Not Found" });
        }
    })
);

export default platformRouter;
