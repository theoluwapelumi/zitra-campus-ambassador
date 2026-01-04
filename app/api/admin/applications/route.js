import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where = {}

    // Filter by status
    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }

    // Search filter
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { university: { contains: search, mode: 'insensitive' } },
        { id: { contains: search, mode: 'insensitive' } },
      ]
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { submittedAt: 'desc' }
    })

    // Get statistics
    const stats = await prisma.application.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    const statsMap = {
      total: 0,
      PENDING: 0,
      INTERVIEW: 0,
      APPROVED: 0,
      REJECTED: 0,
    }

    stats.forEach(s => {
      statsMap[s.status] = s._count.status
      statsMap.total += s._count.status
    })

    return NextResponse.json({
      success: true,
      applications,
      stats: statsMap
    })

  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
