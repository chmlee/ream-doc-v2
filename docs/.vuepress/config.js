const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Markdata',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Language',
        link: '/Language/Getting-Started',
      },
      {
        text: 'Toolkit',
        link: '/Toolkit/',
      },
      {
        text: 'Contribution',
        link: '/Contribution/',
      },
      {
        text: 'Github',
        link: 'https://github.com/chmlee/markdata.js'
      }
    ],
    sidebar: {
      '/Language/': [
        'Getting-Started',
        {
          title: 'Basic',
          path: '/Language/Basic/Variable',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/Language/Basic/Variable',
            '/Language/Basic/List',
            '/Language/Basic/Annotation',
            '/Language/Basic/Entry'
          ]
        },
        {
          title: 'Schema',
          path: '/Language/Advance/Schema',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/Language/Advance/Typed-Variable',
            '/Language/Advance/Template-Script'
          ]
        },
        'Comparison',
        'Git-Integration',
      ],
      '/Toolkit/': [
        {
          title: 'Toolkit',
          path: '/Toolkit/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/Toolkit/Parser',
            '/Toolkit/Editor'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
