import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // ==============================
    // Get Product Details
    // ==============================

    const productResult = await pool.query(
      `
      SELECT
          p.id,
          p.name,
          p.slug,
          p.description,
          p.price,
          p.discount_price,
          p.stock,
          p.featured,
          p.best_seller,
          p.new_arrival,
          p.on_sale,

          c.id AS category_id,
          c.name AS category_name,
          c.slug AS category_slug,

          s.id AS shape_id,
          s.name AS shape_name,
          s.slug AS shape_slug

      FROM products p

      LEFT JOIN categories c
      ON p.category_id = c.id

      LEFT JOIN shapes s
      ON p.shape_id = s.id

      WHERE p.slug = $1
      AND p.status = true
      LIMIT 1
      `,
      [slug]
    );

    if (productResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    const product = productResult.rows[0];

    // ==============================
    // Get Product Images
    // ==============================

    const imageResult = await pool.query(
      `
      SELECT
          i.id,
          i.url

      FROM product_images pi

      INNER JOIN images i
      ON pi.image_id = i.id

      WHERE pi.product_id = $1

      ORDER BY pi.sort_order ASC
      `,
      [product.id]
    );

    // ==============================
    // Response
    // ==============================

    return NextResponse.json(
      {
        success: true,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          discount_price: product.discount_price,
          stock: product.stock,

          featured: product.featured,
          best_seller: product.best_seller,
          new_arrival: product.new_arrival,
          on_sale: product.on_sale,

          category: {
            id: product.category_id,
            name: product.category_name,
            slug: product.category_slug,
          },

          shape: {
            id: product.shape_id,
            name: product.shape_name,
            slug: product.shape_slug,
          },

          images: imageResult.rows,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Product Details Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product.",
      },
      {
        status: 500,
      }
    );
  }
}