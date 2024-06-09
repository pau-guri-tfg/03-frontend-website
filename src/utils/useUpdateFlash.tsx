import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react'

export default function useUpdateFlash(values: any[], color: string = "#FFFFFF", shadowType: "text" | "box" = "text") {
  const element = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!element.current) return;

    gsap.killTweensOf(element.current, shadowType === "text" ? 'textShadow' : 'boxShadow');
    gsap.timeline()
      .set(element.current, shadowType === "text" ? { textShadow: `0 0 10px ${color}, 0 0 10px ${color}` } : { boxShadow: `0 0 10px ${color}` })
      .to(element.current, shadowType === "text" ? { textShadow: '0 0 10px transparent, 0 0 10px transparent', duration: 0.8 } : { boxShadow: '0 0 10px transparent', duration: 0.8 });
  }, values);

  return element;
}
