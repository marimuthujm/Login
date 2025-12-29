import pool from "@/lib/db";
export async function POST(req) {
  try {
    const {
      username,
      password,
      full_name,
      email,
      mobile,
    } = await req.json();
    if (!username || !password || !email || !full_name||!mobile) {
      return Response.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }
    const exists = await pool.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (exists.rows.length > 0) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }
    await pool.query(
      `INSERT INTO users 
       (username, password, full_name, email, mobile)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, password, full_name, email, mobile]
    );
    return Response.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
