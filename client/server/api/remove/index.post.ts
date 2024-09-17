const bufferToBlob = (buffer: any, mimeType: any) =>
  new Blob([buffer], { type: mimeType });

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const base_url = config.NUXT_BASE_URL;

    // Read multipart form data
    const image = await readMultipartFormData(event);
    if (!image) {
      throw Error;
    }
    const fileBlob = bufferToBlob(image[0].data, image[0].type);
    const fd = new FormData();
    fd.append("image", fileBlob, image[0].filename);

    const res = await $fetch(`${base_url}/remove`, {
      method: "POST",
      body: fd,
    });

    return res;
  } catch (error: any) {
    console.error("Error processing file:", error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
});
