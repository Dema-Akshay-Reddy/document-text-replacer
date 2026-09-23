# 📄 Document Text Replacer

A simple, powerful web application to replace multiple texts in Word documents at once.

## 🚀 Quick Start

**Local Development:**
```bash
npm start
```

**Access the application:**
- Desktop: `http://localhost:3000`
- Mobile (same WiFi): `http://YOUR_IP:3000`

**Deploy to Vercel:**
- See `VERCEL_DEPLOY.md` or `deploy-to-vercel.txt`
- One-click deployment with automatic HTTPS
- Free hosting with global CDN

---

## ✨ Features

- 🎯 **Replace Multiple Texts** - Add unlimited find/replace pairs
- ➕ **Dynamic Form** - Add or remove replacement pairs as needed
- ⚡ **Batch Processing** - All replacements happen in one operation
- 📱 **Mobile-Friendly** - Fully responsive design for all devices
- 🔒 **Private** - Runs locally, your documents never leave your computer
- ⚡ **Fast** - Instant processing of Word documents

---

## 📖 How to Use

1. Open `http://localhost:3000` in your browser
2. Upload a Word document (.docx)
3. Enter the first text to find and its replacement
4. Click **"+ Add Another Replacement"** to add more pairs
5. Add as many replacements as you need
6. Click **"Replace All & Download"**
7. Your updated document downloads automatically!

---

## 💡 Example Use Cases

### Contract Template
Replace multiple placeholders in one operation:

| Find | Replace With |
|------|-------------|
| {{NAME}} | John Smith |
| {{COMPANY}} | Acme Corporation |
| {{DATE}} | January 15, 2024 |
| {{EMAIL}} | john@acme.com |
| {{PHONE}} | (555) 123-4567 |
| {{ADDRESS}} | 123 Main St, City, State |

### Company Rebranding
Update multiple references across documents:

| Find | Replace With |
|------|-------------|
| OldCompany Inc. | NewBrand LLC |
| old-logo.png | new-logo.png |
| www.oldsite.com | www.newsite.com |

---

## 📱 Mobile Access

### Access from Phone/Tablet (Same WiFi)

1. **Find your computer's IP address:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.10)

2. **On your mobile device:**
   - Connect to the same WiFi as your computer
   - Open browser (Safari/Chrome)
   - Go to: `http://192.168.1.10:3000` (use your IP)

3. **If you can't connect:**
   Allow port 3000 in Windows Firewall (run as Administrator):
   ```bash
   netsh advfirewall firewall add rule name="Node3000" dir=in action=allow protocol=TCP localport=3000
   ```

### Mobile Features
- ✅ Responsive design adapts to screen size
- ✅ Touch-friendly buttons and inputs
- ✅ Stacked layout on mobile for easy typing
- ✅ Works on iPhone, Android, iPad, tablets

---

## 🛠️ Technical Details

### Tech Stack
- **Framework:** Express.js
- **Port:** 3000
- **Word Processing:** PizZip + Docxtemplater
- **File Upload:** Multer

### Supported Formats
- ✅ **Word Documents (.docx)** - Fully supported
- ❌ **PDF Documents** - Not supported

**Have a PDF?** Convert it to Word for free at [ILovePDF](https://www.ilovepdf.com/pdf_to_word)

### Project Structure
```
converter/
├── server.js          # Main application server
├── package.json       # Dependencies configuration
├── package-lock.json  # Dependency versions lock
├── README.md          # This file
├── node_modules/      # Installed packages (auto-generated)
└── uploads/           # Temporary upload folder (auto-created)
```

---

## ⚙️ Commands

### Start the server
```bash
npm start
```

### Stop the server
Press `Ctrl + C` in the terminal

### Restart the server
```bash
npm start
```

### Install/Update dependencies
```bash
npm install
```

---

## 💡 Tips & Best Practices

### General Tips
- ✅ Works with Word documents (.docx) only
- ✅ All occurrences of each text will be replaced
- ✅ Text matching is case-sensitive
- ✅ You can add/remove pairs dynamically
- ✅ No limit on number of replacements
- ✅ Test with a sample document first

### Formatted Text
**Issue:** If text has mixed formatting (bold, italic, colors), it might not replace.

**Solutions:**
- **Option A:** Remove formatting in Word first (select text → Clear Formatting)
- **Option B:** Replace smaller pieces individually
- **Option C:** Use Word's Find & Replace (Ctrl+H)

### Mobile Usage
- ✅ Use portrait mode for best experience
- ✅ Bookmark the URL for quick access
- ✅ Works without internet (just local WiFi)
- ✅ Share the URL with colleagues on same WiFi

---

## 🎯 Use Cases

- ✅ Template documents with multiple placeholders
- ✅ Contracts with multiple fields to customize
- ✅ Form letters with multiple variables
- ✅ Batch updates to company names/details
- ✅ Document personalization with many fields
- ✅ Mass customization of documents

---

## 🔧 Troubleshooting

### Server won't start
- Make sure port 3000 is not already in use
- Run `npm install` to ensure dependencies are installed
- Check if Node.js is installed: `node --version`

### Word documents not working
- Make sure the file is a valid .docx (not .doc)
- Check that the text exists in the document
- Try removing formatting if text doesn't replace

### Can't access from mobile
- Check both devices are on the same WiFi
- Verify IP address is correct
- Check Windows Firewall allows port 3000
- Use `http://` not `https://`

### Replacement not working for some text
- Text might have mixed formatting (see "Formatted Text" section above)
- Text might be in a table or text box
- Try replacing smaller parts individually

---

## 🔒 Security & Privacy

- ✅ **Runs locally** - No data sent to external servers
- ✅ **Auto-cleanup** - Uploaded files deleted after processing
- ✅ **Private** - Your documents never leave your computer
- ✅ **No tracking** - No analytics or data collection

**For production use:** Consider adding authentication and HTTPS.

---

## 📦 Dependencies

- **express** - Web server framework
- **multer** - File upload handling
- **pizzip** - ZIP file manipulation (Word files are ZIP archives)
- **docxtemplater** - Word document processing

---

## 🌐 Browser Support

### Desktop
- ✅ Chrome / Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Mobile
- ✅ Safari (iOS)
- ✅ Chrome (iOS & Android)
- ✅ Firefox (iOS & Android)
- ✅ Samsung Internet (Android)

---

## 📝 Version History

### v1.0.0 (Current)
- Multiple text replacements in one operation
- Dynamic add/remove replacement pairs
- Mobile-responsive design
- Handles formatted text in Word documents
- Word documents only (.docx support)
- PDF conversion guidance (ILovePDF)

---

## 🤝 Need Help?

1. Check this README for common solutions
2. Ensure server is running: `npm start`
3. Check browser console for errors (F12)
4. Verify file format is .docx

---

## 📄 License

This is a personal/internal tool. Use at your own discretion.

---

**🚀 Your application is ready! Access it at: http://localhost:3000**

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  📄 DOCUMENT TEXT REPLACER - QUICK REFERENCE     │
├─────────────────────────────────────────────────┤
│                                                  │
│  START:    npm start                             │
│  ACCESS:   http://localhost:3000                 │
│  MOBILE:   http://YOUR_IP:3000                   │
│  STOP:     Ctrl + C                              │
│                                                  │
│  FORMAT:   .docx only                            │
│  LIMIT:    Unlimited replacements                │
│  PRIVACY:  100% local processing                 │
│                                                  │
│  PDF?      Convert at ilovepdf.com/pdf_to_word  │
│                                                  │
└─────────────────────────────────────────────────┘
```
