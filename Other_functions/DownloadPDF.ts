import axios from "axios";
import fs from "fs";
import path from "path";

async function downloadPDF(url:string, outputFolder:string) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1];

    const outputFile = path.join(outputFolder, filename);

    fs.writeFileSync(outputFile, response.data);

    console.log(`PDF file downloaded and saved to: ${outputFile}`);
  } catch (error) {
    console.error("Error downloading the PDF:", (error as Error).message);
  }
}

export async function downloadPDFsFromUrls(pdfUrls: string[], outputFolder:string) {
  try {
    for (const url of pdfUrls) {
      await downloadPDF(url, outputFolder);
    }
    console.log("All PDF files downloaded successfully.");
  } catch (error) {
    console.error("Error downloading PDFs:", (error as Error).message);
  }
}