import React, { useEffect, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { TCat } from '../api/api.types'
import { BACKGROUND_ACTION } from '../types/background-request'

export const Popup: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [randomCat, setRandomCat] = useState<TCat | null>(null)

  useEffect(() => {
    const getInitialCat = async () => {
      const { cat } = await browser.storage.sync.get('cat')
      setRandomCat(cat)
    }

    getInitialCat()
  }, [])

  const handleLoadCat = () => {
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

  const handleClearCat = () => {
    setIsBlocked(true)

    browser.runtime
      .sendMessage({
        action: BACKGROUND_ACTION.REMOVE_CAT,
      })
      .finally(() => {
        setRandomCat(null)
        setIsBlocked(false)
      })
  }

  return (
    <div style={{ width: '300px', height: '290px' }}>
      <button style={{ width: '100%' }} onClick={handleLoadCat} disabled={isBlocked}>
        ХОЧУ КАРТИНКУ С КОТОМ
      </button>
      {randomCat?.url && (
        <div>
          <img id={randomCat.id} src={randomCat.url} style={{ paddingTop: '10px' }} height="230px" width="100%" />
          <button style={{ width: '100%' }} onClick={handleClearCat} disabled={isBlocked}>
            НЕ ХОЧУ КАРТИНКУ С КОТОМ
          </button>
        </div>
      )}
    </div>
  )
}
