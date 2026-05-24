export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  ADD_PRODUCT: `${BASE_URL}/product/addproduct`,
  IMAGE_UPLOAD: `${BASE_URL}/image/upload`,
  IMAGE_PHOTO_UPLOAD: `${BASE_URL}/image/photoupload`,
};
