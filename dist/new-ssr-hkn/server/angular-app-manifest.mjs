
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
    'index.csr.html': {size: 18275, hash: '28f1ea67989da8ff97dd72780c9ed64a5f50e172c5b567122a8c42a716f8bfa1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: 'da4063e81819f4cb94c1f4dc2ee635529ccc6d09272ee7b998398794a9457a51', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 36673, hash: '82a687c3145ccea8fd84a8e66df88508bca75a8f531f260bae5b335acee442ce', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36673, hash: '82a687c3145ccea8fd84a8e66df88508bca75a8f531f260bae5b335acee442ce', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29748, hash: '55479bf957505aa1829f8c68c995069705ecddaa32bdc18b12938300d8a1d4df', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 30002, hash: '4681d215d94668643dfa92841d41fee7c8227729e4de1b83c6fbfcb72c40153a', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2830627, hash: '41391d282fa28849e5561acff516c293605c5efeffa90997f8e39a193e22c3ca', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2870793, hash: '012c786e7f09474172b667bf1979384a069197dd957258d7acc313e4442b7871', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2887270, hash: '55386b9fe640505c2a0784127de4757992a48d06966b4c6aaadcc5c2a0507289', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2815073, hash: 'ba76faeea29e2f03b3af68a365b53c14a9de4bfd8e17f794d99e8f58a7c9a947', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2914964, hash: '5b6b2f22d1e0cec5b1fcad0e3ca848c18a9ae9548135bba4e70351203e45c3f9', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31207, hash: '5ca377d2d5fa545048328c45ac916ae3604ded946512d032b421a282650a0cac', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30259, hash: '661809dbaf8f9c532458718c53269ffa3238a381b2cde9ce1c26898c9fd099c6', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 30306, hash: '3b68cf8d0780d61151cb7fba1bb33fb8aba2aaff2b1ed7b43d0d06f7cac7d2c4', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 30319, hash: 'f372e9bc0e9aef179b0469f02193aadfed0992776e4b198949612cf9a03c8e10', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'styles-SLFBQBEU.css': {size: 106950, hash: 'JYXvxCtdgwY', text: () => import('./assets-chunks/styles-SLFBQBEU_css.mjs').then(m => m.default)}
  },
};
