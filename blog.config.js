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
  // Whether to enable pagination
  enablePagination: false,
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
  // Article content max width
  articleWidth: '5xl', // 可选值：'3xl', '4xl', '5xl'
  // Comment section max width
  commentWidth: '5xl', // 可选值：'3xl', '4xl', '5xl'

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
    provider: 'utterances',
    utterancesConfig: {
      // 格式：用户名/仓库名
      repo: 'Wjiajie/meme-blog-comments',
      // 可选值：pathname, url, title, og:title
      issueTerm: 'pathname',
      // 可选值：github-light, github-dark, preferred-color-scheme
      theme: 'preferred-color-scheme'
    }
  }
}
