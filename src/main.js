import switchHash from './router.js'
import Github from './components/Github.svelte'
import settings from './settings.json'

const navLinks = document.querySelector('nav ul')

if(settings.githubLink){
    new Github({
        target: navLinks, 
        props: {link: settings.githubLink}
    })
}

switchHash()

