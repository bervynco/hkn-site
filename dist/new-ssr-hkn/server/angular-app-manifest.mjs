
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
    'index.csr.html': {size: 18275, hash: '53500b27c08b3ec1ac9775c3bd3f11072f65708678d99ebd35e9be8d3dc3721c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 10735, hash: 'f6a51e8e8321069ffbed48f626be07c80469f0d403e4b36f8a065d354121f733', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 36673, hash: '8789939c030795da0ce764048c5fe339a60af2d575090fb3ce0bb6457ecb1312', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29745, hash: '6dc116e04398dce12e87b681d9ccf93232e5c6ca3d876c1c89096ee3d96e314e', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 30002, hash: 'ac04fb898ccbeae788d066455f305fc2c1ae87fc75706d656a55bfb5d5c121f7', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 36673, hash: '8789939c030795da0ce764048c5fe339a60af2d575090fb3ce0bb6457ecb1312', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'crime-news/index.html': {size: 2323412, hash: 'b16bc6be69dc32409f9ac8a23dc5f1fe10e26c676af0932e455db141de163e6b', text: () => import('./assets-chunks/crime-news_index_html.mjs').then(m => m.default)},
    'business-news/index.html': {size: 2286892, hash: '90f9c41774d2dd34a7e7a02106d5d8286ddbb170e7251b23095062e5c1ff9d14', text: () => import('./assets-chunks/business-news_index_html.mjs').then(m => m.default)},
    'politics-news/index.html': {size: 2334216, hash: 'ed8b038812c73c89b536448413e91053885248010b666897f4013f6e2b922e8a', text: () => import('./assets-chunks/politics-news_index_html.mjs').then(m => m.default)},
    'my-profile/index.html': {size: 31207, hash: 'd2eeacfed3b50a476e1ade361f68fb095fa765605edcf748e8baf907176b123f', text: () => import('./assets-chunks/my-profile_index_html.mjs').then(m => m.default)},
    'edit-profile/index.html': {size: 30259, hash: '28bb4babcdb9848cbc209dbadd8de7d4f04d9c7df1c3a3dafb0671a5fc4d7a08', text: () => import('./assets-chunks/edit-profile_index_html.mjs').then(m => m.default)},
    'article/mockType/mockSlug/index.html': {size: 30306, hash: 'e85891231ebd653ee2834e8205c9f472b7f907a9343cb030be1406a3d5a910c2', text: () => import('./assets-chunks/article_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'video-news/mockType/mockSlug/index.html': {size: 30319, hash: '28856c08bf3775abd7308529cbf4689fe1b0431de70b5c5552ad7d30ab635215', text: () => import('./assets-chunks/video-news_mockType_mockSlug_index_html.mjs').then(m => m.default)},
    'entertainment-news/index.html': {size: 2273917, hash: 'f5e64f0c9bea2cbf7333d618ca99d19d8b24d3aff653e991261c26301593b389', text: () => import('./assets-chunks/entertainment-news_index_html.mjs').then(m => m.default)},
    'celebrity-news/index.html': {size: 2353210, hash: '2b05652466cf821c623edfef2b692aa57d76ea58743450f6239c9054add71640', text: () => import('./assets-chunks/celebrity-news_index_html.mjs').then(m => m.default)},
    'styles-X67HUUSU.css': {size: 107207, hash: 'zK7G1fUJrJE', text: () => import('./assets-chunks/styles-X67HUUSU_css.mjs').then(m => m.default)}
  },
};
