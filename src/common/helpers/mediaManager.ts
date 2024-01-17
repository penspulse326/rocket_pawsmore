export const mediaUpload = async (file: File): Promise<ResponseType> => {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const response = await fetch("/api/cld/upload", {
          method: "POST",
          body: JSON.stringify({ file: reader.result }),
        });
        const result = await response.json();
        resolve(result);
      } catch (error) {
        console.error("Error uploading the file:", error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
      reject(error);
    };
  });
};

export const mediaDelete = async (publicId: string, resourceType: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/cld/delete", {
        method: "POST",
        body: JSON.stringify({ publicId, resourceType }),
      });
      const result = await response.json();
      resolve(result);
    } catch (error) {
      console.error("Error deleting the file:", error);
      reject(error);
    }
  });
};

type ResponseType = {
  public_id: string;
  resource_type: string;
  secure_url: string;
};
