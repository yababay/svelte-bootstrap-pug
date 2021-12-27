import switchHash from './router.js'
import GithubLink from './components/GithubLink.svelte'
import CommunityLink from './components/CommunityLink.svelte'
import settings from './settings.json'

const navLinks = document.querySelector('nav ul')

if(settings.withCommunity){
    new CommunityLink({
        target: navLinks, 
    })
}

if(settings.githubLink){
    new GithubLink({
        target: navLinks, 
        props: {link: settings.githubLink}
    })
}

switchHash()

