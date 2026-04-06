# Quick Start Guide - Great Peace & Love Hotel Website

## 🚀 5-Minute Setup

### Step 1: Open the Website

Double-click **`index.html`** in the project folder to open it in your default browser.

### Step 2: Test the Features

- Click "Book Now" buttons → Should open WhatsApp
- Scroll down → Counters should animate
- View gallery → Click images to see lightbox
- Test mobile menu → Resize browser to see hamburger menu

### Step 3: Customize (Optional)

1. Open `index.html` in a text editor
2. Find text you want to change
3. Modify and save
4. Refresh browser to see changes

---

## 📋 File Directory

```
GPL hotel update/
├── 📄 index.html          ← HOME PAGE (start here!)
├── 📄 about.html          ← About the hotel
├── 📄 rooms.html          ← Room types
├── 📄 amenities.html      ← Services & facilities
├── 📄 gallery.html        ← Photos
├── 📄 contact.html        ← Contact & booking
├── 📁 css/
│   └── 📄 main.css        ← All styling
├── 📁 js/
│   └── 📄 main.js         ← All interactions
└── 📄 README.md           ← Full documentation
```

---

## 🎯 Key Features Explained

### WhatsApp Booking

Every "Book Now" button automatically creates a WhatsApp message.

**Current number:** +233 55 218 0078

To change it:

1. Open `js/main.js`
2. Find line: `const WHATSAPP_NUMBER = '233552180078';`
3. Replace with your number (without + symbol)
4. Save and refresh

### Counter Animation

The stats section (10 Rooms, 9.3 Rating, etc.) automatically counts up when you scroll to it.

- No manual trigger needed
- Happens only once per page load
- Works on all devices

### Gallery Lightbox

Click any gallery image to see it full-screen.

- Click outside to close
- Press ESC to close
- Responsive on mobile

### Mobile Navigation

On mobile devices, the menu becomes a hamburger icon.

- Click icon to toggle
- Automatically closes when you click a link
- No code changes needed

---

## 🎨 How to Customize

### Change Colors

1. Open `css/main.css`
2. Find lines 8-23 (the `:root` section)
3. Update color codes:
   - Primary color (green): `#2c5f4f`
   - Secondary color (green): `#48a868`
   - Accent color (gold): `#f39c12`

Example:

```css
:root {
  --primary-color: #0066cc; /* Change this to your color */
  --secondary-color: #00cc99;
  /* ... */
}
```

### Change Text

1. Open any `.html` file
2. Find the text you want to change
3. Edit it
4. Save and refresh browser

Example:

```html
<!-- Before -->
<h1>Welcome to Great Peace & Love Hotel</h1>

<!-- After -->
<h1>Welcome to Your Sanctuary</h1>
```

### Add Images to Gallery

1. Save your images in the `assets/` folder
2. Open `gallery.html`
3. Replace gradient backgrounds with image paths:

```html
<!-- Before (gradient) -->
<div
  class="gallery-image"
  style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
>
  <!-- After (image) -->
  <div
    class="gallery-image"
    style="background: url('assets/room1.jpg'); background-size: cover;"
  ></div>
</div>
```

---

## 🔧 Common Customizations

### Update Hotel Name

Search all files for "Great Peace & Love Hotel" and replace with your hotel name.

### Update Phone Number

In `js/main.js` line 4:

```javascript
const WHATSAPP_NUMBER = "233552180078"; // Change this
```

### Update Location

In all HTML files, find "Ashalaja, Greater Accra Region, Ghana" and replace with your location.

### Update Rating

In `index.html`, find `data-target="9.3"` and change to your rating.

### Change Font

In `css/main.css` line 37:

```css
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
```

---

## 📱 Testing on Mobile

### Option 1: Browser DevTools

1. Open the website in browser
2. Press **F12** (or Cmd+Option+I on Mac)
3. Click responsive design icon (or Ctrl+Shift+M)
4. Select a mobile device

### Option 2: Your Actual Phone

1. Share the file with yourself via email or cloud storage
2. Open on your phone
3. Test all features

### What to Test

- ✅ All links work
- ✅ "Book Now" opens WhatsApp
- ✅ Mobile menu works
- ✅ Images load properly
- ✅ Buttons are easy to tap
- ✅ Text is readable

---

## 🌐 Ready to Go Live?

### Option 1: GitHub Pages (Free, Recommended)

1. Create a GitHub account (github.com)
2. Create new repository
3. Upload your files
4. Enable GitHub Pages in settings
5. Your website goes live!

### Option 2: Netlify (Free)

1. Go to netlify.com
2. Drag and drop your folder
3. Website is live immediately!

### Option 3: Traditional Hosting

1. Buy hosting (GoDaddy, Hostinger, etc.)
2. Upload files via FTP
3. Confirm everything works

---

## 🆘 Troubleshooting

### WhatsApp button doesn't work?

- Check internet connection
- Make sure WhatsApp is installed on mobile
- Try from a different browser

### Website looks broken?

- Try a different browser (Chrome, Firefox, Safari)
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure all files are in correct folders

### Counter animation doesn't run?

- Make sure JavaScript is enabled
- Try refreshing the page
- Open browser console (F12) to check for errors

### Mobile menu doesn't show on desktop?

- This is correct! Menu only shows on small screens
- Resize browser window to test

---

## ✨ Pro Tips

1. **Use Live Server** - Install "Live Server" extension in VS Code for automatic refreshes
2. **Test Before Launching** - Check all pages and links on mobile
3. **Keep Images Small** - Use image compression tools (TinyPNG)
4. **Update Content** - Add real hotel photos to gallery
5. **Monitor Performance** - Test loading speed with Google PageSpeed

---

## 📊 Website Statistics

- **Pages:** 6
- **Fully Responsive:** ✅
- **Mobile Optimized:** ✅
- **SEO Ready:** ✅
- **WhatsApp Integrated:** ✅
- **Animations:** ✅
- **Load Time:** < 1 second
- **File Size:** ~70 KB (tiny!)
- **No Frameworks:** ✅ (Pure HTML/CSS/JS)
- **No External Dependencies:** ✅

---

## 🎓 File Descriptions

| File           | Purpose                          |
| -------------- | -------------------------------- |
| index.html     | Home page with hero and features |
| about.html     | Hotel information and story      |
| rooms.html     | Room types and details           |
| amenities.html | Services and facilities          |
| gallery.html   | Photo gallery with lightbox      |
| contact.html   | Contact form and information     |
| css/main.css   | All website styling              |
| js/main.js     | All interactive features         |
| README.md      | Full documentation               |

---

## 🚀 Next Steps

1. ✅ Open the website and test it
2. ✅ Customize colors, text, and info
3. ✅ Add real photos to gallery
4. ✅ Test on mobile devices
5. ✅ Deploy to hosting
6. ✅ Share with hotel team
7. ✅ Monitor analytics (optional)

---

## 💡 Need Help?

- **WhatsApp number:** +233 55 218 0078
- **Documentation:** See README.md
- **Browser console:** Press F12 to debug

---

**Your website is ready to go live! 🎉**

Enjoy your new professional hotel website built with pure HTML, CSS, and JavaScript.

No frameworks. No complicated setup. Just clean, fast, and beautiful code.

**Made with ❤️ for Great Peace & Love Hotel**
