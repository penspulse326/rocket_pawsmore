import apiNext from "@/common/fetch/apiNext";

interface ResponseType {
  public_id: string;
  resource_type: string;
  secure_url: string;
}

export const mediaUpload = async (
  file: File,
  tag: string
): Promise<ResponseType> => {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const response = await fetch(apiNext.UPLOAD, {
          method: "POST",
          body: JSON.stringify({ file: reader.result, tag }),
        });
        const result = await response.json();

        if (!response.ok) {
          reject("Error uploading the photo");
        }
        resolve(result);
      } catch (error) {
        reject("Error uploading the photo");
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

      if (!response.ok) {
        reject("Error deleting the photo");
      }

      const result = await response.json();
      resolve(result);
    } catch (error) {
      console.error("Error deleting the photo:", error);
      reject(error);
    }
  });
};
