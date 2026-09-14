import axios from 'axios';

// Base URL pointing to the FastAPI server
const BASE_URL = 'http://192.168.8.170:8000'; 

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
    // Send POST request to the backend with the correct full path
    const response = await axios.post(`${BASE_URL}/api/app/analyze-crop`, formData, {
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