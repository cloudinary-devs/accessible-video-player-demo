# Cloudinary Accessible Video Player Demo

A fully accessible Next.js application demonstrating best practices for implementing the Cloudinary Video Player with comprehensive accessibility features, including captions, keyboard navigation, and focus management.

## 🎯 Purpose

This application serves as a reference implementation for developers who want to create accessible video experiences using Cloudinary's Next.js SDK. It demonstrates:

- **Full keyboard navigation** - All video controls accessible via keyboard
- **Screen reader support** - Proper ARIA labels and semantic HTML
- **Caption/subtitle support** - WebVTT track integration
- **Focus management** - Visible focus indicators and logical tab order
- **Responsive design** - Works seamlessly across all device sizes
- **WCAG 2.1 AA compliance** - Meets accessibility standards

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- A Cloudinary account ([Sign up for free](https://cloudinary.com/users/register/free))

### Installation

1. **Clone or download this repository**

   ```bash
   git clone cloudinary-accessible-video-player-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Update the `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret
   NEXT_PUBLIC_CLOUDINARY_VIDEO_PUBLIC_ID=your_video_public_id
   ```

   You can find these values here:
   - **Cloud Name**: Found in your [Product Environments](https://console.cloudinary.com/app/settings/product-environments)
   - **API Key & Secret**: Available in [Settings](https://console.cloudinary.com/app/settings/api-keys)
   - **Video Public ID**: The public ID of a video in your Cloudinary account. Taken from your [Media Library](https://console.cloudinary.com/app/assets/media_library/)

4. **(Optional) Seed the demo video and captions with Cloudinary**

   This project can automatically upload Cloudinary's demo video and request captions for you.

   1. Ensure your `.env.local` is configured (step 3 above).
   2. Make sure a **video transcription add-on** is enabled for your Cloudinary account so `auto_transcription` can generate captions. See [Video transcription](https://cloudinary.com/documentation/video_transcription) and the [add-ons page](https://console.cloudinary.com/app/marketplace/details/google_speech) for subscription details.
   3. Then run:
      ```bash
      npm run seed:demo-video
      # or
      yarn seed:demo-video
      # or
      pnpm seed:demo-video
      ```
   4. This script:
      - Uploads the demo video from `https://demo-res.cloudinary.com/video/upload/lincoln.mp4` into **your** Cloudinary account as the public ID in `NEXT_PUBLIC_CLOUDINARY_VIDEO_PUBLIC_ID` (or `accessible_demo_video` by default).
      - Sends the upload with `auto_transcription: true` so Cloudinary can generate a transcript/caption track (once the add-on is enabled).
      - Once processing is complete, the Cloudinary Video Player in this app will expose a **CC button** so you can toggle captions on/off.

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
cloudinary-accessible-video-player-demo/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and accessibility utilities
├── components/
│   └── AccessibleVideoPlayer.tsx  # Main accessible video player component
├── lib/
│   └── cloudinary.ts       # Cloudinary configuration
├── public/                 # Static assets
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

##  Accessibility Features

This demo focuses on showing **Cloudinary’s own accessible video player** embedded in a real Next.js app. All of the rich, interactive accessibility behavior comes from the Cloudinary Video Player itself, as described in the [Cloudinary accessibility docs](https://cloudinary.com/documentation/video_player_accessibility).

### Keyboard Navigation

The Cloudinary Video Player supports full keyboard operation when it has focus:

- **Tab / Shift+Tab** - Move focus between player controls (play/pause, volume, captions, fullscreen, etc.)
- **Space / Enter** - Activate the currently focused control (for example, toggle play/pause)
- **Visible focus ring** - The active control is clearly outlined so you can see where you are


### Screen Reader Support

- The Cloudinary Video Player outputs appropriate ARIA roles and attributes on its controls
- Controls, captions menus, and chapters are all exposed to assistive technologies
- This app adds a semantic page structure (headings, regions, and a skip link) around the player so screen reader users can reach it quickly

### Visual Accessibility

- High contrast focus indicators for all elements (`*:focus-visible` rule in `globals.css`)
- Responsive layout so the player and text scale appropriately across screen sizes

### Captions, Subtitles, and Chapters

The Cloudinary Video Player supports:

- Multiple caption and subtitle tracks (VTT / SRT), with a built-in captions menu
- Chapters for jumping between sections of a video
- Audio descriptions and alternate audio tracks

This demo does not hard-code specific caption or chapter files. If the video you configure via `NEXT_PUBLIC_CLOUDINARY_VIDEO_PUBLIC_ID` has captions or chapters in your Cloudinary account, the player will automatically surface them in its UI.

## 🎨 Best Practices Implemented

### 1. Focus Management

- Visible focus indicators on all interactive elements
- Logical tab order throughout the page
- Skip link for keyboard navigation efficiency
- Player controls and focus management **inside** the player are handled entirely by Cloudinary

### 2. Semantic HTML

- Proper use of `<section>`, `<header>`, and semantic elements
- Descriptive heading hierarchy (h1 → h2)
- Form controls properly labeled with `<label>` elements

### 3. Responsive Design

- Mobile-first approach with Tailwind CSS
- Flexible video container with aspect ratio preservation
- Touch-friendly control sizes on mobile devices
- Adaptive layout for different screen sizes


## 🔧 Configuration


## 📚 Recommended Patterns

### 1. Always Provide Keyboard Alternatives

Every mouse/touch interaction should have a keyboard equivalent

### 2. Use Semantic HTML

```tsx
// Good: Semantic structure
<section aria-labelledby="video-heading">
  <h2 id="video-heading">Video Player</h2>
  <AccessibleVideoPlayer />
</section>
```

### 3. Provide Text Alternatives

```tsx
// Good: Descriptive labels
<button aria-label="Pause video">
  <PauseIcon aria-hidden="true" />
</button>
```

### 4. Manage Focus Properly

```tsx
// Good: Visible focus indicators
button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### 5. Test with Screen Readers

Always test your implementation with:
- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

## 🧪 Testing Accessibility

### Automated Testing

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react eslint-plugin-jsx-a11y

# Run Lighthouse accessibility audit
# Use Chrome DevTools → Lighthouse → Accessibility
```

### Manual Testing Checklist

- [ ] All controls accessible via keyboard
- [ ] Screen reader announces all controls correctly
- [ ] Focus indicators visible on all interactive elements
- [ ] Captions display correctly when enabled
- [ ] Video works without JavaScript (graceful degradation)
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Video player is responsive on mobile devices
- [ ] All images have alt text
- [ ] Form controls have associated labels

## 📖 Resources

### Cloudinary Documentation

- [Next Cloudinary SDK](https://next.cloudinary.dev/)
- [Video Player Accessibility Guide](https://cloudinary.com/guides/video/video-player-accessibility)
- [Video Accessibility Features](https://cloudinary.com/products/video/accessibility)
- [Video Player API Documentation](https://cloudinary.com/documentation/video_player_accessibility)

### Accessibility Standards

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Accessibility Checklist](https://webaim.org/standards/wcag/checklist)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

### Tools

- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)


## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Cloudinary](https://cloudinary.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For issues related to:
- **This example app**: Open an issue on GitHub
- **Cloudinary SDK**: Check the [Cloudinary Documentation](https://cloudinary.com/documentation)
- **Accessibility questions**: Refer to [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
