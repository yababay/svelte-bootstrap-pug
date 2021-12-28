import switchHash from './router.js'
import NavbarIcons from './components/NavbarIcons.svelte'
import settings from './settings.json'

const navLinks = document.querySelector('nav ul')

if(settings.navbarIcons){
    new NavbarIcons({
        target: navLinks, 
    })
}

switchHash()

