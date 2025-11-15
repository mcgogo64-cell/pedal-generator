import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pedal Generator Simulator',
    short_name: 'Pedal Gen',
    description: 'Interactive pedal-powered generator simulator. Calculate energy output, battery restoration, and calories burned.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

