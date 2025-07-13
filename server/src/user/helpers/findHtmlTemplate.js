import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const findHtmlTemplate = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatePath = `${__dirname}/htmlTemplate.html`;
  if (!fs.existsSync(templatePath)) {
    return null;
  }
  const htmlTemplate = fs.readFileSync(
    `${__dirname}/htmlTemplate.html`,
    "utf-8"
  );
  return htmlTemplate;
};
