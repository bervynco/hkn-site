
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
    'register/index.html': {size: 30002, hash: '5246125a43bfb103c3080fcf0b20f93b8783229d279fc67a02723b550ade97f5', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36673, hash: '82a687c3145ccea8fd84a8e66df88508bca75a8f531f260bae5b335acee442ce', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29745, hash: 'cc12ba367e9a59dc9df30046ac6e82d7908246dc9e59ce58d7f4e9c43e29afce', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2834011, hash: 'b69b1c13e407694b9c72db215011e62d8406052d18c234f4e125610c662814f3', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2794730, hash: '06ed26d6f629276b9ee45acba1a037c79c993128cf3f3d579b0375a81b9f05d6', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2849581, hash: '6b66d91625747ccec4df3225a61df19436609423e262c520dcd8b85635ade9db', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31207, hash: '5a5308ba9bd44e6a6960bfe7684d71bc531d782c7a08696efd04ba35bd89957b', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30259, hash: 'ba48d562bc99b17685c39ff09d76868224ea6c26412846d47be9381d26fff121', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 30306, hash: '7ba1cf2e46013bad6697e0cc1fc59c17fe1befdcfe9042bb6808d926e5a3a76b', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2779177, hash: '9dbbfc1bae51a8254950c6ec70ee201996e0d65add8a0a1b20b668c2980091a3', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 30319, hash: '6a6f5b5bacd234194de67ad53394c6a1205f3d2f5081c93fd07702fe24419622', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2879061, hash: '6fbaa0f8b1d30bdf0859f8193c7c3b72c8eeae74c6fbc4342b9136141c96a5d5', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'styles-SLFBQBEU.css': {size: 106950, hash: 'JYXvxCtdgwY', text: () => import('./assets-chunks/styles-SLFBQBEU_css.mjs').then(m => m.default)}
  },
};
