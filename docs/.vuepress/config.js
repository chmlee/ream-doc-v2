const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  base: '/ream-doc-v2/',
  title: 'REAM',
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
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
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
        text: 'Toolchain',
        link: '/Toolchain/',
      },
      {
        text: 'Contribution',
        link: '/Contribution/',
      },
      {
        text: 'Github',
        link: 'https://github.com/chmlee/reamparser.js'
      }
    ],
    sidebar: {
      '/Language/': [
        'Specs',
        'Getting-Started',
        {
          title: 'Basics',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/Language/Basics/Variable',
            '/Language/Basics/Annotation',
            '/Language/Basics/Entry'
          ]
        },
        {
          title: 'Advanced',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/Language/Advanced/Codebook',
            '/Language/Advanced/Typed-Variable',
            '/Language/Advanced/Template',
            '/Language/Advanced/Computed-Variable',
            '/Language/Advanced/Reference',
          ]
        },
        //'Comparison',
        'Git-Integration',
      ],
      '/Toolchain/': [
        {
          title: 'Toolchain',
          path: '/Toolchain/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/Toolchain/Parser.md',
            '/Toolchain/Editor.md',
          ]
        }
      ],
      '/Contribution/': [
        {
          title: 'Contribution',
          path: '/Contribution/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            '/Contribution/Note.md',
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
    [
      'vuepress-plugin-mathjax',
      {
          target: 'chtml',
          macros: {
            '*': '\\times',
        },
      },
    ]
  ]
}
