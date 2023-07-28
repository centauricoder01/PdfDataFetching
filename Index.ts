import  XLSX from "xlsx";
import axios  from "axios";
import fs  from "fs";
import path  from "path";
import pdfjsLib  from "pdfjs-dist";
import { Buffer }  from "buffer";

// FUNCTION TO READ THE URL FROM .XLSX FILE

interface DataRow {
  [key: string]: string; // Assuming all properties in the row are strings
}

function takeURL(file_path:string, sheet_name:string, url_column:string): string[] {
  try {
    // Read the workbook
    const workbook = XLSX.readFile(file_path);

    // Select the sheet by name
    const sheet = workbook.Sheets[sheet_name];

    // Convert the sheet to a JSON object
    const data: DataRow[] = XLSX.utils.sheet_to_json(sheet);

    // Extract the URLs from the specified column
    const urls:string[] = data.map((row:DataRow) => row[url_column]).filter((url) => url);

    return urls;
  } catch (error) {
    console.error("Error extracting URLs:", (error as Error).message);
    return [];
  }
}

const file_path = "./Rajendra_assigment.xlsx";
const sheet_name = "Sheet1";
const url_column = "Invoice Download Link";

const urls = takeURL(file_path, sheet_name, url_column);

console.log(urls)