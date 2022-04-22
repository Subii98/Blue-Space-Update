import multer from "multer";
import path from "path";

export const uploadModule = multer({ dest : "./uploads"});