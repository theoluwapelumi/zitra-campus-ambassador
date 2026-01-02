# Zitra Campus Ambassador Program Website

A comprehensive web application for managing the Zitra Campus Ambassador Program, including:
- Landing page with program information
- Multi-step application form
- Admin dashboard for reviewing applications

## Features

### Landing Page
- Hero section with program overview
- About section explaining the program
- Eligibility requirements
- Selection process steps
- How to get started guide
- Testimonials
- FAQ section
- Call-to-action sections

### Application Form
- 5-step multi-stage form
- Personal information collection
- Academic information with CGPA validation
- Zitra account verification
- Social media presence assessment
- Document uploads (Student ID, Transcript, Photo)
- Form validation at each step
- Success confirmation page

### Admin Dashboard
- Password-protected access (Demo: `ZitraAdmin2025`)
- Application statistics overview
- Searchable and filterable application list
- Detailed application view modal
- Status management (Pending, Interview, Approved, Rejected)
- Export functionality (placeholder)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom Zitra branding
- **Icons**: Lucide React
- **Font**: Poppins (Google Fonts)

## Zitra Brand Colors

```css
Primary: #60B74B, #538251
Secondary: #F3EA17, #AC4D9D, #F6A31D, #78BE49, #C44884, #D1A7CE
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file for production:

```env
# Email Service (for sending confirmations)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Database (for storing applications)
DATABASE_URL=your-database-url

# File Storage (for uploads)
CLOUDINARY_URL=your-cloudinary-url
# or
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with program information |
| `/apply` | Multi-step application form |
| `/admin` | Admin dashboard (password protected) |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/apply` | POST | Submit application |
| `/api/apply` | GET | Health check |

## Customization

### Updating Content
- Edit landing page content in `app/page.js`
- Modify form fields in `app/apply/page.js`
- Update admin features in `app/admin/page.js`

### Branding
- Colors defined in `tailwind.config.js`
- Global styles in `app/globals.css`

## Production Checklist

- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Configure email service (SendGrid/Mailgun)
- [ ] Set up file storage (Cloudinary/AWS S3)
- [ ] Implement proper authentication for admin
- [ ] Add rate limiting
- [ ] Set up monitoring and analytics
- [ ] Configure SSL certificate
- [ ] Set up backup system

## License

© 2025 Zitra. All rights reserved.
