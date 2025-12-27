import { SHEET_ID, sheets } from "@/app/lib/googleSheet";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, message, new Date().toLocaleString("vi-VN")]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
