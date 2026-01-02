'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Download, Eye, CheckCircle, XCircle, Clock, 
  ChevronDown, Users, GraduationCap, TrendingUp,
  Mail, Phone, Calendar, X
} from 'lucide-react'

const sampleApplications = [
  { id: 'APP001', firstName: 'Adaeze', lastName: 'Okonkwo', email: 'adaeze.okonkwo@gmail.com', phone: '+234 803 456 7890', university: 'University of Lagos (UNILAG)', department: 'Computer Science', faculty: 'Faculty of Science', level: '300 Level', cgpa: 4.25, status: 'pending', submittedAt: '2025-01-02T10:30:00', hasZitraAccount: true, zitraAccountNumber: '1234567890', instagramHandle: '@adaeze_codes', followersCount: '5000-10000', whyAmbassador: 'I am passionate about financial literacy and want to help my fellow students access better banking services. My campus influence and technical skills make me an ideal candidate.', campusActivities: 'Computer Science Students Association (Vice President), Google Developer Student Club, Women in Tech Nigeria campus chapter' },
  { id: 'APP002', firstName: 'Chinedu', lastName: 'Taiwo', email: 'chinedu.taiwo@student.abu.edu.ng', phone: '+234 812 345 6789', university: 'Ahmadu Bello University (ABU)', department: 'Economics', faculty: 'Faculty of Social Sciences', level: '400 Level', cgpa: 3.85, status: 'approved', submittedAt: '2025-01-01T14:20:00', hasZitraAccount: true, zitraAccountNumber: '0987654321', instagramHandle: '@chinedu_t', followersCount: '1000-5000', whyAmbassador: 'As an Economics student, I understand the importance of financial inclusion and digital banking in developing economies.', campusActivities: 'Economics Students Union, Entrepreneurship Club' },
  { id: 'APP003', firstName: 'Fatima', lastName: 'Ibrahim', email: 'fatima.ibrahim@ui.edu.ng', phone: '+234 708 123 4567', university: 'University of Ibadan (UI)', department: 'Mass Communication', faculty: 'Faculty of Arts', level: '200 Level', cgpa: 4.50, status: 'interview', submittedAt: '2024-12-30T09:15:00', hasZitraAccount: false, zitraAccountNumber: '', instagramHandle: '@fatima_connects', followersCount: '10000+', whyAmbassador: 'With my background in Mass Communication and large social media following, I can effectively spread awareness about Zitra.', campusActivities: 'Mass Communication Students Association, Campus Radio Host, Social Media Manager for Student Union' },
  { id: 'APP004', firstName: 'Olumide', lastName: 'Adeyemi', email: 'olumide.adeyemi@lasu.edu.ng', phone: '+234 809 876 5432', university: 'Lagos State University (LASU)', department: 'Accounting', faculty: 'Faculty of Management Sciences', level: '300 Level', cgpa: 3.20, status: 'rejected', submittedAt: '2024-12-28T16:45:00', hasZitraAccount: true, zitraAccountNumber: '5678901234', instagramHandle: '', followersCount: '0-500', whyAmbassador: 'I want to earn extra income while studying.', campusActivities: 'None specified' },
  { id: 'APP005', firstName: 'Blessing', lastName: 'Eze', email: 'blessing.eze@unn.edu.ng', phone: '+234 815 234 5678', university: 'University of Nigeria, Nsukka (UNN)', department: 'Banking and Finance', faculty: 'Faculty of Business Administration', level: '400 Level', cgpa: 4.10, status: 'pending', submittedAt: '2025-01-03T08:00:00', hasZitraAccount: true, zitraAccountNumber: '3456789012', instagramHandle: '@blessingfinance', followersCount: '1000-5000', whyAmbassador: 'As a Banking and Finance student, I am deeply interested in promoting digital banking solutions to my peers.', campusActivities: 'Finance Club President, Investment Society Member' },
]

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
  interview: { label: 'Interview', color: 'bg-blue-100 text-blue-700', icon: Calendar },
}

export default function AdminPage() {
  const [applications, setApplications] = useState(sampleApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApp, setSelectedApp] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'ZitraAdmin2025') {
      setIsAuthenticated(true)
    } else {
      setPasswordError('Invalid password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">Z</div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input mb-4" placeholder="Enter admin password" />
            {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
            <button type="submit" className="btn-primary w-full justify-center">Login</button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">Demo password: ZitraAdmin2025</p>
          <Link href="/" className="block text-center text-sm text-gray-500 hover:text-primary mt-4">← Back to website</Link>
        </div>
      </div>
    )
  }

  const filtered = applications.filter(app => {
    const matchesSearch = `${app.firstName} ${app.lastName} ${app.email} ${app.university} ${app.id}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    interview: applications.filter(a => a.status === 'interview').length,
  }

  const updateStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app))
    if (selectedApp?.id === appId) setSelectedApp(prev => ({ ...prev, status: newStatus }))
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold">Z</div>
            <div>
              <h1 className="font-bold text-gray-900">Ambassador Admin</h1>
              <p className="text-xs text-gray-500">Manage applications</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-gray-500 hover:text-primary">View Website →</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: stats.total, icon: Users, color: 'text-gray-600' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
            { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-green-600' },
            { label: 'Interviews', value: stats.interview, icon: Calendar, color: 'text-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <stat.icon className={stat.color} size={24} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search by name, email, university..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-input pl-10" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input md:w-48">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="btn-outline flex items-center gap-2 justify-center">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Applicant</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">University</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">CGPA</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Submitted</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((app) => {
                  const StatusIcon = statusConfig[app.status].icon
                  return (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {app.firstName[0]}{app.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{app.firstName} {app.lastName}</p>
                            <p className="text-sm text-gray-500">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{app.university}</p>
                        <p className="text-xs text-gray-500">{app.department}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${app.cgpa >= 4.0 ? 'text-green-600' : app.cgpa >= 3.5 ? 'text-blue-600' : 'text-yellow-600'}`}>
                          {app.cgpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[app.status].color}`}>
                          <StatusIcon size={14} />
                          {statusConfig[app.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(app.submittedAt)}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => setSelectedApp(app)} className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-1">
                          <Eye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">No applications found matching your criteria.</div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedApp(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedApp.firstName} {selectedApp.lastName}</h2>
                <p className="text-sm text-gray-500">Application ID: {selectedApp.id}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Actions */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Change status:</span>
                {['pending', 'interview', 'approved', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedApp.id, status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedApp.status === status 
                        ? statusConfig[status].color 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {statusConfig[status].label}
                  </button>
                ))}
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{selectedApp.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{selectedApp.phone}</p>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Academic Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">University:</span> <span className="font-medium">{selectedApp.university}</span></div>
                  <div><span className="text-gray-500">Faculty:</span> <span className="font-medium">{selectedApp.faculty}</span></div>
                  <div><span className="text-gray-500">Department:</span> <span className="font-medium">{selectedApp.department}</span></div>
                  <div><span className="text-gray-500">Level:</span> <span className="font-medium">{selectedApp.level}</span></div>
                  <div><span className="text-gray-500">CGPA:</span> <span className="font-medium text-primary">{selectedApp.cgpa.toFixed(2)}/5.00</span></div>
                </div>
              </div>

              {/* Zitra Account */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Zitra Account</h3>
                <p className="text-sm">
                  {selectedApp.hasZitraAccount 
                    ? <span className="text-green-600">✓ Has account: {selectedApp.zitraAccountNumber}</span>
                    : <span className="text-yellow-600">✗ No account yet</span>
                  }
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Social Presence</h3>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-500">Instagram:</span> {selectedApp.instagramHandle || 'Not provided'}</p>
                  <p><span className="text-gray-500">Followers:</span> {selectedApp.followersCount}</p>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Why they want to be an Ambassador</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApp.whyAmbassador}</p>
              </div>

              {/* Campus Activities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Campus Activities</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApp.campusActivities}</p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <a href={`mailto:${selectedApp.email}`} className="btn-primary flex-1 justify-center text-sm">
                  <Mail size={16} /> Send Email
                </a>
                <button onClick={() => setSelectedApp(null)} className="btn-outline flex-1 justify-center text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
