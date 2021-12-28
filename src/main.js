import useHashRouting from './util/router.js'
import NavbarIcons from './components/NavbarIcons.svelte'
import settings from './settings.json'

if(settings.navbarIcons){
    new NavbarIcons({
        target: document.querySelector('nav ul')
    })
}

if(settings.useHashRouting){
    useHashRouting()
}

