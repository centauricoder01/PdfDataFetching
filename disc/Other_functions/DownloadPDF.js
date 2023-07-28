"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPDFsFromUrls = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function downloadPDF(url, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url, {
                responseType: "arraybuffer",
            });
            const urlParts = url.split("/");
            const filename = urlParts[urlParts.length - 1];
            const outputFile = path_1.default.join(outputFolder, filename);
            fs_1.default.writeFileSync(outputFile, response.data);
            console.log(`PDF file downloaded and saved to: ${outputFile}`);
        }
        catch (error) {
            console.error("Error downloading the PDF:", error.message);
        }
    });
}
function downloadPDFsFromUrls(pdfUrls, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const url of pdfUrls) {
                yield downloadPDF(url, outputFolder);
            }
            console.log("All PDF files downloaded successfully.");
        }
        catch (error) {
            console.error("Error downloading PDFs:", error.message);
        }
    });
}
exports.downloadPDFsFromUrls = downloadPDFsFromUrls;
