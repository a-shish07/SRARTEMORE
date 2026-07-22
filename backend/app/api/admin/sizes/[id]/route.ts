import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

/* ==========================================
   GET SINGLE SIZE
   GET /api/admin/sizes/:id
========================================== */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        status,
        created_at,
        updated_at
      FROM sizes
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Size not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      size: result.rows[0],
    });
  } catch (error) {
    console.error("GET Size Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch size.",
      },
      { status: 500 }
    );
  }
}

/* ==========================================
   UPDATE SIZE
   PUT /api/admin/sizes/:id
========================================== */

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { name, status } = body;

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
      `
      SELECT id
      FROM sizes
      WHERE LOWER(name)=LOWER($1)
      AND id <> $2
      `,
      [name, id]
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
      UPDATE sizes
      SET
        name = $1,
        status = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
      `,
      [name.trim(), status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Size not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Size updated successfully.",
      size: result.rows[0],
    });
  } catch (error) {
    console.error("Update Size Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update size.",
      },
      { status: 500 }
    );
  }
}
/* ==========================================
   DELETE SIZE
   DELETE /api/admin/sizes/:id
========================================== */

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    /* ---------- Check Size Exists ---------- */

    const check = await pool.query(
      `
      SELECT id
      FROM sizes
      WHERE id = $1
      `,
      [id]
    );

    if (check.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Size not found.",
        },
        { status: 404 }
      );
    }

    /* ---------- Check Product Mapping ---------- */

    const usedInProducts = await pool.query(
      `
      SELECT 1
      FROM product_sizes
      WHERE size_id = $1
      LIMIT 1
      `,
      [id]
    );

    if (usedInProducts.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This size is assigned to one or more products. Remove it from those products before deleting.",
        },
        { status: 400 }
      );
    }

    /* ---------- Delete Size ---------- */

    await pool.query(
      `
      DELETE FROM sizes
      WHERE id = $1
      `,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Size deleted successfully.",
    });

  } catch (error) {

    console.error("Delete Size Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete size.",
      },
      {
        status: 500,
      }
    );

  }
}