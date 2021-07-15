import {useRouter} from 'next/router'
import { useEffect } from 'react'
// Default root page
export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    // Redirecting to the page url /test/jobs as in description,
    router.push('/test/jobs')
  })
  return (<p>Loading...</p>)
}
