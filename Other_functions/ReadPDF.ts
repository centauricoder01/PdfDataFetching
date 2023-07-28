// @ts-ignore
const pdf = require('pdf-parse');

// ... (the rest of your previous code)

async function readPDFContent({ pdfPath }: { pdfPath: string; }): Promise<string> {
  try {
    const data = await pdf(pdfPath);
    return data.text;
  } catch (error) {
    throw new Error(`Error reading PDF ${pdfPath}: ${error}`);
  }
}

export async function processPDFs(urls: string[], outputFolder: string) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const fileName = url.split("/").pop();
    const pdfPath = `${outputFolder}/${fileName}`;

    try {
      // Read the content of the PDF
      const pdfContent = await readPDFContent({ pdfPath });

      // Do something with the PDF content, for example, log it or process it further
      console.log(`Content of ${pdfPath}:`);
      console.log(pdfContent);
    } catch (error) {
      console.error(error);
    }
  }
}


