import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react'
import { formatTime } from '../utils/timeFormatter';
import { Flip } from 'gsap/all';

export default function LiveLabel({ updateTime }: { updateTime: number }) {

  const liveDot = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!liveDot.current) return;

    gsap.timeline({ repeat: -1 })
      .to(liveDot.current, { opacity: 0, duration: 0.5, delay: 1 })
      .to(liveDot.current, { opacity: 1, duration: 0.5, delay: 0.5 })
  }, [liveDot]);

  const container = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(Flip);
  let flipState: Flip.FlipState = Flip.getState(container.current);
  const [text, setText] = useState<string>("LIVE");

  const handlePointerEnter = () => {
    flipState = Flip.getState(container.current);
    const date = new Date(updateTime);
    setText('last update ' + date.toLocaleTimeString());
  }

  const handlePointerLeave = () => {
    flipState = Flip.getState(container.current);
    setText('LIVE');
  }

  useGSAP(() => {
    Flip.from(flipState, { duration: 0.3 });
  }, [text]);

  return (
    <div
      ref={container}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className='flex items-center gap-2.5 border border-purple rounded-full p-3 select-none overflow-hidden'
    >
      <div ref={liveDot} className='w-3 h-3 rounded-full bg-purple shrink-0' />
      <span className='leading-none text-purple whitespace-nowrap'>{text}</span>
    </div>
  )
}
