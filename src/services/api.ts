import axios from 'axios';

// Base URL pointing to the FastAPI server
const BASE_URL = 'http://192.168.1.3:8000'; 

export async function analyzeCropImage(imageUris: string[], textQuery: string, language: string) {
  const formData = new FormData();

  // Append text query if provided
  if (textQuery) {
    formData.append('text_query', textQuery);
  }

  // Append language preference
  formData.append('language', language);

  // Append up to 3 images
  imageUris.forEach(function(uri, index) {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const fileName = uri.split('/').pop() || `image_${index}.${fileType}`;

    formData.append('images', {
      uri: uri,
      name: fileName,
      type: `image/${fileType}`,
    } as any);
  });

  try {
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