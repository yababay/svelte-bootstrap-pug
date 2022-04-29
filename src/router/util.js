import DangerMessage from '../components/DangerMessage.svelte'
const tocClose = document.querySelector('#toc-offcanvas .btn-close')

function closeOffcanvas(){
    if(tocClose) tocClose.click()
    return ''
}

function showError(message, target){
    closeOffcanvas()
    new DangerMessage({target, props: {message}})
}

export default {closeOffcanvas, showError}
