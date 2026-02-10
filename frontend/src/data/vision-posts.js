// ============================================================
// Vision Blog Posts
// ============================================================
// Add new posts to the TOP of the array (newest first).
//
// Each post has:
//   title   - Post title
//   date    - Display date (any format you like)
//   content - Array of content blocks:
//
//   { type: "text",      value: "Normal paragraph" }
//   { type: "highlight", value: "Yellow highlighted paragraph" }
//   { type: "heading",   value: "A sub-heading" }
//   { type: "image",     src: "/images/photo.jpg", alt: "Description", caption: "Optional caption" }
//
// ============================================================

const visionPosts = [
  // --- EXAMPLE POST (replace with your own) ---
  {
    title: "Where I Am Heading",
    date: "February 2026",
    content: [
      { type: "text", value: "I want to build technology that matters. My goal is to create tools and systems that solve real problems — whether that is in automotive engineering, agriculture, or everyday life." },
      { type: "highlight", value: "The best way to predict the future is to build it." },
      { type: "heading", value: "What Drives Me" },
      { type: "text", value: "Making complex data simple and accessible. Bridging the gap between hardware and software. Building products people actually want to use." },
    ],
  },
]

export default visionPosts
