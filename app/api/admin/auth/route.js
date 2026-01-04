import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { password } = await request.json()

    // Get admin password from environment variable, with a fallback for development
    const adminPassword = process.env.ADMIN_PASSWORD || 'ZitraAdmin2025'

    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}
