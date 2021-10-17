import React from 'react'
import { render } from 'react-dom'

import { Content } from './content'

class ContentScripts {
  private readonly container

  constructor() {
    this.container = document.querySelector('.js-show-on-project-root')
    this.renderButton()
  }

  private renderButton() {
    const div = document.createElement('div')
    div.id = 'cat-extension-content-button'

    if (this.container) {
      this.container.appendChild(div)
      render(<Content />, document.querySelector('#cat-extension-content-button'))
    }
  }
}

new ContentScripts()
