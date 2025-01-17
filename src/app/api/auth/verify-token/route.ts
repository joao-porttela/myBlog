// Next
import {headers} from "next/headers";
import {NextResponse} from "next/server";

// jwt lib
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    NextResponse.json({message: "Only POST requests allowed"});
    return;
  }

  const header = await headers();

  const token = header.get("authorization")?.split(" ")[1]; // Get the token from the
  // Authorization header
  const publicKey = process.env.PUBLIC_KEY!; // Public key for verification

  if (!token) {
    return NextResponse.json({message: "Token is missing"});
  }

  try {
    const payload = jwt.verify(token, publicKey);
    return NextResponse.json({valid: true, payload});
  } catch {
    return NextResponse.json({valid: false, message: "Invalid or expired token"});
  }
}
