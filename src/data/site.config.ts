interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'DDreame', // Site author
	title: 'About Dreamful Life', // Site title.
	description: '道阻且长, 莫向外求.', // Description to display in the meta tags
	lang: 'zh-CN',
	ogLocale: 'zh-CN',
	shareMessage: '道阻且长, 莫向外求.', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
