import Image from 'next/image'
import styles from './page.module.css'
import LogOutBtn from '@/clientComponents/LogOutBtn'


export default function Home() {
  return (
    <div>
      <form action="/api/matching-start" method='POST'>
        <button className='main-btn'>Matching Start</button>
      </form>
    </div>
  )
}
