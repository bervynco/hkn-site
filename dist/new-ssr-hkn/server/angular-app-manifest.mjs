
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
    'index.csr.html': {size: 18275, hash: '80f5d21e238db60e2e433fb4c96560d79a04c0a131d9cb5c12fc1a03abc3dad3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: 'aa434be4cd6c1cd249687e2229c54bc234f522cb6e6cc82a9e5bf9754fab3ce2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36673, hash: '73ced510edd380cb59779b393483ecde06c7fa3a761e5cdf41b6a393d8b19b7e', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 30002, hash: '0e4197f0192d5c3ad901c0e3d573b87c13a265ba626e50999204a617f0335482', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29745, hash: 'e9d9a5cbe142034313003e9f2712726c6dafc7cc034cc0af7e16b13e82094993', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 36673, hash: '73ced510edd380cb59779b393483ecde06c7fa3a761e5cdf41b6a393d8b19b7e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2403478, hash: 'f92d011e6f1debc3f7503bd544e60e1c76bef2b99ad29b08b3245a92f4270620', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2450851, hash: 'a943322c957d757e6e5edb7cd6400640ad04980dd6ba2510de179953a10b9905', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2442769, hash: '373ae6e8d8770c867e8f8551b065b2fdca7fe8b3622d15bf10cee0c932b5ce95', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2388785, hash: 'dc23f9553d5e02b4325475d450f64f6e59b76e1a3fa9fc40f95dafff9bfa123f', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31207, hash: 'c8b27fb4716f0580e1cfafcda450a4661a513bad8b8eec89974cd496dfe094b8', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 30306, hash: 'f816279a65696160df46728472954490b2737c39d5d2f10d31ad32261d98589d', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30259, hash: 'a2f4073eed1050d1ab9d933bd066357937482702d93e160e12f55db93570c70e', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 30319, hash: '63e682e25f1e3d0bd1dc6f617e2adef524c83c70f12d09fc9c089d7f5d859f5e', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2470755, hash: '27ee5bec8cf45cb89786c75e782fad53feb533816c1cd241c392c50165b842cb', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'styles-SLFBQBEU.css': {size: 106950, hash: 'JYXvxCtdgwY', text: () => import('./assets-chunks/styles-SLFBQBEU_css.mjs').then(m => m.default)}
  },
};
