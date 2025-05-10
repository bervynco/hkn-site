
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
    'index.csr.html': {size: 17150, hash: '73d3ca4ffab3ffc72eaf18d6bb40a2ca450bc74fb21fe839e2b9642dddc47e07', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: 'ac138de09b2534db4940306d1b99e6326fc82fdb126375cffc9adcbf6641f301', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 35488, hash: 'df1e67c397f8d0ae01310730acbbf490ea53442622037663fdf52a9ad65113cf', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 28817, hash: '4807c04c3e6831e201fc4232c24ee4261d348f4647d8b1874fcf8d3dea3ffd72', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 35488, hash: 'df1e67c397f8d0ae01310730acbbf490ea53442622037663fdf52a9ad65113cf', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 28560, hash: '6afa729a67de2f0d04f217bd8f0e50bb28cb8895e491494851160fdf0ef74e1d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2869938, hash: '6dad246d085344b1172be2eba4d8e89ab78a50ab32ab58a5e21cd431e416bf76', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2886413, hash: '62ede5c78118a5dc129cb3cc09e320350f90759606b20361e1627d2a28014805', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2814218, hash: 'd9c1912b521188c56635af162716f90bf0e3ae8965ac946ebbec31c9fa19bf4d', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2829772, hash: 'f1a5af23c9b8ad0443b8cbaa854f8c4fce37623c98d691c465fe951b25a7f921', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 29074, hash: '2c8fb142099eff6b3b9b4f475ee6b9088b634d5cdf7243f8aa552c4fd6a9dbaa', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 30022, hash: 'b3f61d34c63d4b5c289d05fc628ac313ef04e4c279b02edda5af2480f8830ea3', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2914109, hash: '373301959becac1b8cf2097cfdf59c816fd4aaa3b15752617b7555fbd915b1d7', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 26715, hash: 'b2d952e8b388401f622abcbc922fd1ff28866411da1c4b86d87030b15e887d61', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 27076, hash: '5845c775bdad2ad6641ce14ab6b61170848262c38635d5597370fe8baa71b47d', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'styles-MBXNTGL4.css': {size: 104191, hash: 'rL/V3hgE4BQ', text: () => import('./assets-chunks/styles-MBXNTGL4_css.mjs').then(m => m.default)}
  },
};
