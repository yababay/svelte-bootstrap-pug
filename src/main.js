import useHashRouting from './util/router.js'
import NavbarIcons from './components/NavbarIcons.svelte'
import AsideLinks  from './components/AsideLinks.svelte'
import settings from './settings.json'

if(settings.navbarIcons){
    new NavbarIcons({
        target: document.querySelector('nav ul')
    })
}

if(settings.asideLinks){
    new AsideLinks({
        target: document.querySelector('aside ul')
    })
}

if(settings.useHashRouting){
    useHashRouting()
}

