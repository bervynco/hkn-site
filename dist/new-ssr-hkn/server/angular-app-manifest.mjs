
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/business-news"
  },
  {
    "renderMode": 2,
    "route": "/crime-news"
  },
  {
    "renderMode": 2,
    "route": "/politics-news"
  },
  {
    "renderMode": 2,
    "route": "/entertainment-news"
  },
  {
    "renderMode": 2,
    "route": "/celebrity-news"
  },
  {
    "renderMode": 2,
    "route": "/my-profile"
  },
  {
    "renderMode": 2,
    "route": "/edit-profile"
  },
  {
    "renderMode": 2,
    "route": "/article/mockType/mockSlug"
  },
  {
    "renderMode": 0,
    "route": "/article/*/*"
  },
  {
    "renderMode": 2,
    "route": "/video-news/mockType/mockSlug"
  },
  {
    "renderMode": 0,
    "route": "/video-news/*/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 18275, hash: 'a1fa392c550ba1aeae0aa2568f702d6c3110338f147b15247f28ef23d1ac2381', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: '478f27ab8d9cb4ff61508c8433e3e7889efca84df2123b04cfa6e047f5446397', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 36628, hash: '8fd98248bc27a8e87999663690b169f384c95b4701fb06ca092cd88fc9800348', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29700, hash: 'fd5c3cbecc545a0f51182abcf41982d165d40a8348fdf59307e531f30510fcf9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 29953, hash: '77448f9df751c7db41607b5c66b173cad83a2c58ecf78d3710672e6089ffd372', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36628, hash: '8fd98248bc27a8e87999663690b169f384c95b4701fb06ca092cd88fc9800348', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2235142, hash: '9622774cc2203c06d0d8679f572cf2a55d5f5b8237d7fd64b3fe854514915fa7', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2190744, hash: 'dee1f50dc0e60092db26e142222c0aa01613c23ffa6fba67b9af8c3e249b828a', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31162, hash: 'c22df5468389682c80c017e2193f641d5c4d7b6d7e368c755eff88f38c022378', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30214, hash: '324011cb05737ffb96234c738b1deca7e4e5b966df7f7e13b454e768e43abd1b', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 2192842, hash: '89a6e3c9d18f99e898baa522aadfa958331043ebd847197d71fe1933696cea87', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 2192855, hash: '7871aeba7292c48288e96d8570113f96046bc3945719219cfc422e16ccc9f01a', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2244208, hash: 'a94ef5cd3bf449afad98cd24cce2f9d3523df9cf1b3452f661394bc84050b63e', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2201552, hash: '8b7458cfc4baf7a31b228aaa5f081f566d4ef336bf75f3293736b19c4960b146', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2260576, hash: 'c691db5fcf50745d00a434082d261a6515905c87b9256f01d17488d7b087477c', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'styles-X67HUUSU.css': {size: 107207, hash: 'zK7G1fUJrJE', text: () => import('./assets-chunks/styles-X67HUUSU_css.mjs').then(m => m.default)}
  },
};
