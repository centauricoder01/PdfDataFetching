const XLSX = require("xlsx");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const pdfjsLib = require("pdfjs-dist");
const { Buffer } = require("buffer");


// FUNCTION TO READ THE URL FROM .XLSX FILE

function takeURL(file_path, sheet_name, url_column) {
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

// downloadPDFsFromUrls(urls, outputFolder);

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

readPDFFile(pdfFilePath)
  .then((pdfText) => {
    if (pdfText) {
      console.log("PDF content:");
      console.log(pdfText);
    }
  })
  .catch((error) => console.error(error));
