# Servecly  - Service Marketplace
[![Servecly CI Pipeline](https://github.com/xXx0001-crybto/servecly/actions/workflows/ci.yml/badge.svg)](https://github.com/xXx0001-crybto/servecly/actions/workflows/ci.yml)
Servecly is a professional-grade service marketplace frontend designed with architectural precision for a two-sided economy. It connects vetted professionals ("Taskers") with users for home repairs, moving, assembly, and more.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd servecly-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

## 🛠 Tech Stack
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Material Design 3 Theme)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Linting:** [ESLint 9](https://eslint.org/)

## 📂 Project Structure
- `src/pages/`: Main application views (Home, Login, Services, Admin, etc.)
- `src/layouts/`: Shared layout components (e.g., `MainLayout.jsx`)
- `src/components/`: Reusable UI components
- `src/assets/`: Static assets and styling
- `tailwind.config.js`: Custom theme configuration following M3 guidelines

## 📜 Available Scripts
- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint for code quality checks.

## 📖 Documentation
- [GEMINI.md](./GEMINI.md): Technical overview and development conventions.
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md): Detailed API endpoint specifications and integration guides.
