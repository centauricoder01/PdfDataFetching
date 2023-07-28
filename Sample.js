import XLSX from "xlsx";
import axios from "axios";
import fs from "fs";
import path from "path";
import pdfjsLib from "pdfjs-dist";
import { Buffer } from "buffer";

// FUNCTION TO READ THE URL FROM .XLSX FILE

function takeURL(
  file_path,
  sheet_name,
  url_column
) {
  try {
    // Read the workbook
    const workbook = XLSX.readFile(file_path);

    // Select the sheet by name
    const sheet = workbook.Sheets[sheet_name];

    // Convert the sheet to a JSON object
    const data = XLSX.utils.sheet_to_json(sheet);

    // Extract the URLs from the specified column
    const urls = data.map((row) => row[url_column]).filter((url) => url);

    return urls;
  } catch (error) {
    console.error("Error extracting URLs:", error.message);
    return [];
  }
}

const file_path = "./Rajendra_assigment.xlsx";
const sheet_name = "Sheet1";
const url_column = "Invoice Download Link";

const urls = takeURL(file_path, sheet_name, url_column);

// FUNCTION TO DOWNLOAD THE PDF.

async function downloadPDF(url, outputFolder) {
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
    console.error("Error downloading the PDF:", error.message);
  }
}

// FUNCTION TO DOWNLOAD THE PDF FROM THE ARRAY

async function downloadPDFsFromUrls(pdfUrls, outputFolder) {
  try {
    for (const url of pdfUrls) {
      await downloadPDF(url, outputFolder);
    }
    console.log("All PDF files downloaded successfully.");
  } catch (error) {
    console.error("Error downloading PDFs:", error.message);
  }
}

const outputFolder = "./pdf-storage";

downloadPDFsFromUrls(urls, outputFolder);

// FUNCTION TO READ THE PDF FILE AND STORE THE DATA.

async function readPDFFile(pdfFilePath) {
  try {
    // Read the PDF file as a buffer
    const pdfBuffer = fs.readFileSync(pdfFilePath);

    // Convert the Buffer to Uint8Array
    const uint8Array = new Uint8Array(pdfBuffer);

    // Load the PDF file using pdfjs-dist and await the promise
    const pdfDocument = await pdfjsLib.getDocument({ data: uint8Array })
      .promise;

    // Get the first (and only) page of the PDF
    const page = await pdfDocument.getPage(1);

    // Extract text content from the page
    const textContent = await page.getTextContent();
    const pdfText = textContent.items.map((item) => item.str).join(" ");

    return pdfText;
  } catch (error) {
    console.error("Error reading the PDF file:", error.message);
    return null;
  }
}

// Example usage:
const pdfFilePath = "./pdf-storage/raj.pdf";
const outputFilePath = "output.xlsx";

readPDFFile(pdfFilePath)
  .then((pdfText) => {
    if (pdfText) {
      console.log("PDF content:");
      console.log(pdfText);
      //   saveToExcel(pdfText, outputFilePath);
    }
  })
  .catch((error) => console.error(error));

//   FUNCTION TO WRITE ALL THE DATA IN .XLSX FILE

// async function saveToExcel(pdfText, outputFilePath) {
//   try {
//     // Split the extracted text into lines
//     const lines = pdfText.split("\n");

//     // Create a new workbook
//     const workbook = await XlsxPopulate.fromBlankAsync();

//     // Select the first sheet in the workbook
//     const sheet = workbook.sheet(0);

//     // Write the data to the Excel sheet
//     for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
//       const line = lines[rowIndex];
//       // Assuming data in each line is separated by a delimiter (e.g., comma)
//       const data = line.split(",");

//       for (let colIndex = 0; colIndex < data.length; colIndex++) {
//         const value = data[colIndex];
//         // Write the value to the cell in the Excel sheet
//         sheet.cell(rowIndex + 1, colIndex + 1).value(value);
//       }
//     }

//     // Save the workbook to the specified output file
//     await workbook.toFileAsync(outputFilePath);
//     console.log("Data saved to Excel file:", outputFilePath);
//   } catch (error) {
//     console.error("Error saving to Excel file:", error.message);
//   }
// }
