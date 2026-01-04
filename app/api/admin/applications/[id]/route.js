import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params

    const application = await prisma.application.findUnique({
      where: { id }
    })

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      application
    })

  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validate status
    const validStatuses = ['PENDING', 'INTERVIEW', 'APPROVED', 'REJECTED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      )
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json({
      success: true,
      message: 'Application status updated',
      application
    })

  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update application' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    await prisma.application.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Application deleted'
    })

  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete application' },
      { status: 500 }
    )
  }
}
