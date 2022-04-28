
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    /*
    import useHashRouting from './util/router.js'
    import NavbarLinks from './components/NavbarLinks.svelte'
    import AsideLinks  from './components/AsideLinks.svelte'
    import settings from './settings.json'

    const navUl = document.querySelector('nav ul')

    if(settings.navbarLinks && navUl){
        new NavbarLinks({
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

    if(settings.mainLayout == 'offcanvas-and-article'){
        const header = document.querySelector('header')
        const tocShowButton = document.querySelector('#toc-show')

        const tocShowCallback = (entries) => {
            entries.forEach(entry => {
                if(entry.target !== header) return
                tocShowButton.style.top = entry.isIntersecting ? "var(--header-height)" : "0"
            })
        }

        const tocShowObserver = new IntersectionObserver(tocShowCallback, {threshold: .25});


        tocShowObserver.observe(header)
    }

     */

    console.log('ready');

})();
//# sourceMappingURL=bundle.js.map
