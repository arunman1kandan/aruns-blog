# Arun's Blog (Arun Manikandan)

Professional personal blog and portfolio built with Next.js and Tailwind CSS.

## Features

- Minimal, responsive layout with dark mode support
- Server-side and client-side rendering where appropriate
- Simple admin interface to create, edit, and delete posts (password protected)
- Markdown-based post content with WYSIWYG preview in the admin editor
- Tag filtering and search on the public blog listing
- File-based JSON storage for posts (`data/posts.json`) — simple and portable

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server (default port 8080 in this project):

```bash
npm run dev
```

3. Open `http://localhost:8080` in your browser.

## Admin Panel

- Navigate to `/admin` to access the admin panel.
- Default password for local development: `arun123` (override with `ADMIN_PASSWORD` env var in production).
- Create posts using the editor; posts are stored in `data/posts.json`.

## Building for Production

```bash
npm run build
npm start
```

## Deployment Notes

- This repository is set up for deployment on Vercel. Ensure all dependencies install correctly during the build step.
- If you add native modules or optional editor packages, verify peer dependencies for your React version.

## Contributing

- Fork, create a feature branch, and submit a pull request with a clear description.

## License

This project is provided without an explicit license. Add a `LICENSE` file if you intend to open-source the code.
