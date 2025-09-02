
import { StatusEventsValue ,  StatusMerchandiseValue, visibilityValue} from "@/config/enum-type";
import * as z from "zod";


export const imageSchema = z.union([
  // File object untuk upload baru
  z.instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"].includes(
          file.type
        ),
      {
        message: "Only JPEG, PNG, SVG, and GIF files are allowed",
      }
    ),
  // String untuk existing image path
  z.string().min(1, "Picture is required"),
])


export const FileMetadata = z.object({
  name:  z.coerce.string().min(1, "File name is required"),
  size: z.coerce.number().min(1, "File size is required"),
  type: z.coerce.string().min(1, "File type is required"),
});

export const FileWithPreview = z.object({
  file: FileMetadata,
  id: z.coerce.string().min(1, "File ID is required"),
  preview: z.coerce.string().optional(),
  base64Data: z.coerce.string().min(1, "File data is required") // Tambahkan base64Data sebagai required
})



export const productsSchema = z.object({
    id: z.number().optional(),
  name: z.string().min(4, "Name is required"),
  image: imageSchema,
  deskripsi: z.string().optional(),
  price: z.coerce.number().min(0.001, "Harga is required"),
  quantity: z.coerce.number().min(2, "Harga is required"),
  visibility: z.enum(visibilityValue).optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),


   status: z.enum(StatusMerchandiseValue).optional(),


});





export type FileSchema = z.infer<typeof FileWithPreview>;
export type ImageSchema = z.infer<typeof  imageSchema>;
export type ProductsSchema = z.infer<typeof  productsSchema>;
