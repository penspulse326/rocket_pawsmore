import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | any>
) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;
  const { file, tag } = JSON.parse(req.body);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.UPLOAD_PRESRT!);
  formData.append("tags", tag);

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}
