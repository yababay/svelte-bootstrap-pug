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
    const uls = document.querySelectorAll('aside ul')
    for(let i in Array.from(uls)){
        new AsideLinks({
            target: uls[i],
            props: {
                links: settings.asideLinks[i].links 
            }
        })
    }
}

if(settings.useHashRouting){
    useHashRouting()
}

