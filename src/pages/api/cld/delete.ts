import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseType = {
  public_id: string;
  resource_type: "image" | "video";
  secure_url: string;
};

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType | any>
) {
  const { publicId, resourceType } = JSON.parse(req.body);
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/${resourceType}/destroy`;
  const apiSecret = process.env.CLOUDINARY_SECRET!;
  const apiKey = process.env.CLOUDINARY_KEY!;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const formData = new FormData();

  formData.append("public_id", publicId);
  formData.append("signature", signature);
  formData.append("timestamp", new Date().getTime().toString());
  formData.append("api_key", apiKey);

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
