# BVRIT Hackathon 2026 Website

A production-ready hackathon website built with React, Firebase, and Tailwind CSS.

## Features

### Public Website
- 🏠 Landing page with countdown timer
- 📖 About page with event details
- 📅 Schedule page with 24-hour timeline
- 🤝 Sponsors showcase
- ❓ FAQ section with accordion
- 📱 Fully responsive design
- 🎨 Modern dark theme with gradient highlights

### Authentication
- 🔐 Firebase Email/Password authentication
- 👤 User registration and login
- 🔄 Session persistence
- 🚪 Auto-redirect after login

### Application System
- 📝 MLH-compliant registration form
- 📄 PDF resume upload
- ✅ Form validation
- 🚫 Duplicate application prevention
- 💾 Firestore data storage
- 📦 Firebase Storage for resumes

### Admin Dashboard
- 📊 Analytics dashboard with statistics
- 📈 College distribution chart (Recharts)
- 📋 Applications management table
- 🔍 Search and filter functionality
- 📥 CSV export feature
- 👁️ Detailed application view
- ✅ Status management (Accept/Reject/Waitlist)
- 🔒 Role-based access control

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── pages/
│   ├── Landing.jsx          # Home page with hero and countdown
│   ├── About.jsx            # Event information
│   ├── Schedule.jsx         # 24-hour timeline
│   ├── Sponsors.jsx         # Sponsor showcase
│   ├── FAQ.jsx              # Frequently asked questions
│   ├── Apply.jsx            # Registration form
│   └── Login.jsx            # Authentication page
├── admin/
│   ├── Dashboard.jsx        # Admin analytics
│   ├── Applications.jsx     # Applications list
│   └── ApplicationDetail.jsx # Single application view
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── Footer.jsx           # Footer component
│   ├── Countdown.jsx        # Countdown timer
│   └── ProtectedRoute.jsx   # Route protection
├── context/
│   └── AuthContext.jsx      # Authentication context
├── firebase/
│   └── config.js            # Firebase configuration
├── utils/
│   └── exportCSV.js         # CSV export utility
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

## Setup Instructions

### 1. Clone the Repository

```bash
cd bvrit-hackathon-2026
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Enable Firebase Storage
5. Copy your Firebase config

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Deploy Firestore Rules

Deploy the security rules from `firestore.rules` and `storage.rules` to your Firebase project.

### 6. Create Admin User

After creating a user account, manually update their role in Firestore:

1. Go to Firestore Console
2. Find the user in the `users` collection
3. Change `role` field from `"student"` to `"admin"`

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 8. Build for Production

```bash
npm run build
```

### 9. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Firestore Collections

### users
```javascript
{
  uid: string,
  name: string,
  email: string,
  role: "student" | "admin",
  createdAt: string (ISO date)
}
```

### applications
```javascript
{
  userId: string,
  fullName: string,
  email: string,
  phone: string,
  college: string,
  degree: string,
  graduationYear: number,
  teamName: string,
  teamSize: number (1-4),
  skills: string[],
  github: string,
  resumeURL: string,
  whyParticipate: string,
  status: "pending" | "accepted" | "rejected" | "waitlisted",
  mlhAccepted: boolean,
  createdAt: string (ISO date)
}
```

## Security Rules

The project includes comprehensive Firestore and Storage security rules:

- Students can only read/create their own applications
- Students can only create one application
- Admins can read and update all applications
- Only admins can change application status
- Resume uploads limited to 5MB PDF files

## Features Checklist

✅ React with Vite  
✅ Firebase Authentication  
✅ Cloud Firestore  
✅ Firebase Storage  
✅ Tailwind CSS  
✅ React Router DOM  
✅ Recharts Analytics  
✅ Role-based Protection  
✅ Countdown Timer  
✅ MLH-compliant Form  
✅ Resume Upload (PDF only)  
✅ Duplicate Prevention  
✅ Admin Dashboard  
✅ CSV Export  
✅ Search & Filter  
✅ Status Management  
✅ Responsive Design  
✅ Toast Notifications  
✅ Loading States  
✅ Error Handling  

## Event Details

- **Event**: BVRIT Hackathon 2026
- **Duration**: 24 hours
- **Mode**: Offline
- **Participants**: 200+
- **Team Size**: 1-4 members
- **Registration**: FREE
- **Type**: MLH Member Event

## Admin Features

1. **Dashboard**: View statistics and college distribution chart
2. **Applications**: Browse, search, and filter all applications
3. **Export**: Download applications as CSV
4. **Review**: View detailed application information
5. **Manage**: Accept, reject, or waitlist applications

## Support

For issues or questions, contact: hackathon@bvrit.ac.in

## License

MIT License - feel free to use this for your own hackathon!
