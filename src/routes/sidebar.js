/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/accounts',
    icon: 'PagesIcon',
    name: 'Accounts',
  },
  /*{
    icon: 'PagesIcon',
    name: 'Accounts',
    routes: [
      // submenu
      {
        path: '/app/wallet',
        name: 'Wasabi',
      },
      {
        path: '/app/wallet',
        name: 'Coldcard 1',
      },
      {
        path: '/app/wallet',
        name: 'Trezor',
      },
    ],
  },*/
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Insights',
  },
]

export default routes
