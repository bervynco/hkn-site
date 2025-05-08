
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
    'index.csr.html': {size: 18275, hash: '4477bca22958d1a79f90e2e028f12f93f4c248a140cc98d5cd9ea0c862979ad5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: '8048a9167bfffb62164f3953a03acd489b426052c80c839c0271a546b6e78972', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36673, hash: '4cf9922d97a8a968b6f94faf4c332f1336e334f6dd61ce0863c5608eae04bc16', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'index.html': {size: 36673, hash: '4cf9922d97a8a968b6f94faf4c332f1336e334f6dd61ce0863c5608eae04bc16', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 30002, hash: '78666290af61ec105894772c7a23086217e8c66a5b95bc596b5aa61f6a5844ba', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29745, hash: '36f25dc500be8044555dea292c72197f2978d83824b33947c90c2c495235eadc', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2359989, hash: 'c61dd2f978b4cca94da5a9c5c05dc460a4efc5249185d72978b7e51efa8875b6', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2346154, hash: 'a0b8728d2885822601e38d438381dcff7355bb0c67b751efd5f84ac5ad2ca4a1', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2397438, hash: '54fcb2d421a4619529c1c29af31ff2ef8a88aeddea388b74fdb03732b8b1a620', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31204, hash: 'aa9ca9bd07fa0ac9e910002df56686e971d455a230f93feeac5901110f2e8f3a', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30259, hash: '7ac57329e945e7f91a73df3d21ca5ce5f562f25132c0d5b703bbeb4cc99c8b61', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2408219, hash: 'f689e400f3d4107d80f67642b124f51c2571d2249606b93bfc7c723a368e8431', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 27900, hash: '8c69c055b2142eacee3514ed72734db788c886bfb4a53a755e0d502e906197da', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2427226, hash: '3b5aea8d353f61d63c15bee9f31276097af1466fef2c71d41e00c59914718c84', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 2367443, hash: 'd56dfbf43c9e26571ed4a1934c670068a67f5bed448cf25257b58c67ab5695b7', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'styles-SLFBQBEU.css': {size: 106950, hash: 'JYXvxCtdgwY', text: () => import('./assets-chunks/styles-SLFBQBEU_css.mjs').then(m => m.default)}
  },
};
