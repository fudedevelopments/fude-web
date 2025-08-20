'use client'

import dynamic from 'next/dynamic'

// Client-side component that can use ssr: false
const SmartNeuralBackground = dynamic(() => import('./SmartNeuralBackground'), {
  ssr: false,
  loading: () => (
    <div
      className='fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black'
      style={{ zIndex: 0 }}
    />
  ),
})

export default function NeuralBackgroundWrapper() {
  return (
    <div
      className='fixed inset-0'
      style={{
        zIndex: 0,
        background:
          'linear-gradient(to bottom, #000000, #050510, #050510, #000000)',
      }}
    >
      <SmartNeuralBackground enablePerformanceMode={true} forceMode='auto' />
    </div>
  )
}
