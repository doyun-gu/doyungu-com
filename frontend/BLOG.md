# Blogging System

Write blog posts for the **Life** and **Vision** pages by editing simple data files.

## Quick Start

1. Open the data file for the page you want to edit:
   - **Life** page: `src/data/life-posts.js`
   - **Vision** page: `src/data/vision-posts.js`

2. Add a new post object to the **top** of the array (newest first)

3. Push to `main` — GitHub Actions will build and deploy automatically

## Post Format

```js
{
  title: "Post Title",
  date: "February 2026",
  content: [
    // Add blocks in the order you want them to appear
  ],
}
```

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

### Image
```js
{ type: "image", src: "/images/photo.jpg", alt: "Description", caption: "Optional caption" }
```

Place image files in `frontend/public/images/`. Reference them with `/images/filename.jpg`.

## Full Example

```js
const lifePosts = [
  {
    title: "Trip to Tokyo",
    date: "March 2026",
    content: [
      { type: "text", value: "Just got back from an incredible week in Tokyo." },
      { type: "image", src: "/images/tokyo-street.jpg", alt: "Tokyo street at night", caption: "Shibuya crossing" },
      { type: "highlight", value: "The food alone was worth the trip." },
      { type: "heading", value: "What I Learned" },
      { type: "text", value: "Japanese engineering culture is something else entirely." },
    ],
  },

  // older posts below...
]
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── BlogPost.jsx    ← Renders each post (don't edit)
│   │   └── BlogPost.css    ← Blog styling (don't edit)
│   └── data/
│       ├── life-posts.js   ← Edit this for Life page
│       └── vision-posts.js ← Edit this for Vision page
└── public/
    └── images/             ← Put blog images here
```
