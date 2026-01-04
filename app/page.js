'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Check, Quote, GraduationCap, Users, CreditCard, BarChart3, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

// Navigation Component
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold text-lg">
              Z
            </div>
            <span className="text-xl font-bold text-primary">Zitra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-700 hover:text-primary font-medium transition-colors">About</a>
            <a href="#eligibility" className="text-gray-700 hover:text-primary font-medium transition-colors">Eligibility</a>
            <a href="#process" className="text-gray-700 hover:text-primary font-medium transition-colors">Process</a>
            <a href="#faq" className="text-gray-700 hover:text-primary font-medium transition-colors">FAQ</a>
            <Link href="/apply" className="btn-primary text-sm">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-gray-700 hover:text-primary font-medium">About</a>
              <a href="#eligibility" className="text-gray-700 hover:text-primary font-medium">Eligibility</a>
              <a href="#process" className="text-gray-700 hover:text-primary font-medium">Process</a>
              <a href="#faq" className="text-gray-700 hover:text-primary font-medium">FAQ</a>
              <Link href="/apply" className="btn-primary text-sm w-fit">
                Apply Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 animate-float" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-secondary-yellow rounded-full opacity-20 -translate-x-1/2 animate-float-delayed" />
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-secondary-purple rounded-full opacity-10 animate-float" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
          <span className="text-sm font-medium text-primary-dark">Now accepting applications nationwide</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
          Zitra Campus<br />
          <span className="gradient-text">Ambassador Program</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Represent Zitra on your campus, drive financial inclusion, excel academically, 
          and win up to ₦250,000 in annual scholarships for top performers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/apply" className="btn-primary">
            Become an Ambassador <ArrowRight size={18} />
          </Link>
          <a href="#about" className="btn-outline">
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: '💰', value: '₦250k', label: 'Annual Scholarship' },
            { icon: '🏆', value: 'Top 3', label: 'Winners Selected' },
            { icon: '🎓', value: 'All Unis', label: 'Nationwide Coverage' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg min-w-[160px] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-light" />
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function About() {
  const features = [
    'Performance-based rewards combining accounts opened & academics',
    'Nationwide competition across all Nigerian universities',
    'Build leadership skills and expand your professional network',
    'Exclusive access to Zitra career opportunities',
  ]

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=700&fit=crop"
              alt="Students collaborating"
              className="rounded-3xl shadow-2xl w-full"
            />
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🏦</div>
                <div>
                  <div className="font-bold text-gray-900">Drive Impact</div>
                  <div className="text-sm text-gray-500">Help peers access banking</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">⭐</div>
                <div>
                  <div className="font-bold text-gray-900">Excel & Earn</div>
                  <div className="text-sm text-gray-500">Rewards for performance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Rewarding brilliance,<br />empowering future leaders.
            </h2>
            <p className="text-gray-600 mb-4">
              The Zitra Campus Ambassador Program is our commitment to nurturing Nigeria's brightest minds. 
              We believe in rewarding students who combine academic excellence with real-world impact.
            </p>
            <p className="text-gray-600 mb-8">
              As a Zitra Ambassador, you'll introduce students on your campus to seamless digital banking 
              with Zitra Bank while maintaining outstanding academic performance. The top 3 performers 
              nationwide win ₦250,000 annual scholarships.
            </p>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Eligibility Section
function Eligibility() {
  const requirements = [
    { icon: <GraduationCap size={24} />, color: 'bg-green-100 text-primary', title: 'Currently Enrolled Student', desc: 'Must be an active undergraduate student at a recognized Nigerian university' },
    { icon: <BarChart3 size={24} />, color: 'bg-yellow-100 text-yellow-600', title: 'Strong Academic Standing', desc: 'Minimum CGPA of 3.0/5.0 or equivalent (Second Class Upper and above)' },
    { icon: <Users size={24} />, color: 'bg-purple-100 text-purple-600', title: 'Campus Influence', desc: 'Active on campus with strong social network and communication skills' },
    { icon: <CreditCard size={24} />, color: 'bg-orange-100 text-orange-600', title: 'Zitra Account Holder', desc: 'Must have or be willing to open a Zitra Bank account' },
  ]

  return (
    <section id="eligibility" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Who can apply?</h2>
            <div className="space-y-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-transparent hover:border-primary">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${req.color}`}>
                    {req.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{req.title}</h4>
                    <p className="text-sm text-gray-600">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=700&fit=crop"
              alt="Smiling student"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Process Section
function Process() {
  const steps = [
    { num: 1, title: 'Application Submission', desc: 'Complete the online application form with your academic records and campus involvement details' },
    { num: 2, title: 'Application Review', desc: 'Our team reviews your application, verifying academic credentials and assessing campus influence' },
    { num: 3, title: 'Shortlisting', desc: 'Qualified candidates are shortlisted based on academic performance and potential impact' },
    { num: 4, title: 'Virtual Interview', desc: 'Shortlisted candidates participate in virtual interviews to assess communication and leadership skills' },
    { num: 5, title: 'Onboarding', desc: 'Selected ambassadors receive comprehensive training on Zitra products and ambassador responsibilities' },
    { num: 6, title: 'Official Announcement', desc: 'Welcome to the Zitra family! Start your journey as an official Campus Ambassador' },
  ]

  return (
    <section id="process" className="py-20 px-4 bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full opacity-30 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Fair and transparent<br />selection process</h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Our selection process ensures every candidate gets a fair chance to showcase their potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary-yellow to-secondary-orange rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mb-4">
                {step.num}
              </div>
              <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
              <p className="text-green-100 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How to Get Started
function GetStarted() {
  const steps = [
    { num: 1, title: 'Confirm your eligibility', desc: 'Make sure you meet all the requirements listed above before applying' },
    { num: 2, title: 'Open a Zitra Bank account', desc: "Download the Zitra app and create your account in minutes if you haven't already" },
    { num: 3, title: 'Gather your documents', desc: 'Prepare your student ID, academic transcript, and a passport photograph' },
    { num: 4, title: 'Submit your application', desc: 'Fill out the ambassador application form with accurate information' },
    { num: 5, title: 'Spread the word', desc: 'Start building momentum on campus while you wait for your application review' },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">How to get started</h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-primary to-primary-dark p-10 rounded-3xl text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="text-6xl mb-4">🚀</div>
              <div className="text-4xl font-bold mb-2">₦250,000</div>
              <p className="text-green-100">Annual scholarship for top 3 performers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials
function Testimonials() {
  const testimonials = [
    { quote: "Being a campus ambassador taught me invaluable leadership and marketing skills. The scholarship support helped me focus on my academics without financial stress.", name: 'Adaeze Okonkwo', school: 'University of Lagos', initials: 'AO' },
    { quote: "The experience of helping my coursemates access better banking services while earning rewards for my academics was incredibly fulfilling. I grew so much professionally.", name: 'Chinedu Taiwo', school: 'Ahmadu Bello University', initials: 'CT' },
    { quote: "The program gave me real-world experience in financial services while still in school. It opened doors to opportunities I never imagined possible as a student.", name: 'Fatima Ibrahim', school: 'University of Ibadan', initials: 'FI' },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What people are saying</h2>
          <p className="text-gray-600">Hear from students who have been part of similar ambassador programs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="text-5xl text-primary mb-4">"</div>
              <p className="text-gray-600 mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-semibold">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.school}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to join the next<br />generation of leaders?
          </h2>
          <p className="text-green-100 mb-8 relative z-10">
            Apply now and start your journey to winning ₦250,000 in scholarships
          </p>
          <Link href="/apply" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-secondary-yellow hover:text-gray-900 transition-all relative z-10">
            Apply Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: 'What is the Zitra Campus Ambassador Program?', a: 'The Zitra Campus Ambassador Program is a nationwide initiative that empowers university students to represent Zitra Bank on their campuses. Ambassadors help fellow students open Zitra Bank accounts while maintaining excellent academic performance. The top 3 performers win ₦250,000 annual scholarships.' },
    { q: 'Who can apply for the program?', a: 'Any currently enrolled undergraduate student at a recognized Nigerian university with a minimum CGPA of 3.0/5.0 (or equivalent) can apply. You must be an active member of your campus community with good communication skills and leadership potential.' },
    { q: 'Do I need to be a Zitra customer before applying?', a: "While it's not required to have a Zitra account before applying, you will need to open one as part of the onboarding process. We recommend downloading the Zitra app and creating your account before submitting your application." },
    { q: 'How is performance measured?', a: "Performance is measured using a combination of two key metrics: the number of valid Zitra Bank accounts opened through your referrals, and your academic performance (CGPA). Both factors are weighted to determine overall performance scores for scholarship selection." },
    { q: 'Are students from all universities eligible?', a: 'Yes! The program is open to undergraduate students from all recognized universities across Nigeria - federal, state, and private institutions. This is truly a nationwide opportunity.' },
    { q: 'What are the scholarship amounts?', a: 'The top 3 performers nationwide each receive ₦250,000 in annual scholarships. Scholarships are awarded based on combined performance in account acquisition and academic excellence.' },
    { q: 'How do I apply?', a: 'Click the "Apply Now" button on this page to access the application form. You\'ll need to provide your personal details, academic information, student ID, and explain why you\'d make a great Zitra Ambassador. Make sure all information is accurate before submitting.' },
    { q: 'Is there an application fee?', a: 'No, the application is completely free. Zitra does not charge any fees for applying to the Campus Ambassador Program.' },
    { q: "I submitted my application but didn't get a confirmation email. What should I do?", a: "Please check your spam/junk folder first. If you still can't find the confirmation email, contact us at ambassadors@zitrabank.com with your full name and application details, and we'll verify your submission status." },
    { q: 'How can I stay updated about the program?', a: 'Follow Zitra Bank on all social media platforms (Instagram, Twitter, Facebook, LinkedIn) for the latest updates. You can also subscribe to our newsletter through the Zitra app for direct notifications about the program.' },
    { q: "Can I reapply next year if I don't get selected?", a: "Absolutely! If you're not selected this year, you're welcome to apply again in subsequent years as long as you still meet the eligibility criteria and remain enrolled as an undergraduate student." },
    { q: 'How are scholarship recipients selected?', a: 'Selection is based on a transparent scoring system that combines your account acquisition performance (referrals) and academic performance (CGPA). The top 3 scorers nationwide at the end of each evaluation period receive the scholarships.' },
    { q: 'Will there be an interview?', a: "Yes, shortlisted candidates will be invited to participate in a virtual interview. This helps us assess your communication skills, campus influence, and alignment with Zitra's values and mission." },
    { q: 'When will the winners be announced?', a: 'Scholarship winners are announced at the end of each academic year evaluation period. Specific dates will be communicated to all ambassadors via email and the official Zitra social media channels.' },
    { q: "Can I apply if I've received another scholarship?", a: 'Yes, you can still apply and participate in the program even if you\'re receiving other scholarships. The Zitra Ambassador Scholarship is awarded based on performance in the program and is not mutually exclusive with other scholarships.' },
    { q: 'How will I receive the scholarship funds?', a: 'Scholarship funds are disbursed directly to your Zitra Bank account. This is one of the reasons why having an active Zitra account is a requirement for the program.' },
    { q: 'Can postgraduate students apply?', a: "Currently, the program is designed specifically for undergraduate students. However, we're always expanding our initiatives, so stay tuned to our official channels for future opportunities for postgraduate students." },
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Have questions?</h2>
          <p className="text-gray-600">Find answers to commonly asked questions about the Zitra Campus Ambassador Program</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                className="w-full p-5 flex justify-between items-center text-left font-semibold text-gray-900 hover:text-primary transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform flex-shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/apply" className="btn-primary">
            Become an Ambassador <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const socialLinks = [
    { icon: '𝕏', href: 'https://twitter.com/ziaborng', label: 'Twitter' },
    { icon: 'in', href: 'https://linkedin.com/company/zitrabank', label: 'LinkedIn' },
    { icon: 'f', href: 'https://facebook.com/zitrabank', label: 'Facebook' },
    { icon: '📸', href: 'https://instagram.com/zitrabank', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold text-lg">
                Z
              </div>
              <span className="text-xl font-bold">Zitra</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering the next generation of financial leaders across Nigerian universities.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-primary transition-colors">Ambassador Program</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#eligibility" className="hover:text-primary transition-colors">Eligibility</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://zitrabank.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Zitra Bank</a></li>
              <li><a href="https://zitrabank.com/investments" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Zitra Investments</a></li>
              <li><a href="https://zitrabank.com/app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Mobile App</a></li>
              <li><a href="https://zitrabank.com/business" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Business Banking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:ambassadors@zitrabank.com" className="hover:text-primary transition-colors">ambassadors@zitrabank.com</a></li>
              <li><a href="https://zitrabank.com/help" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="https://zitrabank.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="https://zitrabank.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Zitra. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Eligibility />
      <Process />
      <GetStarted />
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  )
}
