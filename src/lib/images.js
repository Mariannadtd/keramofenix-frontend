const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

function hasCloudinaryTransform(pathAfterUpload) {
  const firstSegment = pathAfterUpload.split("/")[0] || "";
  return firstSegment.includes(",") || /^[a-z]_[^/]+/.test(firstSegment);
}

export function cloudinaryImage(src, transform) {
  if (!src || !transform) return src || "";

  const url = String(src);
  const uploadIndex = url.indexOf(CLOUDINARY_UPLOAD_SEGMENT);
  if (uploadIndex === -1) return url;

  const pathStart = uploadIndex + CLOUDINARY_UPLOAD_SEGMENT.length;
  const pathAfterUpload = url.slice(pathStart);
  if (!pathAfterUpload || hasCloudinaryTransform(pathAfterUpload)) return url;

  return `${url.slice(0, pathStart)}${transform}/${pathAfterUpload}`;
}

export function cardImageUrl(src) {
  return cloudinaryImage(src, "f_auto,q_auto:eco,c_fill,g_auto,w_520,h_520");
}

export function productPreviewUrl(src) {
  return cloudinaryImage(src, "f_auto,q_auto,c_limit,w_1200");
}

export function thumbnailUrl(src) {
  return cloudinaryImage(src, "f_auto,q_auto:eco,c_fill,g_auto,w_160,h_160");
}
