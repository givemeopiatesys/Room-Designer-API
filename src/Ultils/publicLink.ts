export function generatePublicLink(fileName: string) {
  return `${process.env.API_URL}/${process.env.FILE_UPLOAD_DESTINATION}/${fileName}`;
}
