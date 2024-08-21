"use server";

export async function isPuzzleComplete(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  // If data contains empty input return false
  console.log(data);
  return data;
}
