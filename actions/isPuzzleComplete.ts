"use server";

export async function isPuzzleComplete(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  return data;
}
