# Forgot Password Setup Guide

## ✅ Implementation Complete

Forgot password functionality has been successfully implemented for both frontend and backend.

## 📧 Email Configuration Required

To enable the forgot password feature, you need to configure email settings in the `.env` file:

### Step 1: Enable Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (Enable if not already enabled)
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (without spaces)

### Step 2: Update .env File

Open `backend/.env` and update these values:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

Replace:

- `your-email@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the app password from Step 1

### Step 3: Restart Backend Server

After updating the `.env` file, restart your backend server:

```bash
cd backend
nodemon server.js
```

## 🎯 Features Implemented

### Backend:

- ✅ `/api/auth/forgot-password` - Sends reset link to email
- ✅ `/api/auth/reset-password/:token` - Resets password with token
- ✅ Token expires in 10 minutes for security
- ✅ Professional HTML email template with branded colors (#7EC4B8)
- ✅ Secure password hashing

### Frontend:

- ✅ `/forgot-password` - Forgot password page
- ✅ `/reset-password/:token` - Reset password page
- ✅ "Forgot?" link on login page
- ✅ Consistent design with login/signup pages
- ✅ Form validation and error handling
- ✅ Password visibility toggle
- ✅ Success messages and redirects

## 🚀 How to Test

1. **Configure email** (see steps above)
2. **Start backend**: `cd backend && nodemon server.js`
3. **Start frontend**: `cd frontend && npm run dev`
4. **Test flow**:
   - Go to login page
   - Click "Forgot?" link
   - Enter your email address
   - Check email for reset link
   - Click link to reset password
   - Enter new password and confirm
   - Login with new password

## 📂 Files Modified/Created

### Backend:

- `controllers/authController.js` - Added forgotPassword & resetPassword functions
- `routes/auth.js` - Added forgot/reset password routes
- `models/User.js` - Already has resetPasswordToken & resetPasswordExpire fields
- `.env` - Added EMAIL_USER and EMAIL_PASS config

### Frontend:

- `pages/ForgotPassword.jsx` - New page for requesting reset
- `pages/ResetPassword.jsx` - New page for setting new password
- `pages/Login.jsx` - Added "Forgot?" link
- `App.jsx` - Added routes for forgot/reset password pages

## 🔐 Security Features

- Reset tokens are hashed before storing in database
- Tokens expire after 10 minutes
- Old token is invalidated after password reset
- Password is hashed using bcrypt
- Email validation before sending reset link

## ⚠️ Important Notes

- **Never commit your `.env` file** with real credentials
- Use **App Passwords**, not your regular Gmail password
- If using other email providers (not Gmail), update the transporter config in `authController.js`
- Test email delivery before deploying to production

## 🎨 Design

All pages match the existing design system:

- Background: `bg-login.png`
- Primary color: `#7EC4B8`
- Hover color: `#6DB3A7`
- Consistent spacing and typography with Login/Signup pages
