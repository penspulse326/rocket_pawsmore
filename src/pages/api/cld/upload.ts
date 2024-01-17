import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | any>
) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;
  const data = JSON.parse(req.body);
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("upload_preset", process.env.UPLOAD_PRESRT!);
  formData.append("tags", "test");

  console.log(data);

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

type ResponseType = {
  public_id: string;
  resource_type: string;
  secure_url: string;
};
