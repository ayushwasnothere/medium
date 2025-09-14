# QuillWeave

**QuillWeave** is a modern, lightweight **Medium clone** — a blogging platform built for writers and readers.  
It lets you create, publish, and read blogs with a clean and responsive interface.

Powered by **React** and **Tailwind CSS** on the frontend, and a **serverless backend** on **Cloudflare Workers** using **Hono**, with a **PostgreSQL database** for persistence.

---

## Features

- 📝 **Write & Publish Blogs** – simple, distraction-free writing experience
- 📖 **Read Blogs** – clean, responsive reading interface
- ☁ **Serverless Backend** – powered by Cloudflare Workers + Hono
- 🗄 **Persistent Storage** with PostgreSQL
- 🎨 Built with **React** + **Tailwind CSS** for modern UI
- ⚡ Fast, scalable, and cost-effective architecture

---

## Tech Stack

| Layer    | Technology                |
| -------- | ------------------------- |
| Frontend | React + Tailwind CSS      |
| Backend  | Cloudflare Workers + Hono |
| Database | PostgreSQL                |
| Language | TypeScript                |

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ayushwasnothere/medium.git
cd medium
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set up the database

- Create a PostgreSQL database
- Add your database URL to a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quillweave"
```

### 4. Start the development server

```bash
pnpm dev
# or
npm run dev
```

The frontend should now be running at [http://localhost:3000](http://localhost:3000).

---

## Usage

- Sign up and start writing blogs
- Publish your posts for others to read
- Browse and enjoy content from other authors

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add feature"
```

4. Push to your branch:

```bash
git push origin feature-name
```

5. Open a pull request

---

## License

[MIT](LICENSE)

---

## Project Preview

```bash
$ pnpm dev
> Server running at http://localhost:3000
[Backend] Cloudflare Worker started successfully
[DB] Connected to PostgreSQL
```

A modern blogging experience — simple, fast, and beautiful. ✍️
