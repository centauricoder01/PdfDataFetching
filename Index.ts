import  XLSX from "xlsx";
import { downloadPDFsFromUrls } from "./Other_functions/DownloadPDF";

// FUNCTION TO READ THE URL FROM .XLSX FILE

interface DataRow {
  [key: string]: string; 
}

function takeURL(file_path:string, sheet_name:string, url_column:string): string[] {
  try {
    const workbook = XLSX.readFile(file_path);

    const sheet = workbook.Sheets[sheet_name];

    const data: DataRow[] = XLSX.utils.sheet_to_json(sheet);

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
const outputFolder = "./pdf-storage";


 downloadPDFsFromUrls(urls, outputFolder);  // FUNCTOIN USED TO DOWNLOAD ALL THE PDF WITH LINK.


