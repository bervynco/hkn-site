import { RenderMode, ServerRoute } from '@angular/ssr';
import { routes } from './app.routes';  // Import your client-side routes

export const serverRoutes: ServerRoute[] = [
  ...routes.map(route => {
    if (route.path) {
      return {
        path: route.path,
        renderMode: RenderMode.Prerender,
        async getPrerenderParams() {
          if (route.path === 'video-news/:type/:slug' || route.path === 'article/:type/:slug') {
            // Here, use dynamic data or mock data
            return [
              { type: 'mockType', slug: 'mockSlug' },  // Use real data if available
            ];
          }
          return [];
        }
      };
    }
    return null;  // Handle cases where path is undefined
  }).filter(Boolean) as ServerRoute[],
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
