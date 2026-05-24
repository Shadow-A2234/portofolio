// Lokasi File: /components/SplineBackground.tsx
'use client';
import Spline from '@splinetool/react-spline';

export default function SplineBackground({ onLoad }: { onLoad: () => void }) {
  return (
    <Spline 
      scene="https://prod.spline.design/9kZYZh5ayuhP3vpy/scene.splinecode" 
      onLoad={onLoad}
    />
  );
}