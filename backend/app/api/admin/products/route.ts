import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
/* ==========================================
   GET ALL PRODUCTS
   GET /api/admin/products
========================================== */

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.slug,
        p.description,
        p.price,
        p.discount_price,
        p.stock,
        p.sku,
        p.featured,
        p.best_seller,
        p.new_arrival,
        p.on_sale,
        p.status,
        p.rating,
        p.review_count,
        p.meta_title,
        p.meta_description,
        p.created_at,
c.id AS category_id,
c.name AS category_name,

s.id AS shape_id,
s.name AS shape_name,

(
    SELECT STRING_AGG(sz.name, ', ' ORDER BY sz.name)
    FROM product_sizes ps
    JOIN sizes sz
      ON ps.size_id = sz.id
    WHERE ps.product_id = p.id
) AS sizes,

(
    SELECT i.url
    FROM product_images pi
    JOIN images i
      ON pi.image_id = i.id
    WHERE pi.product_id = p.id
    ORDER BY pi.sort_order
    LIMIT 1
) AS image_url
      FROM products p

      LEFT JOIN categories c
        ON p.category_id = c.id

      LEFT JOIN shapes s
        ON p.shape_id = s.id

      WHERE p.is_deleted = FALSE

      ORDER BY p.id DESC
    `);

    return NextResponse.json({
      success: true,
      products: result.rows,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
/* ==========================================
   CREATE PRODUCT
   POST /api/admin/products
========================================== */

export async function POST(req: NextRequest) {
  const client = await pool.connect();

  try {
    const formData = await req.formData();

    const category_id = Number(formData.get("category_id"));
    const shape_id = Number(formData.get("shape_id"));

    const name = formData.get("name")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim();

    const description = formData.get("description")?.toString() || "";

    const price = Number(formData.get("price"));

    const discount_price = formData.get("discount_price")
      ? Number(formData.get("discount_price"))
      : null;

    const stock = formData.get("stock")
      ? Number(formData.get("stock"))
      : 0;

    const sku = formData.get("sku")?.toString() || "";

    const featured = formData.get("featured") === "true";
    const best_seller = formData.get("best_seller") === "true";
    const new_arrival = formData.get("new_arrival") === "true";
    const on_sale = formData.get("on_sale") === "true";

    const status = formData.get("status") === "true";

    const meta_title = formData.get("meta_title")?.toString() || "";
    const meta_description =
      formData.get("meta_description")?.toString() || "";

    // Images are passed as JSON string
    const images = JSON.parse(
      formData.get("images")?.toString() || "[]"
    );

    const sizes = JSON.parse(
  formData.get("sizes")?.toString() || "[]"
);

    if (
      !category_id ||
      !shape_id ||
      !name ||
      !slug ||
      isNaN(price)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing.",
        },
        { status: 400 }
      );
    }

    await client.query("BEGIN");

    const productResult = await client.query(
      `
      INSERT INTO products (
        category_id,
        shape_id,
        name,
        slug,
        description,
        price,
        discount_price,
        stock,
        sku,
        featured,
        best_seller,
        new_arrival,
        on_sale,
        status,
        meta_title,
        meta_description
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
      )
      RETURNING id
      `,
      [
        category_id,
        shape_id,
        name,
        slug,
        description,
        price,
        discount_price,
        stock,
        sku,
        featured,
        best_seller,
        new_arrival,
        on_sale,
        status,
        meta_title,
        meta_description,
      ]
    );

    const productId = productResult.rows[0].id;

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await client.query(
          `
          INSERT INTO product_images
          (
            product_id,
            image_id,
            sort_order
          )
          VALUES
          ($1,$2,$3)
          `,
          [
            productId,
            images[i],
            i + 1,
          ]
        );
      }
    }
/* ==========================================
   SAVE PRODUCT SIZES
========================================== */

if (sizes.length > 0) {

  for (const sizeId of sizes) {

    await client.query(
      `
      INSERT INTO product_sizes
      (
        product_id,
        size_id
      )
      VALUES
      ($1,$2)
      `,
      [
        productId,
        sizeId,
      ]
    );

  }

}
    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Product created successfully.",
      product: {
        id: productId,
      },
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("Create Product Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      {
        status: 500,
      }
    );

  } finally {

    client.release();

  }
}