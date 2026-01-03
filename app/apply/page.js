'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Upload, Check, Loader2, AlertCircle } from 'lucide-react'

// Nigerian Universities List (sample)
const universities = [
  'University of Lagos (UNILAG)',
  'University of Ibadan (UI)',
  'Ahmadu Bello University (ABU)',
  'University of Nigeria, Nsukka (UNN)',
  'Obafemi Awolowo University (OAU)',
  'University of Benin (UNIBEN)',
  'University of Ilorin (UNILORIN)',
  'University of Port Harcourt (UNIPORT)',
  'Federal University of Technology, Akure (FUTA)',
  'Federal University of Technology, Minna',
  'Covenant University',
  'Babcock University',
  'Lagos State University (LASU)',
  'Rivers State University',
  'Nnamdi Azikiwe University',
  'Bayero University Kano',
  'University of Calabar',
  'University of Jos',
  'Federal University, Oye-Ekiti',
  'Landmark University',
  'Bowen University',
  'Lead City University',
  'Pan-Atlantic University',
  'American University of Nigeria',
  'Other (Please specify)',
]

const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
]

const studyLevels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level (Medicine/Engineering)']

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    stateOfOrigin: '',

    // Academic Information
    university: '',
    otherUniversity: '',
    faculty: '',
    department: '',
    matricNumber: '',
    currentLevel: '',
    expectedGraduation: '',
    cgpa: '',

    // Zitra Account
    hasZitraAccount: '',
    zitraAccountNumber: '',

    // Social Media & Influence
    instagramHandle: '',
    twitterHandle: '',
    linkedinUrl: '',
    followersCount: '',

    // Motivation
    whyAmbassador: '',
    marketingExperience: '',
    campusActivities: '',

    // Documents
    studentIdFile: null,
    transcriptFile: null,
    passportPhoto: null,

    // Agreement
    agreeTerms: false,
    agreePrivacy: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }))
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      else if (!/^(\+234|0)[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid Nigerian phone number'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.gender) newErrors.gender = 'Gender is required'
      if (!formData.stateOfOrigin) newErrors.stateOfOrigin = 'State of origin is required'
    }

    if (currentStep === 2) {
      if (!formData.university) newErrors.university = 'University is required'
      if (formData.university === 'Other (Please specify)' && !formData.otherUniversity.trim()) {
        newErrors.otherUniversity = 'Please specify your university'
      }
      if (!formData.faculty.trim()) newErrors.faculty = 'Faculty is required'
      if (!formData.department.trim()) newErrors.department = 'Department is required'
      if (!formData.matricNumber.trim()) newErrors.matricNumber = 'Matric number is required'
      if (!formData.currentLevel) newErrors.currentLevel = 'Current level is required'
      if (!formData.expectedGraduation) newErrors.expectedGraduation = 'Expected graduation year is required'
      if (!formData.cgpa) newErrors.cgpa = 'CGPA is required'
      else if (parseFloat(formData.cgpa) < 3.0) newErrors.cgpa = 'Minimum CGPA of 3.0 required'
      else if (parseFloat(formData.cgpa) > 5.0) newErrors.cgpa = 'CGPA cannot exceed 5.0'
    }

    if (currentStep === 3) {
      if (!formData.hasZitraAccount) newErrors.hasZitraAccount = 'Please indicate if you have a Zitra account'
      if (formData.hasZitraAccount === 'yes' && !formData.zitraAccountNumber.trim()) {
        newErrors.zitraAccountNumber = 'Account number is required'
      }
    }

    if (currentStep === 4) {
      if (!formData.whyAmbassador.trim()) newErrors.whyAmbassador = 'This field is required'
      else if (formData.whyAmbassador.trim().length < 100) newErrors.whyAmbassador = 'Please write at least 100 characters'
      if (!formData.campusActivities.trim()) newErrors.campusActivities = 'This field is required'
    }

    if (currentStep === 5) {
      if (!formData.studentIdFile) newErrors.studentIdFile = 'Student ID is required'
      if (!formData.passportPhoto) newErrors.passportPhoto = 'Passport photo is required'
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'
      if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 5))
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(5)) return

    setIsSubmitting(true)

    // Simulate API call
    try {
      // In production, this would send to your API endpoint
      // const formDataObj = new FormData()
      // Object.keys(formData).forEach(key => {
      //   formDataObj.append(key, formData[key])
      // })
      // await fetch('/api/apply', { method: 'POST', body: formDataObj })

      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitSuccess(true)
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for applying to the Zitra Campus Ambassador Program. We've received your application 
            and will review it shortly. You'll receive a confirmation email at <strong>{formData.email}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Our team will be in touch within 7-14 business days if you're shortlisted for the next stage.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            Back to Home <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          <img src="/logo.svg" alt="Zitra" className="h-8" />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Ambassador Application</h1>
            <span className="text-sm text-gray-500">Step {step} of 5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={step >= 1 ? 'text-primary font-medium' : ''}>Personal</span>
            <span className={step >= 2 ? 'text-primary font-medium' : ''}>Academic</span>
            <span className={step >= 3 ? 'text-primary font-medium' : ''}>Account</span>
            <span className={step >= 4 ? 'text-primary font-medium' : ''}>Motivation</span>
            <span className={step >= 5 ? 'text-primary font-medium' : ''}>Documents</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600 mb-8">Tell us about yourself</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="form-error">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+234 800 000 0000"
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>

                <div>
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`form-input ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  />
                  {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="form-label">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`form-input ${errors.gender ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="form-error">{errors.gender}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="form-label">State of Origin *</label>
                  <select
                    name="stateOfOrigin"
                    value={formData.stateOfOrigin}
                    onChange={handleChange}
                    className={`form-input ${errors.stateOfOrigin ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.stateOfOrigin && <p className="form-error">{errors.stateOfOrigin}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Information</h2>
              <p className="text-gray-600 mb-8">Tell us about your studies</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="form-label">University *</label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className={`form-input ${errors.university ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select your university</option>
                    {universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                  {errors.university && <p className="form-error">{errors.university}</p>}
                </div>

                {formData.university === 'Other (Please specify)' && (
                  <div className="md:col-span-2">
                    <label className="form-label">Specify University *</label>
                    <input
                      type="text"
                      name="otherUniversity"
                      value={formData.otherUniversity}
                      onChange={handleChange}
                      className={`form-input ${errors.otherUniversity ? 'border-red-500' : ''}`}
                      placeholder="Enter your university name"
                    />
                    {errors.otherUniversity && <p className="form-error">{errors.otherUniversity}</p>}
                  </div>
                )}

                <div>
                  <label className="form-label">Faculty *</label>
                  <input
                    type="text"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                    className={`form-input ${errors.faculty ? 'border-red-500' : ''}`}
                    placeholder="e.g., Faculty of Science"
                  />
                  {errors.faculty && <p className="form-error">{errors.faculty}</p>}
                </div>

                <div>
                  <label className="form-label">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`form-input ${errors.department ? 'border-red-500' : ''}`}
                    placeholder="e.g., Computer Science"
                  />
                  {errors.department && <p className="form-error">{errors.department}</p>}
                </div>

                <div>
                  <label className="form-label">Matriculation Number *</label>
                  <input
                    type="text"
                    name="matricNumber"
                    value={formData.matricNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.matricNumber ? 'border-red-500' : ''}`}
                    placeholder="Enter your matric number"
                  />
                  {errors.matricNumber && <p className="form-error">{errors.matricNumber}</p>}
                </div>

                <div>
                  <label className="form-label">Current Level *</label>
                  <select
                    name="currentLevel"
                    value={formData.currentLevel}
                    onChange={handleChange}
                    className={`form-input ${errors.currentLevel ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select level</option>
                    {studyLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.currentLevel && <p className="form-error">{errors.currentLevel}</p>}
                </div>

                <div>
                  <label className="form-label">Expected Graduation Year *</label>
                  <select
                    name="expectedGraduation"
                    value={formData.expectedGraduation}
                    onChange={handleChange}
                    className={`form-input ${errors.expectedGraduation ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select year</option>
                    {[2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.expectedGraduation && <p className="form-error">{errors.expectedGraduation}</p>}
                </div>

                <div>
                  <label className="form-label">Current CGPA (out of 5.0) *</label>
                  <input
                    type="number"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className={`form-input ${errors.cgpa ? 'border-red-500' : ''}`}
                    placeholder="e.g., 3.50"
                    step="0.01"
                    min="0"
                    max="5"
                  />
                  {errors.cgpa && <p className="form-error">{errors.cgpa}</p>}
                  <p className="text-xs text-gray-500 mt-1">Minimum 3.0 CGPA required</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Zitra Account & Social */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Zitra Account & Social Presence</h2>
              <p className="text-gray-600 mb-8">Your account details and social media presence</p>

              <div className="space-y-6">
                <div>
                  <label className="form-label">Do you have a Zitra Bank account? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasZitraAccount"
                        value="yes"
                        checked={formData.hasZitraAccount === 'yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Yes, I have an account</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasZitraAccount"
                        value="no"
                        checked={formData.hasZitraAccount === 'no'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary"
                      />
                      <span>No, I'll open one</span>
                    </label>
                  </div>
                  {errors.hasZitraAccount && <p className="form-error">{errors.hasZitraAccount}</p>}
                </div>

                {formData.hasZitraAccount === 'yes' && (
                  <div>
                    <label className="form-label">Zitra Account Number *</label>
                    <input
                      type="text"
                      name="zitraAccountNumber"
                      value={formData.zitraAccountNumber}
                      onChange={handleChange}
                      className={`form-input ${errors.zitraAccountNumber ? 'border-red-500' : ''}`}
                      placeholder="Enter your 10-digit account number"
                      maxLength={10}
                    />
                    {errors.zitraAccountNumber && <p className="form-error">{errors.zitraAccountNumber}</p>}
                  </div>
                )}

                {formData.hasZitraAccount === 'no' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                      <strong>No worries!</strong> You can download the Zitra app and create an account before 
                      your application is reviewed. We'll verify your account during the onboarding process.
                    </p>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Social Media Presence (Optional)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help us understand your campus influence. These are optional but recommended.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Instagram Handle</label>
                      <input
                        type="text"
                        name="instagramHandle"
                        value={formData.instagramHandle}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="@yourusername"
                      />
                    </div>

                    <div>
                      <label className="form-label">Twitter/X Handle</label>
                      <input
                        type="text"
                        name="twitterHandle"
                        value={formData.twitterHandle}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="@yourusername"
                      />
                    </div>

                    <div>
                      <label className="form-label">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="form-label">Total Social Media Followers</label>
                      <select
                        name="followersCount"
                        value={formData.followersCount}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="">Select range</option>
                        <option value="0-500">0 - 500</option>
                        <option value="500-1000">500 - 1,000</option>
                        <option value="1000-5000">1,000 - 5,000</option>
                        <option value="5000-10000">5,000 - 10,000</option>
                        <option value="10000+">10,000+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Motivation */}
          {step === 4 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Motivation & Experience</h2>
              <p className="text-gray-600 mb-8">Tell us why you'd make a great ambassador</p>

              <div className="space-y-6">
                <div>
                  <label className="form-label">Why do you want to become a Zitra Campus Ambassador? *</label>
                  <textarea
                    name="whyAmbassador"
                    value={formData.whyAmbassador}
                    onChange={handleChange}
                    className={`form-input min-h-[150px] ${errors.whyAmbassador ? 'border-red-500' : ''}`}
                    placeholder="Tell us what motivates you to join the program and how you plan to make an impact on your campus..."
                  />
                  <div className="flex justify-between mt-1">
                    {errors.whyAmbassador && <p className="form-error">{errors.whyAmbassador}</p>}
                    <p className="text-xs text-gray-500 ml-auto">{formData.whyAmbassador.length} / 100 min characters</p>
                  </div>
                </div>

                <div>
                  <label className="form-label">Do you have any marketing or brand ambassador experience?</label>
                  <textarea
                    name="marketingExperience"
                    value={formData.marketingExperience}
                    onChange={handleChange}
                    className="form-input min-h-[120px]"
                    placeholder="Describe any relevant experience (internships, campus marketing, brand promotions, etc.). If none, write 'No prior experience'."
                  />
                </div>

                <div>
                  <label className="form-label">What campus activities or organizations are you involved in? *</label>
                  <textarea
                    name="campusActivities"
                    value={formData.campusActivities}
                    onChange={handleChange}
                    className={`form-input min-h-[120px] ${errors.campusActivities ? 'border-red-500' : ''}`}
                    placeholder="List clubs, societies, student government positions, sports teams, or any other campus involvement..."
                  />
                  {errors.campusActivities && <p className="form-error">{errors.campusActivities}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Documents & Agreement */}
          {step === 5 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents & Agreement</h2>
              <p className="text-gray-600 mb-8">Upload required documents and agree to our terms</p>

              <div className="space-y-6">
                {/* Student ID Upload */}
                <div>
                  <label className="form-label">Student ID Card *</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center ${errors.studentIdFile ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary'} transition-colors`}>
                    <input
                      type="file"
                      name="studentIdFile"
                      onChange={handleChange}
                      accept="image/*,.pdf"
                      className="hidden"
                      id="studentIdFile"
                    />
                    <label htmlFor="studentIdFile" className="cursor-pointer">
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      {formData.studentIdFile ? (
                        <p className="text-primary font-medium">{formData.studentIdFile.name}</p>
                      ) : (
                        <>
                          <p className="text-gray-600">Click to upload your student ID</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (max 5MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.studentIdFile && <p className="form-error">{errors.studentIdFile}</p>}
                </div>

                {/* Transcript Upload */}
                <div>
                  <label className="form-label">Academic Transcript (Optional but recommended)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      name="transcriptFile"
                      onChange={handleChange}
                      accept="image/*,.pdf"
                      className="hidden"
                      id="transcriptFile"
                    />
                    <label htmlFor="transcriptFile" className="cursor-pointer">
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      {formData.transcriptFile ? (
                        <p className="text-primary font-medium">{formData.transcriptFile.name}</p>
                      ) : (
                        <>
                          <p className="text-gray-600">Click to upload your transcript</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (max 5MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Passport Photo Upload */}
                <div>
                  <label className="form-label">Passport Photograph *</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center ${errors.passportPhoto ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary'} transition-colors`}>
                    <input
                      type="file"
                      name="passportPhoto"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                      id="passportPhoto"
                    />
                    <label htmlFor="passportPhoto" className="cursor-pointer">
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      {formData.passportPhoto ? (
                        <p className="text-primary font-medium">{formData.passportPhoto.name}</p>
                      ) : (
                        <>
                          <p className="text-gray-600">Click to upload your passport photo</p>
                          <p className="text-xs text-gray-400 mt-1">PNG or JPG (max 2MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.passportPhoto && <p className="form-error">{errors.passportPhoto}</p>}
                </div>

                {/* Agreements */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary rounded mt-0.5"
                      id="agreeTerms"
                    />
                    <label htmlFor="agreeTerms" className="text-sm text-gray-600 cursor-pointer">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> of the Zitra Campus Ambassador Program. I understand that my participation is subject to meeting the program requirements and maintaining good academic standing. *
                    </label>
                  </div>
                  {errors.agreeTerms && <p className="form-error ml-8">{errors.agreeTerms}</p>}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary rounded mt-0.5"
                      id="agreePrivacy"
                    />
                    <label htmlFor="agreePrivacy" className="text-sm text-gray-600 cursor-pointer">
                      I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I consent to Zitra collecting and processing my personal information as described for the purposes of this application and program administration. *
                    </label>
                  </div>
                  {errors.agreePrivacy && <p className="form-error ml-8">{errors.agreePrivacy}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <ArrowRight size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
