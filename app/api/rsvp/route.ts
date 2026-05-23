import { NextRequest, NextResponse } from "next/server"

console.log("TOKEN:", process.env.TELEGRAM_BOT_TOKEN ? "есть" : "ПУСТО")
console.log("CHAT_ID:", process.env.TELEGRAM_CHAT_ID ? "есть" : "ПУСТО")

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, attendance, guests, message } = body

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 })
    }
    if (attendance !== "yes" && attendance !== "no") {
      return NextResponse.json({ error: "Attendance must be yes or no." }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error("[v0] Telegram env vars missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")
      return NextResponse.json(
        { error: "Server configuration error. Please contact the couple directly." },
        { status: 500 }
      )
    }

    const attendanceLabel = attendance === "yes" ? "Yes, will attend" : "No, cannot attend"
    const guestCount = attendance === "yes" ? (guests ?? 1) : 0
    const guestLine = attendance === "yes" ? `Guests: ${guestCount}` : ""
    const messageLine = message?.trim() ? `Message: ${message.trim()}` : ""

    const telegramText = [
      "🎉 New Wedding RSVP",
      `Name: ${name.trim()}`,
      `Attendance: ${attendanceLabel}`,
      guestLine,
      messageLine,
    ]
      .filter(Boolean)
      .join("\n")

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: "HTML",
        }),
      }
    )

    if (!telegramRes.ok) {
      const errData = await telegramRes.json().catch(() => ({}))
      console.error("[v0] Telegram API error:", errData)
      return NextResponse.json(
        { error: "Failed to send notification. Please try again." },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] /api/rsvp error:", err)
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 })
  }
}
