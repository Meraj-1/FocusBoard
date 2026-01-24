import multer from "multer";
import fs from "fs";
import path from "path";

const projectUploadPath = path.join("uploads", "projects");

// ensure folder exists
if (!fs.existsSync(projectUploadPath)) {
  fs.mkdirSync(projectUploadPath, { recursive: true });
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, projectUploadPath); // folder path
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
});
