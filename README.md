# doyungu.com

Personal portfolio website for **Doyun Gu** — a final-year Electrical & Electronics Engineering student at the University of Manchester, returning from a placement year at Aston Martin.

## About Me

I'm currently working on two projects in parallel:

1. **Project JULY** — An automated agriculture system (3rd-year individual project)
2. **Dynamic Phasor Simulation Framework** — A circuit simulation research project using instantaneous dynamic phasor methods

My interests centre on circuit design, power electronics, robotics, and embedded systems.

## Tech Stack

- **Frontend:** React 19 + Vite 7 + React Router DOM 7
- **Styling:** CSS with design tokens (custom properties)
- **Fonts:** Inter (body), Junge (headings)
- **Hosting:** Firebase Hosting with GitHub Actions CI/CD

## Project Structure

```
doyungu-com/
├── frontend/
│   ├── public/
│   │   └── images/           # Static assets
│   ├── src/
│   │   ├── components/       # Header, Footer, BlogPost, Chart
│   │   ├── data/             # Blog post data (life-posts.js, vision-posts.js)
│   │   ├── pages/            # About, Projects, Life, Vision, BVAT
│   │   ├── App.jsx           # Router and layout
│   │   └── index.css         # Global styles and design tokens
│   └── package.json
├── functions/                # Firebase Cloud Functions
├── firebase.json
└── README.md
```

## Pages

| Page | Description |
|------|-------------|
| **Home** | Landing page with a quote |
| **About** | Introduction, timeline, and journey |
| **Projects** | Engineering projects and tools |
| **Life** | Personal blog posts |
| **Vision** | Thoughts on the future |

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Deployment

Deployed via Firebase Hosting. Push to `main` triggers automatic deployment through GitHub Actions.

## Contact

- **Email:** me@doyungu.com
- **LinkedIn:** [doyun-gu](https://www.linkedin.com/in/doyun-gu)
- **GitHub:** [doyun-gu](https://github.com/doyun-gu)
