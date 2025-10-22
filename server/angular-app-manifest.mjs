
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://death7654.github.io/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/suggestions",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/suggestions/all",
    "route": "/suggestions"
  },
  {
    "renderMode": 2,
    "route": "/suggestions/all"
  },
  {
    "renderMode": 2,
    "route": "/suggestions/new"
  },
  {
    "renderMode": 2,
    "route": "/suggestions/create-account"
  },
  {
    "renderMode": 2,
    "redirectTo": "/suggestions/account/login",
    "route": "/suggestions/account"
  },
  {
    "renderMode": 2,
    "route": "/suggestions/account/login"
  },
  {
    "renderMode": 2,
    "route": "/suggestions/account/profile"
  },
  {
    "renderMode": 2,
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "redirectTo": "/suggestions",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9905, hash: '3768bc1d85b99ab51d3237c245889a9a6bb85a3c2301765a3787fe9996fc5f06', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1143, hash: '1010af77fedda3d9822c9e6c688d6972d63fcbbcc4516c02ebb4123d3ee6ae8c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'suggestions/all/index.html': {size: 50707, hash: '3baa2e59186c65709da9dca3c35d4f536965d4aec7e896533912568799d0b7a1', text: () => import('./assets-chunks/suggestions_all_index_html.mjs').then(m => m.default)},
    'suggestions/account/profile/index.html': {size: 39693, hash: '3d3ef2d0ad8385b55521fd8487501dfb4833c5a85ea5567d8a55a8645ed21b3e', text: () => import('./assets-chunks/suggestions_account_profile_index_html.mjs').then(m => m.default)},
    'suggestions/new/index.html': {size: 53967, hash: '54ffda836eb85b9fba5dea8392badd81a8cba9f35487a35fd03c490477f4ab55', text: () => import('./assets-chunks/suggestions_new_index_html.mjs').then(m => m.default)},
    'suggestions/account/login/index.html': {size: 39700, hash: 'c6038a319c59394bc32eb85811c43830b144041f319a793fba2bd23acee6f95c', text: () => import('./assets-chunks/suggestions_account_login_index_html.mjs').then(m => m.default)},
    'suggestions/create-account/index.html': {size: 37926, hash: '62d8677bdf52eebea3bceb8d6a22d4a421a8ca1e5f439f35c15465feac13b264', text: () => import('./assets-chunks/suggestions_create-account_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 43217, hash: '7a732ceb14839a171bda67342c18f142a6af009e45291928bb8f38b7b4177894', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'styles-3OTCER6K.css': {size: 483415, hash: '8oJzG3FcBck', text: () => import('./assets-chunks/styles-3OTCER6K_css.mjs').then(m => m.default)}
  },
};
