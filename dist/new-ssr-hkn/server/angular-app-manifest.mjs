
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
    'index.csr.html': {size: 18275, hash: 'fc49e153fb9560d5bd30deb99e2326a27becc6fae9057872f25d8ba8c0f30814', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: 'fce182b68a0bf09437d80c0cf3cf9db6e3be26d47b9593e2126fddf9c3eda86b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36600, hash: '8068c64cd3cbeadc8dd321bf7ae53e35a4b2641453488c4197327cdbc047c21a', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'index.html': {size: 36600, hash: '8068c64cd3cbeadc8dd321bf7ae53e35a4b2641453488c4197327cdbc047c21a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29672, hash: '4fc4a9b02c0eb9eb87eb1b4dd7e80c9bc87b79dd6a91a9ef2f7328567c42e605', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 29925, hash: 'cde30ddddcdcb0182c5ed3b43377e4aa43e93d4cf1f2a1ef7730d4d75963b6eb', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2273646, hash: '409fac3c78796db64d267eefd766bc514ff1e1185f7256d0d20ebec7e83f4718', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2345080, hash: 'f40d9c8a8abfb2aa098a0b68a3eaef4365b6ef0ad3353f2ce00b529a973daf67', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31134, hash: '122eb584da254bd584e383a8d382b8c40f96c908e0faa10584290754effd2c0c', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30186, hash: '51f282de83f52ed46a364a9a4265baeddd3c292e58365bc0f76db87e922bf68a', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 28563, hash: 'f2a6d125b5f7f5a1548f0875223363a59cf660df0a7aa701f4ee3c5c156bb01c', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 27827, hash: '93cc0087f60eec41dc7c8b90c5748ca511b2085ca85c3230ba6a2f352836573f', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2285255, hash: 'bab68030e37be25638c9d93f9dc757096514a968cdea2247ce9c989261eda5a2', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2328746, hash: '930e18e37365a20f64b2f3ad6e8c3c0d207743a51fe97c359dea7da09c646342', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2319712, hash: '2c6c181f26ad829c7306ca01e9e5558d02f7ac02729f5385325fe6b68558bcf2', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'styles-X67HUUSU.css': {size: 107207, hash: 'zK7G1fUJrJE', text: () => import('./assets-chunks/styles-X67HUUSU_css.mjs').then(m => m.default)}
  },
};
