import { defineConfig } from 'umi';

const env: any = process.env.UMI_ENV;

const menus = [
  {
    title: 'layout-user-manage',
    icon: 'icon-yonghuguanlibeifen',
    key: 'userManagement',
    route: '',
    children: [
      {
        title: 'layout-sub-admin',
        icon: 'icon-yonghuguanlibeifen',
        key: 'subAdmin',
        route: '/usr/subAdmin',
        children: [],
      },
      {
        title: 'layout-ordinary-usr',
        icon: 'icon-yonghuguanlibeifen',
        key: 'ordinaryUsr',
        route: '/usr/ordinary',
        children: [],
      },
    ],
  },
  {
    title: 'layout-form-manage',
    icon: 'icon-zidingyiyingyongbeifen',
    key: 'formManagement',
    route: '',
    children: [
      {
        title: 'layout-form-data',
        icon: 'icon-yonghuguanlibeifen',
        key: 'formDataModule',
        route: '/table/formData',
        children: [],
      },
    ],
  },
];

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: false,
    hmr: true,
  },
  // layout: {
  //   name: '中台系统',
  //   theme: 'pro',
  //   locale: true,
  //   navTheme: 'dark',
  //   primaryColor: '#1890ff',
  //   layout: 'sidemenu',
  //   contentWidth: 'Fluid',
  //   fixedHeader: false,
  //   // fixSiderbar: false,
  //   title: '中台系统',
  //   pwa: false,
  //   iconfontUrl: '',
  // },
  // routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
  hash: true,
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  define: {
    ENV: 'prod',
  },
  proxy: {
    '/api': {
      target: 'http://121.37.173.212:19090',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  headScripts: [
    'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_14506_47.c341ceccfa33318e1cf9961532aca9df.es5.js',
  ],
  mock: undefined,
});
