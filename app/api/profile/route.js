import pool from "@/lib/db";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (!username) {
      return Response.json(
        { success: false, message: "Username missing" },
        { status: 400 }
      );
    }
    const result = await pool.query(
      "SELECT username, full_name, email, mobile FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    const { username, full_name, email, mobile } = await req.json();
    if (!username) {
      return Response.json(
        { success: false, message: "Username required" },
        { status: 400 }
      );
    }
    await pool.query(
      `UPDATE users
       SET full_name = $1,
           email = $2,
           mobile = $3
       WHERE username = $4`,
      [full_name, email, mobile, username]
    );
    return Response.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const { username } = await req.json();

    if (!username) {
      return Response.json(
        { success: false, message: "Username required" },
        { status: 400 }
      );
    }
    await pool.query(
      "DELETE FROM users WHERE username = $1",
      [username]
    );
    return Response.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
