import { lazy } from 'react'
const Photos = lazy(() => import('./../features/photos/Photos'));
export default function Album() {
  return (
    <Photos />
  )
}
