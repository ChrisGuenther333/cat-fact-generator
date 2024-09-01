import { React, useState, useEffect } from'react';
import './App.css'

function App() {
  const [imageURL, setImageURL] = useState('')
  const [fact, setFact] = useState('')
  
  async function getImageAndFact() {
      const imageResponse = await fetch('https://api.thecatapi.com/v1/images/search')
      const imageJson = await imageResponse.json()
      setImageURL(imageJson[0].url)

      const factResponse = await fetch('https://catfact.ninja/fact')
      const factJson = await factResponse.json()
      setFact(factJson.fact)

      playAudio()
  }

  function playAudio() {
    const meowFiles = ['meow1', 'meow2', 'meow3', 'meow4']
    const barkFile = 'bark'
    const randNum = Math.floor(Math.random() * 100)
    let chosenAudio = undefined
    if (randNum <= 95) {
      chosenAudio = meowFiles[Math.floor(Math.random() * meowFiles.length)]
    }
    else {
      chosenAudio = barkFile
    }
    const audio = new Audio(`/audio/${chosenAudio}.mp3`)
    audio.volume = 0.25
    audio.play()
  }

  useEffect(() => {
      getImageAndFact()
  }, [])

  return (
      <div className='cursor-nyanCat h-[calc(100vh-60px)] text-center mt-10 md:mt-0'>
        <audio src='/audio/cat-fact-waltz.mp3' type="audio/mp3" autoPlay loop></audio>
        <h1 className='text-2xl'>Super Cool Cat Fact Generator</h1>
        <h2 className='text-lg mb-5'>(Don't tell anyone, it's a secret)</h2>
        <img src={imageURL} alt="Cat picture" className='block m-auto max-w-80 max-h-80 mb-5' />
        <p className='mb-5'>{fact}</p>
        <button className='px-5 py-4 mx-3 border border-mamas-red self-center rounded-full hover:text-white hover:bg-mamas-red transition-colors duration-300' onClick={getImageAndFact}>Click me for a new fact!</button>
        {/* <button className="px-5 py-4 mx-3 border self-center rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-violet-500 hover:animate-pulse text-center">Click me for a new fact!</button> */}
        <div className='flex flex-wrap justify-around mt-12'>
          <img src='/images/dancing-cat.gif' />
          <img src='/images/dancing-cat.gif' />
          <img src='/images/dancing-cat.gif' />
        </div>
      </div>
  )
}

export default App
