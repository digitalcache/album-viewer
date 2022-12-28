import { lazy } from 'react'
const Albums = lazy(() => import('./../features/albums/Albums'));
export default function User() {
  return (
    <Albums />
  );
}