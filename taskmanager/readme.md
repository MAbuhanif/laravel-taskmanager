# Laravel Task Manager

A small Laravel 12 application using Inertia + React (TypeScript) for the frontend.

This README explains how to set up the project locally, run the development servers, and run tests with Pest on Windows (PowerShell) environments.

---

## Requirements

- PHP 8.2+ (compatible with Laravel 12)
- Composer
- Node.js (LTS recommended — v18 or v20)
- npm (or pnpm/yarn)
- mysql or SQLite 
---

## Quick Setup (PowerShell)

Open PowerShell in the `taskmanager` folder and run:

```powershell
# 1. Install PHP dependencies
composer install

# 2. Copy env and generate app key (if .env not present)
copy .env.example .env
php artisan key:generate

# 3. (Optional) create sqlite file if it doesn't exist
if (-Not (Test-Path "database\database.sqlite")) { New-Item -ItemType File -Path database\database.sqlite }

# 4. Run migrations and seeders
php artisan migrate --seed

# 5. Install frontend dependencies
npm install

# 6. Start Vite dev server (dev assets)
npm run dev

# 7. Start Laravel dev server (choose a free port if needed)
php artisan serve --port=8080
```

If a port is already in use, pick a different port: `php artisan serve --port=9000`.

---

## Common Commands

```powershell
# Laravel server
php artisan serve --port=8080

# Run migrations
php artisan migrate

# Install JS deps
npm install

# Start Vite dev server
npm run dev

# Build production assets
npm run build

# Run tests (Pest)
./vendor/bin/pest
```

---

## Running Tests (Pest)

This project uses Pest for testing. Run tests with:

```powershell
./vendor/bin/pest
```

If you see environment or database issues, ensure you've migrated the testing database and that `phpunit.xml` or `phpunit.xml.dist` points to an in-memory or sqlite testing DB.

---

## Troubleshooting

- If `npm run dev` fails:
	- Ensure you're in the `taskmanager` directory where `package.json` lives.
	- Run `npm install` first.
	- Clear npm cache and reinstall if postinstall errors appear:

```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules\ package-lock.json
npm install
```

- If `ERR_INVALID_ARG_TYPE` appears during npm installs, try removing `package-lock.json` and `node_modules` then reinstall. Consider using a Node LTS version (e.g., 20.x) via nvm.

- Windows EPERM errors: close editors/terminals locking files, or run PowerShell as Administrator to adjust permissions.

---

## Notes for Developers

- Frontend TypeScript path alias configured in `tsconfig.json`: `@/*` -> `resources/js/*`.
- UI components live in `resources/js/components/ui` and use shadcn-ui styling patterns.
- The backend uses Inertia and controller resources in `app/Http/Controllers`.

---
