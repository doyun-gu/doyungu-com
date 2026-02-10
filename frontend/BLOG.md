# Blogging System

Write blog posts for the **Life** and **Vision** pages by editing simple data files.
Each post gets its own page with a unique URL.

## Quick Start

1. Open the data file:
   - **Life** page: `src/data/life-posts.js`
   - **Vision** page: `src/data/vision-posts.js`

2. Add a new post object to the **top** of the array (newest first)

3. Push to `main` — GitHub Actions builds and deploys automatically

## Post Format

```js
{
  slug: "my-post-title",          // URL path (lowercase, hyphens, no spaces)
  title: "My Post Title",         // Displayed as the page heading
  date: "February 2026",          // Shown on listing and detail page
  summary: "Short preview text.", // Shown on the listing page only
  content: [
    // Content blocks go here (see below)
  ],
}
```

The post will be available at:
- Life: `doyungu.com/life/my-post-title`
- Vision: `doyungu.com/vision/my-post-title`

## Content Blocks

### Normal Text
```js
{ type: "text", value: "Your paragraph text here." }
```

### Highlighted Text (pastel yellow)
```js
{ type: "highlight", value: "Important text that stands out." }
```

### Sub-heading
```js
{ type: "heading", value: "Section Title" }
```

### Code Block (dark background)
```js
{ type: "code", value: "const x = 42;\nconsole.log(x);" }
```

Use `\n` for line breaks inside the code string.

### Image
```js
{ type: "image", src: "/images/photo.jpg", alt: "Description", caption: "Optional caption" }
```

Place image files in `frontend/public/images/`. Reference them with `/images/filename.jpg`.

## Inline Formatting

Use these inside any `text` or `highlight` value:

| Syntax | Result |
|--------|--------|
| `` `code` `` | `inline code` |
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |

Example:
```js
{ type: "text", value: "Use `console.log()` for debugging with **bold** and *italic* words." }
```

## Full Example

```js
const lifePosts = [
  {
    slug: "trip-to-tokyo",
    title: "Trip to Tokyo",
    date: "March 2026",
    summary: "An incredible week exploring Japan.",
    content: [
      { type: "text", value: "Just got back from an **incredible** week in Tokyo." },
      { type: "image", src: "/images/tokyo.jpg", alt: "Tokyo at night", caption: "Shibuya crossing" },
      { type: "highlight", value: "The food alone was *worth the trip*." },
      { type: "heading", value: "What I Learned" },
      { type: "text", value: "Japanese engineering culture is something else entirely." },
      { type: "text", value: "I used `Google Maps` and `Suica` card for everything." },
      { type: "code", value: "const trip = {\n  city: 'Tokyo',\n  days: 7,\n  rating: 10\n};" },
    ],
  },

  // older posts below...
]
```

## How It Works

```
/life                → Listing page (shows cards for each post)
/life/trip-to-tokyo  → Detail page (shows full post content)

/vision              → Listing page
/vision/my-post      → Detail page
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── BlogPost.jsx    ← Renders posts & cards (don't edit)
│   │   └── BlogPost.css    ← Blog styling (don't edit)
│   ├── data/
│   │   ├── life-posts.js   ← Edit this for Life page
│   │   └── vision-posts.js ← Edit this for Vision page
│   └── pages/
│       ├── Life.jsx         ← Life listing page
│       ├── LifePost.jsx     ← Life detail page
│       ├── Vision.jsx       ← Vision listing page
│       └── VisionPost.jsx   ← Vision detail page
└── public/
    └── images/              ← Put blog images here
```
