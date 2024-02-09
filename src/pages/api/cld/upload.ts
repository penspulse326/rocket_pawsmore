import type { NextApiRequest, NextApiResponse } from "next";

// next 內部設定，預設為 1mb
export const config = {
  api: {
    bodyParser: { sizeLimit: "25mb" },
  },
};

interface ResponseType {
  public_id: string;
  resource_type: string;
  secure_url: string;
}

interface TagsType {
  [key: string]: string;
}

const folders: TagsType = {
  member: "member",
  pet: "pet",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | any>
) {
  const { CLOUDINARY_NAME, CLOUDINARY_PRESRT } = process.env;
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`;
  const { file, tag } = JSON.parse(req.body);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", folders[tag]);
  formData.append("upload_preset", CLOUDINARY_PRESRT!);
  formData.append("tags", tag);

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: result });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error });
  }
}
