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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPDFs = void 0;
// @ts-ignore
const pdf = require('pdf-parse');
// ... (the rest of your previous code)
function readPDFContent({ pdfPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield pdf(pdfPath);
            return data.text;
        }
        catch (error) {
            throw new Error(`Error reading PDF ${pdfPath}: ${error}`);
        }
    });
}
function processPDFs(urls, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const fileName = url.split("/").pop();
            const pdfPath = `${outputFolder}/${fileName}`;
            try {
                // Read the content of the PDF
                const pdfContent = yield readPDFContent({ pdfPath });
                // Do something with the PDF content, for example, log it or process it further
                console.log(`Content of ${pdfPath}:`);
                console.log(pdfContent);
            }
            catch (error) {
                console.error(error);
            }
        }
    });
}
exports.processPDFs = processPDFs;
