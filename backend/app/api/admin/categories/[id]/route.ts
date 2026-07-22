import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

/* ==========================================
   GET SINGLE CATEGORY
   GET /api/admin/categories/:id
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
        slug,
        image_id,
        status,
        created_at
      FROM categories
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        category: result.rows[0],
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch category.",
      },
      {
        status: 500,
      }
    );

  }
}
/* ==========================================
   CREATE CATEGORY
   POST /api/admin/categories
========================================== */

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();

    const name = formData.get("name") as string;

    const slug = formData.get("slug") as string;

    const image_id = Number(formData.get("image_id")) || null;

    const status =
      formData.get("status") === "true";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO categories
      (
        name,
        slug,
        image_id,
        status
      )
      VALUES
      (
        $1,$2,$3,$4
      )
      RETURNING *
      `,
      [
        name,
        slug,
        image_id,
        status,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        category: result.rows[0],
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
/* ==========================================
   DELETE CATEGORY
   DELETE /api/admin/categories/:id
========================================== */

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const result = await pool.query(
      `
      DELETE FROM categories
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully.",
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category.",
      },
      {
        status: 500,
      }
    );

  }
}

/* ==========================================
   UPDATE CATEGORY
   PUT /api/admin/categories/:id
========================================== */

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const image_id = Number(formData.get("image_id")) || null;
    const status = formData.get("status") === "true";

    const result = await pool.query(
      `
      UPDATE categories
      SET
        name = $1,
        slug = $2,
        image_id = $3,
        status = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        name,
        slug,
        image_id,
        status,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully.",
        category: result.rows[0],
      },
      {
        status: 200,
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