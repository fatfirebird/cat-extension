import { browser } from 'webextension-polyfill-ts'

browser.runtime.onMessage.addListener((request) => {
  console.log(request.action)

  switch (request.action) {
    case 'GET_ACTIVE_TAB': {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => tabs[0])
        .catch((err) => err)
    }
    case 'UPDATE_ICON': {
      browser.browserAction
        .setIcon({ path: request.value ? 'icons/crt-blue.png' : 'icons/crt-gray.png' })
        .catch((err) => console.log(err))
      break
    }

    case 'OPEN': {
      const title = request.message.title as string

      browser.storage.sync.get(['token', 'refreshToken', 'projects']).then((res) => console.log(res))
      break
    }

    default:
      break
  }
})
