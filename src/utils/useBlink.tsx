import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react'

export default function useBlink() {
  const blinkRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!blinkRef.current) return;

    gsap.timeline({ repeat: -1 })
      .to(blinkRef.current, { opacity: 0, duration: 0.5, delay: 1 })
      .to(blinkRef.current, { opacity: 1, duration: 0.5, delay: 0.5 })
  }, [blinkRef]);

  return blinkRef;
}
