import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imagePath: string): Promise<string> => {
  console.log('📁 Running OCR with Tesseract on:', imagePath);

  try {
    const result = await Tesseract.recognize(imagePath, 'eng', {
      logger: m => console.log(m), // Optional: progress logs
    });

    const extractedText = result.data.text.trim();
    console.log('📝 Extracted text:', extractedText);

    return extractedText;
  } catch (error) {
    console.error('❌ Tesseract OCR failed:', error);
    throw new Error('Tesseract OCR failed');
  }
};
