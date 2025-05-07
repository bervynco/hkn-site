# HKN SSR angular project on AWS

---

## Server-Side Rendering (SSR)

This project uses **Angular Universal** to enable server-side rendering (SSR), which improves performance, SEO, and the initial load experience.

### 🏗️ Build the SSR Application

To compile the app for SSR, run:

```bash
npm run build
```

This command builds both the browser and server versions of your app. It outputs the files to:

```
dist/HKN/
├── browser/  → Client-side files
├── server/   → Server-side files (e.g., server.mjs)
```

> Replace `HKN` with your actual project name defined in `angular.json` (e.g., `HKN`).

### 🚀 Serve the SSR Build Locally

After building the app, serve it with:

```bash
npm run serve:ssr:new-ssr-hkn
```

This will start a local Express server that renders your Angular app on the server.
Open your browser and navigate to:

```
http://localhost:4000/
```

The app is now running with SSR enabled!

### 💡 Full SSR Build and Serve (Shortcut)

For convenience, you can run the full SSR build and serve sequence using a single command:

```bash
npm run build:hkn
```

This is equivalent to:

```bash
npm run build && npm run serve:ssr:new-ssr-hkn
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
