// ============================================================
// Life Blog Posts
// ============================================================
// Add new posts to the TOP of the array (newest first).
//
// Each post needs:
//   slug    - URL-friendly ID (lowercase, hyphens, no spaces)
//   title   - Post title
//   date    - Display date (any format)
//   summary - Short preview text shown on the listing page
//   content - Array of content blocks (see below)
//
// Content block types:
//   { type: "text",      value: "Normal paragraph" }
//   { type: "highlight", value: "Yellow highlighted paragraph" }
//   { type: "heading",   value: "A sub-heading" }
//   { type: "code",      value: "const x = 1;\nconsole.log(x);" }
//   { type: "image",     src: "/images/photo.jpg", alt: "Description", caption: "Optional" }
//
// Inline formatting (inside text and highlight values):
//   **bold text**    → renders as bold
//   *italic text*    → renders as italic
//   `code`           → renders as inline code
//
// ============================================================

const lifePosts = [
  {
    slug: "formatting-guide",
    title: "Formatting Guide — How This Blog Works",
    date: "February 2026",
    summary: "A complete example showing every content type: headings, text, bold, italic, highlights, code, and images.",
    content: [
      { type: "text", value: "This is a **normal text** paragraph. It uses the Inter font at a comfortable reading size. You can write as much as you want in a single block, and it will flow naturally." },
      { type: "text", value: "You can make words **bold** by wrapping them in double asterisks, and *italic* by wrapping them in single asterisks. You can even combine them in the same sentence: **engineering** meets *creativity*." },
      { type: "heading", value: "This Is a Heading" },
      { type: "text", value: "Headings use the Junge serif font — the same one as the page title and the home page quote. They break your post into clear sections." },
      { type: "highlight", value: "This is a highlighted block. It has a soft pastel yellow background with a gold left border. Use it for **key thoughts**, quotes, or anything you want readers to notice." },
      { type: "heading", value: "Code" },
      { type: "text", value: "Use `inline code` with backticks for short references like variable names, commands, or file paths — for example `npm run dev` or `life-posts.js`." },
      { type: "text", value: "For multi-line code, use a code block:" },
      { type: "code", value: "const post = {\n  slug: \"my-first-post\",\n  title: \"Hello World\",\n  date: \"February 2026\",\n};\n\nconsole.log(post.title); // \"Hello World\"" },
      { type: "heading", value: "Adding Images" },
      { type: "text", value: "Drop your image files into the *frontend/public/images/* folder, then reference them like this:" },
      // Uncomment the line below and replace with a real image:
      // { type: "image", src: "/images/example.jpg", alt: "Example photo", caption: "This caption appears below the image" },
      { type: "text", value: "Images span the full width of the content area with rounded corners and a subtle shadow. The caption underneath is *italic* and centered." },
      { type: "heading", value: "Putting It All Together" },
      { type: "text", value: "Each post is just an object in an array. Add a new one to the **top** of the list in *life-posts.js*, give it a unique slug, and push to main. That is it — your blog is updated." },
      { type: "highlight", value: "*Complaining is not a strategy.* — doyungu.com" },
    ],
  },
]

export default lifePosts
