import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react'

export default function useBlink(enable = true) {
  const blinkRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>();
  useGSAP(() => {
    if (!blinkRef.current || !enable) return;

    timeline.current = gsap.timeline({ repeat: -1 })
      .to(blinkRef.current, { opacity: 0, duration: 0.5, delay: 1 })
      .to(blinkRef.current, { opacity: 1, duration: 0.5, delay: 0.5 })
  }, [blinkRef, enable]);

  return blinkRef;
}
