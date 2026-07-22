import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find User
    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        password,
        role
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Compare Password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check Admin Role
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    // Check JWT Secret
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT_SECRET is missing in .env" },
        { status: 500 }
      );
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Admin login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Admin Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}