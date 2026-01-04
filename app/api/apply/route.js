import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email'

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

    // Handle file uploads to Cloudinary
    const studentIdFile = formData.get('studentIdFile')
    const transcriptFile = formData.get('transcriptFile')
    const passportPhoto = formData.get('passportPhoto')

    try {
      // Upload files if they exist and are valid File objects
      if (studentIdFile && studentIdFile instanceof File && studentIdFile.size > 0) {
        applicationData.studentIdUrl = await uploadToCloudinary(studentIdFile, 'ambassador-applications/student-ids')
      }

      if (transcriptFile && transcriptFile instanceof File && transcriptFile.size > 0) {
        applicationData.transcriptUrl = await uploadToCloudinary(transcriptFile, 'ambassador-applications/transcripts')
      }

      if (passportPhoto && passportPhoto instanceof File && passportPhoto.size > 0) {
        applicationData.passportUrl = await uploadToCloudinary(passportPhoto, 'ambassador-applications/photos')
      }
    } catch (uploadError) {
      console.error('File upload error:', uploadError)
      // Continue without files if upload fails - don't block the application
    }

    // Save application to database
    const application = await prisma.application.create({
      data: applicationData
    })

    // Send emails (don't block on email failures)
    try {
      await Promise.all([
        sendConfirmationEmail(application),
        sendAdminNotification(application)
      ])
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue even if emails fail
    }

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
