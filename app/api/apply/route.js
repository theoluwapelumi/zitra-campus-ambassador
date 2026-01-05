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

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'stateOfOrigin', 'university', 'faculty', 'department', 'matricNumber', 'currentLevel', 'expectedGraduation', 'cgpa', 'hasZitraAccount', 'whyAmbassador', 'campusActivities']

    for (const field of requiredFields) {
      if (!applicationData[field] && applicationData[field] !== 0) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if email already exists
    let existingApplication
    try {
      existingApplication = await prisma.application.findUnique({
        where: { email: applicationData.email }
      })
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return NextResponse.json(
        { success: false, message: 'Database connection error. Please try again.' },
        { status: 500 }
      )
    }

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
      // Continue without files if upload fails
    }

    // Save application to database
    let application
    try {
      application = await prisma.application.create({
        data: applicationData
      })
    } catch (createError) {
      console.error('Database create error:', createError)
      return NextResponse.json(
        { success: false, message: `Database error: ${createError.message}` },
        { status: 500 }
      )
    }

    // Send emails (don't block on email failures)
    try {
      await Promise.all([
        sendConfirmationEmail(application),
        sendAdminNotification(application)
      ])
    } catch (emailError) {
      console.error('Email sending error:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    })

  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Ambassador Application API' })
}
