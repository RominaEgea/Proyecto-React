const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

/**
 * Sube un archivo de imagen a ImgBB (https://api.imgbb.com/) y devuelve la URL
 * pública para guardarla en el documento del producto en Firestore.
 *
 * @param {File} file - Archivo de imagen seleccionado por el usuario (input type="file").
 * @returns {Promise<string>} URL pública de la imagen subida.
 */
export async function uploadImage(file) {
  if (!file) {
    throw new Error("No se seleccionó ninguna imagen.");
  }

  if (!IMGBB_API_KEY || IMGBB_API_KEY.includes("PEGA_ACA")) {
    throw new Error(
      "Falta configurar VITE_IMGBB_API_KEY en el archivo .env con tu API key de https://api.imgbb.com/"
    );
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo seleccionado no es una imagen válida.");
  }

  const MAX_SIZE_MB = 10;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`La imagen supera el tamaño máximo permitido (${MAX_SIZE_MB}MB).`);
  }

  const formData = new FormData();
  formData.append("image", file);

  let response;
  try {
    response = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error("No se pudo conectar con ImgBB. Revisá tu conexión a internet.");
  }

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    const message = result?.error?.message || "No se pudo subir la imagen a ImgBB.";
    throw new Error(message);
  }

  return result.data.url;
}
