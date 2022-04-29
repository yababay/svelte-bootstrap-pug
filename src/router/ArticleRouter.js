import { MarkdownRouter } from '@yababay67/hash-router'
import {showError, closeOffcanvas } from './util'

class ArticleRouter extends MarkdownRouter {

    constructor(){
        super()
        closeOffcanvas()
    }

    static showError(err)

}

export default ArticleRouter
