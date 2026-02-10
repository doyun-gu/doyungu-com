// ============================================================
// Life Blog Posts
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

const lifePosts = [
  // --- EXAMPLE POST (replace with your own) ---
  {
    title: "First Entry",
    date: "February 2026",
    content: [
      { type: "text", value: "This is an example blog post. Replace it with your own content. Each post supports text, highlights, headings, and images." },
      { type: "highlight", value: "Highlighted text looks like this — use it for key thoughts or quotes you want to stand out." },
      { type: "heading", value: "Adding Images" },
      { type: "text", value: "Place your images in the public/images/ folder, then reference them with /images/filename.jpg in the src field." },
      // { type: "image", src: "/images/example.jpg", alt: "Example photo", caption: "This is a caption" },
    ],
  },
]

export default lifePosts
