import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");

    return NextResponse.json({
      success: true,
      message: "Database Connected Successfully",
      serverTime: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Database Connection Failed",
      },
      { status: 500 }
    );

  }
}