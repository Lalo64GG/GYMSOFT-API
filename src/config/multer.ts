import path from "path";

export const MulterOptions = {
  uploadDir: path.join(process.cwd(), "uploads"),
  fileSize: 20 * 1024 * 1024,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
};
