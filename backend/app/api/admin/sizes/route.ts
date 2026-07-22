import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

/* ==========================================
   GET ALL SIZES
   GET /api/admin/sizes
========================================== */

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        status,
        created_at,
        updated_at
      FROM sizes
      ORDER BY id DESC
    `);

    return NextResponse.json({
      success: true,
      sizes: result.rows,
    });
  } catch (error) {
    console.error("GET Sizes Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch sizes.",
      },
      { status: 500 }
    );
  }
}

/* ==========================================
   CREATE SIZE
   POST /api/admin/sizes
========================================== */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, status = true } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Size name is required.",
        },
        { status: 400 }
      );
    }

    // Check duplicate
    const check = await pool.query(
      `SELECT id FROM sizes WHERE LOWER(name)=LOWER($1)`,
      [name]
    );

    if (check.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Size already exists.",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO sizes
      (name, status)
      VALUES ($1,$2)
      RETURNING *
      `,
      [name.trim(), status]
    );

    return NextResponse.json({
      success: true,
      message: "Size created successfully.",
      size: result.rows[0],
    });
  } catch (error) {
    console.error("Create Size Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create size.",
      },
      { status: 500 }
    );
  }
}