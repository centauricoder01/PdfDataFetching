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
exports.readPDFFile = void 0;
const fs_1 = __importDefault(require("fs"));
const pdfjs_dist_1 = __importDefault(require("pdfjs-dist"));
function readPDFFile(pdfFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read the PDF file as a buffer
            const pdfBuffer = fs_1.default.readFileSync(pdfFilePath);
            // Convert the Buffer to Uint8Array
            const uint8Array = new Uint8Array(pdfBuffer);
            // Load the PDF file using pdfjs-dist and await the promise
            const pdfDocument = yield pdfjs_dist_1.default.getDocument({ data: uint8Array })
                .promise;
            // Get the first (and only) page of the PDF
            const page = yield pdfDocument.getPage(1);
            // Extract text content from the page
            const textContent = yield page.getTextContent();
            const pdfText = textContent.items
                .map((item) => {
                if ("str" in item) {
                    return item.str;
                }
                else {
                    return "";
                }
            })
                .join(" ");
            return pdfText;
        }
        catch (error) {
            console.error("Error reading the PDF file:", error.message);
            return null;
        }
    });
}
exports.readPDFFile = readPDFFile;
