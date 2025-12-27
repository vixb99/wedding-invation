import { NextResponse } from "next/server";
import { sheets, SHEET_ID } from "@/app/lib/googleSheet";

export async function GET() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "A:C",
  });

  const rows = res.data.values?.slice(1) || [];

  return NextResponse.json(
    rows.map(([name, message, time]) => ({
      name,
      message,
      time,
    }))
  );
}
