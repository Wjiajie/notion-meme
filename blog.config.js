module.exports = {
  /* Site info */

  // Site title
  title: 'PONDER',
  // Site description, will be displayed next to the site title
  description: 'keep thinking, keep simple.',
  // Site URL
  link: 'https://www.jiajiewu.top/',
  // Site creation year, will use the current year if unset
  since: 2024,
  // Author name
  author: 'jiajiewu',
  // Author email, will determine the avatar returned by Gravatar
  email: 'jiajiewu233@gmail.com',
  // Author’s social account link, will become the link address of the author’s avatar
  socialLink: 'https://github.com/Wjiajie',

  /* Site preferences */

  // Site language, can be one of these:
  //   'en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES'
  lang: 'zh-CN',
  // Site time zone, will determine the time zone of article time (using IANA identifier format)
  // See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for all options
  timezone: 'Asia/Shanghai',
  // Site appearance, can be one of these:
  //   'light', 'dark', 'auto'
  appearance: 'auto',
  // Site font, can be one of these:
  //   'sans-serif', 'serif'
  font: 'sans-serif',
  // Light mode background color in #RRGGBB form
  lightBackground: '#ffffff',
  // Dark mode background color in #RRGGBB form
  darkBackground: '#18181B',
  // Number of articles per page in article list
  postsPerPage: 7,
  // Whether to sort posts by date
  sortByDate: false,
  // Whether to display "Zettelkasten" link
  showZettelkasten: true,
  // Whether to display "About" link
  showAbout: true,
  // Whether to display "Feed" link
  showFeed: true,
  // Whether to display "Search" link
  showSearch: true,
  // Always use a collapsed navigation bar
  autoCollapsedNavBar: false,

  /* Technical config */

  // Site root path. If you want to mount the site under a certain path of another site, you need to fill in this item.
  path: '',
  // OG image generation service address (don’t add a slash at the end)
  ogImageGenerateURL: 'https://og-image-craigary.vercel.app',
  // SEO configuration
  seo: {
    // Site keywords
    keywords: ['Blog', 'Website', 'Notion'],
    // Google site verification code
    googleSiteVerification: ''
  },

  /* Analytics config */

  // Traffic statistics tool configuration
  analytics: {
    // Traffic statistics tool, can be one of these: (leave it empty to disable)
    //   'ga'
    provider: '',
    // Google Analytics configuration
    gaConfig: {
      // G-Tag (e.g. G-XXXXXXXXXX)
      measurementId: ''
    }
  },

  /* Comment config */

  // Comment tool configuration
  comment: {
    // Comment tool, can be one of these: (leave it empty to disable)
    //   'gitalk', 'utterances', 'cusdis'
    provider: '',
    // Gitalk configuration
    gitalkConfig: {
      // Repository name
      repo: '',
      // Repository owner
      owner: '',
      // Administrator
      admin: [],
      clientID: '',
      clientSecret: '',
      // Whether to enable distraction-free mode
      distractionFreeMode: false
    },
    // Utterances configuration
    utterancesConfig: {
      // Repository name
      repo: ''
    },
    // Cusdis configuration
    cusdisConfig: {
      appId: '',
      // Service address, only need to modify when using self-hosted service
      host: 'https://cusdis.com',
      // Script address, only need to modify when using self-hosted service
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js'
    }
  }
}
