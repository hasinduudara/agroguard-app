import axios from 'axios';

// IMPORTANT: Replace this IP with your computer's actual IPv4 address
// You can find this by typing 'ipconfig' in your Windows Command Prompt
const BASE_URL = 'http://192.168.8.170:8000'; // I saw this IP in your Expo Go screenshot

// Function to send the image and language to the FastAPI backend
export async function analyzeCropImage(imageUri: string, language: string) {
  const formData = new FormData();

  // Extract file extension and create a filename
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const fileName = imageUri.split('/').pop() || `image.${fileType}`;

  // Append the image file to the FormData
  formData.append('images', {
    uri: imageUri,
    name: fileName,
    type: `image/${fileType}`,
  } as any);

  // Append the selected language to the FormData
  formData.append('language', language);

  try {
    // Send POST request to the backend
    const response = await axios.post(`${BASE_URL}/analyze-crop`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Backend Connection Error:", error);
    throw error;
  }
}