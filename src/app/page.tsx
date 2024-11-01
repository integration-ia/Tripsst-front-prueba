'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  Music2,
} from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { HTMLAttributes } from 'react'


declare module 'react-swipeable' {


  interface SwipeableConfig {
    onSwiped?: (eventData: any) => void
    onSwiping?: (eventData: any) => void
    onSwipedUp?: (eventData: any) => void
    onSwipedDown?: (eventData: any) => void
    onSwipedLeft?: (eventData: any) => void
    onSwipedRight?: (eventData: any) => void
    preventDefaultTouchmoveEvent?: boolean
    trackMouse?: boolean
    trackTouch?: boolean
    delta?: number
  }

  export function useSwipeable(config: SwipeableConfig): HTMLAttributes<HTMLElement>
}


const videos = [
  {
    id: 1,
    url:
      'https://commondatastorage.googleapis.com/' +
      'gtv-videos-bucket/sample/ForBiggerFun.mp4',
    author: '@user1',
    description: 'Descripción del video 1',
    music: 'Canción 1 - Artista 1',
  },
  {
    id: 2,
    url:
      'https://commondatastorage.googleapis.com/' +
      'gtv-videos-bucket/sample/BigBuckBunny.mp4',
    author: '@user2',
    description: 'Descripción del video 2',
    music: 'Canción 2 - Artista 2',
  },
  {
    id: 3,
    url:
      'https://commondatastorage.googleapis.com/' +
      'gtv-videos-bucket/sample/ElephantsDream.mp4',
    author: '@user3',
    description: 'Descripción del video 3',
    music: 'Canción 3 - Artista 3',
  },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [currentIndex])

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  })

  return (
    <div
      {...handlers}
      className="h-screen w-full bg-black overflow-hidden"
    >
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          src={videos[currentIndex].url}
          className="h-full w-full object-cover"
          loop
          playsInline
          muted
        />

        {/* Información del video */}
        <div className="absolute bottom-20 left-4 text-white">
          <h2 className="text-lg font-bold">
            {videos[currentIndex].author}
          </h2>
          <p className="text-sm">
            {videos[currentIndex].description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Music2 className="w-4 h-4" />
            <p className="text-sm">
              {videos[currentIndex].music}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div
          className="absolute right-4 bottom-32 flex flex-col items-center gap-4"
        >
          <button
            className="p-2 bg-transparent text-white rounded-full"
          >
            <Heart className="w-8 h-8" />
          </button>
          <button
            className="p-2 bg-transparent text-white rounded-full"
          >
            <MessageCircle className="w-8 h-8" />
          </button>
          <button
            className="p-2 bg-transparent text-white rounded-full"
          >
            <Share2 className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  )
}
