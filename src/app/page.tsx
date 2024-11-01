'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Share2, Music2 } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

const videos = [
  {
    id: 1,
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Reemplaza con URLs de videos verticales
    author: '@user1',
    description: 'Descripción del video 1',
    music: 'Canción 1 - Artista 1',
  },
  {
    id: 2,
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Reemplaza con URLs de videos verticales
    author: '@user2',
    description: 'Descripción del video 2',
    music: 'Canción 2 - Artista 2',
  },
  {
    id: 3,
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Reemplaza con URLs de videos verticales
    author: '@user3',
    description: 'Descripción del video 3',
    music: 'Canción 3 - Artista 3',
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex]);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true, // Ahora debería estar reconocido correctamente
    trackTouch: true,
  });

  return (
    <div {...handlers} className="h-screen w-full bg-black overflow-hidden">
      <div className="relative h-full w-full flex justify-center items-center">
        <div className="w-full h-full max-w-[500px] aspect-video">
          <video
            ref={videoRef}
            src={videos[currentIndex].url}
            className="h-full w-full object-cover rounded-lg"
            loop
            playsInline
            muted
          />
        </div>

        {/* Información del video */}
        <div className="absolute bottom-24 left-6 text-white">
          <h2 className="text-lg font-bold">{videos[currentIndex].author}</h2>
          <p className="text-sm">{videos[currentIndex].description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Music2 className="w-4 h-4" />
            <p className="text-sm">{videos[currentIndex].music}</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="absolute right-6 bottom-32 flex flex-col items-center gap-6">
          <button className="p-2 bg-black bg-opacity-50 text-white rounded-full">
            <Heart className="w-8 h-8" />
          </button>
          <button className="p-2 bg-black bg-opacity-50 text-white rounded-full">
            <MessageCircle className="w-8 h-8" />
          </button>
          <button className="p-2 bg-black bg-opacity-50 text-white rounded-full">
            <Share2 className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
