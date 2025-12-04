import AccessibleVideoPlayer from "@/components/AccessibleVideoPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Cloudinary Accessible Video Player Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A fully accessible video player example with captions, keyboard navigation, and focus management
          </p>
        </header>

        <div
          id="main-content"
          className="max-w-4xl mx-auto"
          // Make skip-link target programmatically focusable so keyboard users
          // actually move focus into the main content when they activate it.
          tabIndex={-1}
        >
          <section aria-labelledby="video-heading" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 id="video-heading" className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Video Player Demo
            </h2>
            
            <AccessibleVideoPlayer />
          </section>

          <section aria-labelledby="features-heading" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 id="features-heading" className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Accessibility Features
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">✓</span>
                <span>
                  <strong>Keyboard navigation</strong>: Press Tab until a control in the Cloudinary
                  player (for example the Play button) has a visible focus ring, then use Space or
                  Enter to toggle it and the Arrow keys to adjust playback position and volume.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">✓</span>
                <span>
                  <strong>Captions and subtitles</strong>: After you’ve run the caption seed step
                  from the README (or added your own VTT/SRT tracks in Cloudinary), press Play and
                  open the <strong>CC</strong> button in the player to turn captions on or off and,
                  if multiple tracks exist (for example English and French), switch between them.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">✓</span>
                <span>
                  <strong>Screen reader support</strong>: Turn on VoiceOver, NVDA, or JAWS, jump to
                  the “Video Player Demo” heading, then move into the player and listen as each
                  control (Play, Mute, Captions, Fullscreen, etc.) is announced with its role. On
                  macOS, you can start VoiceOver with <kbd>Command</kbd>+<kbd>F5</kbd>, press
                  <kbd>Control</kbd>+<kbd>Option</kbd>+<kbd>U</kbd> to open the rotor, jump to this
                  heading, then use <kbd>Control</kbd>+<kbd>Option</kbd>+Right/Left Arrow to move
                  through controls.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">✓</span>
                <span>
                  <strong>Focus management</strong>: Reload the page, press Tab to land on the
                  “Skip to main content” link, press Enter to jump focus into the main content
                  region. When focus reaches the player area, click once on the player, then use Tab / Shift+Tab to
                  move between its built-in controls.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">✓</span>
                <span>
                  <strong>Responsive design</strong>: Resize the browser or use your dev tools’
                  responsive mode – the player should grow and shrink with the layout while keeping
                  a usable 16:9 video area and intact controls.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" aria-hidden="true">✓</span>
                <span>
                  <strong>WCAG-friendly baseline</strong>: Combined with Cloudinary’s accessible
                  player, this layout is a solid starting point toward WCAG 2.1 AA; run an
                  accessibility audit with Lighthouse or axe to verify your own content.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

