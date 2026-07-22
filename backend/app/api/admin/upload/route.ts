import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import pool from "@/lib/db";

/* ==========================================
   UPLOAD IMAGE
   POST /api/admin/upload
========================================== */

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File | null;

    const folder =
      (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an image.",
        },
        {
          status: 400,
        }
      );
    }

    /* Upload Folder */

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      folder
    );

    await mkdir(uploadDir, {
      recursive: true,
    });

    /* Safe File Name */

    const safeName = file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    );

    const fileName =
      `${Date.now()}-${safeName}`;

    const filePath = path.join(
      uploadDir,
      fileName
    );

    /* Save File */

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    /* URL */

    const image_url =
      `/uploads/${folder}/${fileName}`;

    /* Save Image Record */

    const imageResult = await pool.query(
      `
      INSERT INTO images
      (
        file_name,
        original_name,
        storage_provider,
        url,
        public_id,
        folder,
        size,
        mime_type
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8
      )
      RETURNING *
      `,
      [
        fileName,
        file.name,
        "Local Storage",
        image_url,
        null,
        folder,
        file.size,
        file.type,
      ]
    );

    return NextResponse.json(
      {
        success: true,

        image: imageResult.rows[0],
      },
      {
        status: 201,
      }
    );

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}