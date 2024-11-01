'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';

const videos = [
  {
    id: 1,
    url: '/videos/121903-724720200_small.mp4',
    author: 'Cascada Grande',
    description: 'Vivi una experiencia unica en cordoba',
    music: 'La cumbrecita, Cordoba, Argentina',
  },
  {
    id: 2,
    url: '/videos/125314-733046618_small.mp4',
    author: 'Lago guachulafquen',
    description: 'pasa una tarde de montaña y lago',
    music: 'San Martin de los Andes, Neuquen, Argentina',
  },
  {
    id: 3,
    url: '/videos/132263-753186437_small.mp4',
    author: 'La olla',
    description: 'Pileta natural en la sierra cordobeza',
    music: 'Cordoba, Argentina',
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const changeVideo = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300); // Duración de la transición en ms
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex]);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < videos.length - 1) {
        changeVideo(currentIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        changeVideo(currentIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  return (
    <div {...handlers} className="h-screen w-full bg-black overflow-hidden relative">
      {/* Video en pantalla completa con transición */}
      <video
        ref={videoRef}
        src={videos[currentIndex].url}
        className={`h-full w-full object-cover absolute top-0 left-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        loop
        playsInline
        muted
      />
  
      {/* Información del usuario y descripción sobre el video */}
      <div className="absolute bottom-32 left-4 text-white z-10">
        <h2 className="text-3xl font-bold">{videos[currentIndex].author}</h2>
        <p className="text-sm mt-1">{videos[currentIndex].description}</p>
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{videos[currentIndex].music}</p>
        </div>
  
        {/* Botón "Vivi la experiencia" */}
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full">
          Vivi la experiencia
        </button>
      </div>
  
      {/* Botones de acción en columna a la derecha */}
      <div className="absolute right-4 top-[40%] flex flex-col items-center gap-4 z-10">
        {/* Icono de usuario más grande */}
        <button className="bg-gray-300 text-white rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
          <Image
            src="/path-to-user-image.png"
            alt="Publicador"
            width={56}
            height={56}
            className="rounded-full"
          />
        </button>
  
        {/* Botones de acción sin fondo */}
        <button className="p-2 text-white">
          <Heart className="w-8 h-8" />
        </button>
        <button className="p-2 text-white">
          <MessageCircle className="w-8 h-8" />
        </button>
        <button className="p-2 text-white">
          <Share2 className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
