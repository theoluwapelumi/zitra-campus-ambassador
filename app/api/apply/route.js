import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const applicationData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      dateOfBirth: formData.get('dateOfBirth'),
      gender: formData.get('gender'),
      stateOfOrigin: formData.get('stateOfOrigin'),
      university: formData.get('university'),
      otherUniversity: formData.get('otherUniversity') || null,
      faculty: formData.get('faculty'),
      department: formData.get('department'),
      matricNumber: formData.get('matricNumber'),
      currentLevel: formData.get('currentLevel'),
      expectedGraduation: formData.get('expectedGraduation'),
      cgpa: parseFloat(formData.get('cgpa')),
      hasZitraAccount: formData.get('hasZitraAccount'),
      zitraAccountNumber: formData.get('zitraAccountNumber') || null,
      instagramHandle: formData.get('instagramHandle') || null,
      twitterHandle: formData.get('twitterHandle') || null,
      linkedinUrl: formData.get('linkedinUrl') || null,
      followersCount: formData.get('followersCount') || null,
      whyAmbassador: formData.get('whyAmbassador'),
      marketingExperience: formData.get('marketingExperience') || null,
      campusActivities: formData.get('campusActivities'),
    }

    // Handle file uploads
    // In production, you would upload these to cloud storage (Vercel Blob, AWS S3, Cloudinary)
    // and store the URLs. For now, we'll skip file storage.
    const studentIdFile = formData.get('studentIdFile')
    const transcriptFile = formData.get('transcriptFile')
    const passportPhoto = formData.get('passportPhoto')

    // TODO: Upload files to Vercel Blob or cloud storage and get URLs
    // applicationData.studentIdUrl = await uploadToBlob(studentIdFile)
    // applicationData.transcriptUrl = await uploadToBlob(transcriptFile)
    // applicationData.passportUrl = await uploadToBlob(passportPhoto)

    // Check if email already exists
    const existingApplication = await prisma.application.findUnique({
      where: { email: applicationData.email }
    })

    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: 'An application with this email already exists' },
        { status: 400 }
      )
    }

    // Save application to database
    const application = await prisma.application.create({
      data: applicationData
    })

    // TODO: Send confirmation email to applicant
    // TODO: Send notification to admin

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    })

  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Ambassador Application API' })
}
