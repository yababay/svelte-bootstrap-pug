'use strict';

var title = "Привет, мир!";
var brand = "Привет, мир!";
var githubLink = "https://github.com/yababay/svelte-meets-yababay";
var navbarIcons = [
	{
		icon: "community"
	},
	{
		icon: "github"
	}
];
var asideTitle = "Полезные ссылки:";
var asideLinks = [
	{
		title: "Первая ссылка",
		icon: "book",
		link: "#first"
	},
	{
		title: "Вторая ссылка",
		icon: "book",
		link: "#second"
	},
	{
		title: "Третья ссылка",
		icon: "book",
		link: "#third"
	}
];
var logoFormat = "svg";
var useHashRouting = true;
var withAsideMenu = true;
var withCommunity = true;
var headerMainFooter = true;
var withBootstrap = true;
var brandWithEndIcons = true;
var footerWithCopyright = true;
var copyright = "Михаил Беляков";
var settings = {
	title: title,
	brand: brand,
	githubLink: githubLink,
	navbarIcons: navbarIcons,
	asideTitle: asideTitle,
	asideLinks: asideLinks,
	logoFormat: logoFormat,
	useHashRouting: useHashRouting,
	withAsideMenu: withAsideMenu,
	withCommunity: withCommunity,
	headerMainFooter: headerMainFooter,
	withBootstrap: withBootstrap,
	brandWithEndIcons: brandWithEndIcons,
	footerWithCopyright: footerWithCopyright,
	copyright: copyright
};

module.exports = settings;
