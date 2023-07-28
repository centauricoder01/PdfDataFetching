"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const DownloadPDF_1 = require("./Other_functions/DownloadPDF");
function takeURL(file_path, sheet_name, url_column) {
    try {
        const workbook = xlsx_1.default.readFile(file_path);
        const sheet = workbook.Sheets[sheet_name];
        const data = xlsx_1.default.utils.sheet_to_json(sheet);
        const urls = data.map((row) => row[url_column]).filter((url) => url);
        return urls;
    }
    catch (error) {
        console.error("Error extracting URLs:", error.message);
        return [];
    }
}
const file_path = "./Rajendra_assigment.xlsx";
const sheet_name = "Sheet1";
const url_column = "Invoice Download Link";
const urls = takeURL(file_path, sheet_name, url_column);
const outputFolder = "./pdf-storage";
(0, DownloadPDF_1.downloadPDFsFromUrls)(urls, outputFolder); // FUNCTOIN USED TO DOWNLOAD ALL THE PDF WITH LINK.
// Call the function to process the downloaded PDFs
//  processPDFs(urls, outputFolder);
