import useHashRouting from './util/router.js'
import NavbarIcons from './components/NavbarIcons.svelte'
import AsideLinks  from './components/AsideLinks.svelte'
import settings from './settings.json'

const navUl = document.querySelector('nav ul')

if(settings.navbarIcons && navUl){
    new NavbarIcons({
        target: navUl
    })
}

const asideUls = document.querySelectorAll('aside ul')

if(settings.asideLinks && asideUls && asideUls.length){
    for(let i in Array.from(asideUls)){
        new AsideLinks({
            target: asideUls[i],
            props: {
                links: settings.asideLinks[i].links 
            }
        })
    }
}

if(settings.withHashRouting){
    useHashRouting()
}

