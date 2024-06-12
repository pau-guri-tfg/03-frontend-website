import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react'

export default function useExpandable() {
  const expandable = useRef<HTMLDivElement>(null);
  const expandableChevron = useRef<SVGSVGElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useGSAP(() => {
    if (!expandable.current || !expandableChevron.current) return;

    if (isExpanded) {
      gsap.to(expandable.current, { height: "auto", duration: 0.3 });
      gsap.to(expandableChevron.current, { rotate: 180, duration: 0.3 });
    } else {
      gsap.to(expandable.current, { height: 0, duration: 0.3 });
      gsap.set(expandableChevron.current, { rotate: '*=-1' });
      gsap.to(expandableChevron.current, { rotate: 0, duration: 0.3 });
    }
  }, [isExpanded, expandable, expandableChevron])

  return { expandable, expandableChevron, isExpanded, setIsExpanded };
}
