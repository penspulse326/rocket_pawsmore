const getMediaId = (url: string) => {
  return url.split("/").slice(-2).join("/").split(".")[0];
};

export default getMediaId;
