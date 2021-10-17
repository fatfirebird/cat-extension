import React, { useEffect, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { TCat } from '../api/api.types'
import { BACKGROUND_ACTION } from '../types/background-request'

export const Popup: React.FC = () => {
  const [randomCat, setRandomCat] = useState<TCat | null>(null)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)

  useEffect(() => {
    const getInitialCat = async () => {
      const { cat } = await browser.storage.sync.get('cat')
      setRandomCat(cat)
    }

    getInitialCat()
  }, [])

  const handleSendMessage = () => {
    setIsBlocked(true)

    browser.runtime
      .sendMessage({
        action: BACKGROUND_ACTION.GET_CAT,
      })
      .then((data) => {
        setRandomCat(data[0])
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsBlocked(false)
      })
  }

  return (
    <div>
      <button style={{ width: '100%' }} onClick={handleSendMessage} disabled={isBlocked}>
        ХОЧУ КАРТИНКУ С КОТОМ
      </button>
      {randomCat?.url && (
        <img id={randomCat.id} src={randomCat.url} style={{ paddingTop: '10px' }} height="200px" width="200px" />
      )}
    </div>
  )
}
