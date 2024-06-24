import axios from 'axios';

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
const UploadImage = async (dataInput: string) => {
  try {
    const formData = new FormData();
    formData.append('file', dataInput);
    formData.append('upload_preset', VITE_UPLOAD_PRESET);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      formData
    );
    return data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export { UploadImage };
