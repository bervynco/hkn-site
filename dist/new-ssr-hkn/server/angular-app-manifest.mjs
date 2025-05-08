
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
    'index.csr.html': {size: 18275, hash: '5ceca71a7f10b34cc7ccc3122e0fa43db1080761e42b005df2383f12b5612629', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: '841161a2c532209a7e4bbe165fc36048380c31f65307acbc27b3197e1cbc18c3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 36673, hash: '82a687c3145ccea8fd84a8e66df88508bca75a8f531f260bae5b335acee442ce', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36673, hash: '82a687c3145ccea8fd84a8e66df88508bca75a8f531f260bae5b335acee442ce', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29745, hash: 'cc12ba367e9a59dc9df30046ac6e82d7908246dc9e59ce58d7f4e9c43e29afce', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 30002, hash: '5246125a43bfb103c3080fcf0b20f93b8783229d279fc67a02723b550ade97f5', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2403774, hash: '36c858f2eddb62efbc3775e3a9be594822c5b9368d94eeb34f072709b80dacfc', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2443065, hash: '2f2070b6182d11e71ea95c06b2f5defec12b5041702375beb8e6d6a723e086b1', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2451147, hash: 'cec8d1b8ae0cfb8ed0b216b2162981e9916810b63775b0c266fba5b419338b59', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31207, hash: 'ed9b66fc0f68b240edcabea38ed67229c1d73fa1f96dc762ea1e347a14421838', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30259, hash: '01844e4e78317a24524ec1ffb3b7432f4da6d7788719cacbdc89be1ac7e32a85', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 30306, hash: '551e721dfa559da639658ed88b37c69249aa5fbaac9c0489a1e330813187b4ee', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 30319, hash: 'e6433764d5c0890c567f6301e9d7bf314f973f5976e7a1cea59e16a9588f6dfd', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2389081, hash: 'e61c006ae5becf7bec331999fc833f4b1fb33a4d2c51770750c2aabc03dc1c48', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2471051, hash: 'b782418644ba15fd7e798b631f231ee44af6f01b984008669462512d9e5bfa8f', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'styles-SLFBQBEU.css': {size: 106950, hash: 'JYXvxCtdgwY', text: () => import('./assets-chunks/styles-SLFBQBEU_css.mjs').then(m => m.default)}
  },
};
