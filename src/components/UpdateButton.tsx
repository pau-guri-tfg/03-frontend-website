import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gsap from 'gsap';
import { useRef } from 'react'

export default function UpdateButton({ className = "", onClick }: { className?: string, onClick: () => void }) {
  const updateIcon = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (updateIcon.current) {
      gsap.to(updateIcon.current, { rotation: '+=360', duration: 0.5 })
    }
    onClick();
  }

  return (
    <button ref={updateIcon} onClick={handleClick} className={className}>
      <FontAwesomeIcon icon={faRotate} title='Refresh data' />
    </button>
  )
}
