import { NextResponse } from "next/server";
import pool from "@/lib/db";

/* ==========================================
   GET ACTIVE HERO BANNERS
   GET /api/banners
========================================== */

export async function GET() {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        title,
        subtitle,
        description,
        image_url,
        button_text,
        button_link,
        sort_order
      FROM hero_banners
      WHERE status = true
      ORDER BY sort_order ASC
      `
    );

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Client Banners Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch banners.",
      },
      {
        status: 500,
      }
    );
  }
}