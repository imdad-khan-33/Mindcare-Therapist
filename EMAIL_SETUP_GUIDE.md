# 📧 Email Configuration Guide for Forgot Password

## ⚠️ Current Issue: "Email could not be sent"

This error occurs because email credentials are not configured in your `.env` file.

---

## 🔧 Quick Fix (3 Steps)

### Step 1: Get Gmail App Password

1. **Open Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification**:
   - Go to Security → 2-Step Verification
   - Follow the setup if not already enabled
3. **Generate App Password**:
   - Search for "App passwords" in your Google Account
   - Select app: "Mail"
   - Select device: "Other" → Type "MindCare TheraHub"
   - Click **Generate**
   - Copy the 16-character password (example: `abcd efgh ijkl mnop`)

### Step 2: Update .env File

Open `backend/.env` file and replace these lines:

**Before:**

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
```

**After:**

```env
EMAIL_USER=yourrealemail@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

⚠️ **Important**:

- Replace `yourrealemail@gmail.com` with YOUR actual Gmail
- Replace `abcdefghijklmnop` with YOUR 16-char app password (remove spaces)
- Don't use your regular Gmail password - use App Password only!

### Step 3: Restart Backend

After saving `.env`, restart your backend:

```bash
# Stop the current server (Ctrl + C)
# Then restart:
cd backend
nodemon server.js
```

---

## ✅ Verify It's Working

1. Go to `http://localhost:3000/login`
2. Click "Forgot?" link
3. Enter your email (any email in your database)
4. Click "Send Reset Link"
5. Check if email arrives in inbox

---

## 🚨 Troubleshooting

### Problem: "Less secure app access" message

**Solution**: Use App Password (not regular password)

### Problem: Still getting "Email could not be sent"

**Check**:

1. Is 2-Step Verification enabled on your Google account?
2. Did you copy the app password correctly (no spaces)?
3. Did you restart the backend server after updating .env?
4. Check backend terminal for detailed error messages

### Problem: Email not received

**Check**:

1. Spam/Junk folder
2. Email address exists in database
3. Gmail sending limits (try different email)

### Problem: "Invalid credentials"

**Solution**:

1. Delete old app password from Google Account
2. Generate a new app password
3. Update .env with new password
4. Restart backend

---

## 🔐 Security Notes

- ✅ Never commit `.env` file to Git
- ✅ Use App Passwords only (never regular password)
- ✅ Keep your credentials private
- ✅ Add `.env` to `.gitignore`

---

## 📝 Alternative: Using Other Email Providers

If you want to use **Outlook/Hotmail** or other providers:

**For Outlook:**

```javascript
// In authController.js, update createEmailTransporter:
const transporter = nodemailer.createTransport({
  service: "outlook", // Change this
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

**For Custom SMTP:**

```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

---

## 🎯 After Configuration

Once email is configured, the forgot password flow will work:

1. User clicks "Forgot?" on login page
2. Enters email → Receives reset link
3. Clicks link → Sets new password
4. Can login with new password

---

**Need Help?** Check backend console for detailed error messages!
