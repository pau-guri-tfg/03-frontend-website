import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCallback, useRef, useState } from 'react'
import { Flip } from 'gsap/all';
import useBlink from '../utils/useBlink';

export default function LiveLabel({ updateTime, enableHover = false }: { updateTime: number, enableHover?: boolean }) {
  const liveDot = useBlink(updateTime > 0);

  const container = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(Flip);
  let flipState: Flip.FlipState = Flip.getState(container.current);
  const [timeShown, setTimeShown] = useState<boolean>(false);

  const handlePointerEnter = useCallback(() => {
    if (updateTime <= 0 || !enableHover) return;

    flipState = Flip.getState(container.current);
    setTimeShown(true);
  }, [updateTime]);

  const handlePointerLeave = () => {
    if (!enableHover) return;

    flipState = Flip.getState(container.current);
    setTimeShown(false);
  }

  useGSAP(() => {
    Flip.from(flipState, { duration: 0.3 });
  }, [timeShown]);

  return (
    <div
      ref={container}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className='flex items-center gap-2.5 border border-purple rounded-full p-3 select-none overflow-hidden'
    >
      <div ref={liveDot} className={'w-3 h-3 rounded-full border shrink-0' + (updateTime <= 0 ? " border-purple" : " border-transparent bg-purple")} />
      <span className='leading-none text-purple whitespace-nowrap'>{timeShown ? "last update " + new Date(updateTime).toLocaleTimeString() : "LIVE"}</span>
    </div>
  )
}
