module.exports = {
    title: "Misssonder's Blog",
    description: 'share and learn',
    theme: 'reco',
    themeConfig: {
        type: 'blog',
        authorAvatar:'https://avatars.githubusercontent.com/u/44472482?s=400&u=07e55d6463c8325e46ed9e094e8727136ed55a4b&v=4',
        // 博客配置
        blogConfig: {
            category: {
                location: 1,     // 在导航栏菜单中所占的位置，默认2
                text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 2,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/misssonder' },
            ]
        },
        nav: [
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
        ],
    }
}
