"use server";

import { createClient } from "@/lib/supabase/server";
import { requireEditor } from "@/lib/supabase/rbac";
import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];

export async function uploadImageAction(formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  const file = formData.get("file") as File;
  if (!file) {
    return { error: "No file provided" };
  }

  // Server-side validation
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "File exceeds the 5MB size limit." };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." };
  }

  const originalExt = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_EXTENSIONS.includes(originalExt)) {
    return { error: "Invalid file extension." };
  }

  // Safe filename generation
  const uuid = crypto.randomUUID();
  const safeFilename = `uploads/${uuid}.${originalExt}`;

  // Read file as ArrayBuffer for upload
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(safeFilename, buffer, {
      contentType: file.type,
      upsert: false
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Failed to upload file to storage." };
  }

  const { data } = supabase.storage.from("media").getPublicUrl(safeFilename);

  return { success: true, url: data.publicUrl };
}
