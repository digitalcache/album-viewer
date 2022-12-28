import { useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    photos,
    getPhotosAsync,
    PhotoState,
    PhotosState
} from './photosSlice';
import {
  albums, 
  AlbumsState, 
  AlbumState
} from './../albums/albumsSlice';
const Nav = lazy(() => import('../nav/Nav'));
const PhotoInfo = lazy(() => import('../photoInfo/PhotoInfo'));

export default function Photos() {
  const dispatch = useAppDispatch();
  const photosData : PhotosState = useAppSelector(photos);
  const albumsData : AlbumsState = useAppSelector(albums);

  const { status, allPhotos, album } = photosData;
  const { allAlbums, user } = albumsData;

  const { albumId } = useParams();

  useEffect(() => {
    let currentAlbum = allAlbums.find((album:AlbumState) => album.id === parseInt(albumId || ''))
    dispatch(getPhotosAsync({id: albumId || '', currentAlbum})) // GET Photos API call
  },[dispatch, albumId, allAlbums])
  return (
      status === 'loading' || status === 'failed' ? 
      <div className='mt-16 text-lg font-bold'>{status === 'loading' && 'Loading...'}{status === 'failed' && 'Error from server...'}</div>
      : 
      <div className='p-4'>
        <Nav currentAlbum={album.title} currentUser={user.name} currentUserId={user.id}/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {allPhotos.length > 0 && allPhotos.map((photo: PhotoState) => 
            <PhotoInfo 
              key={photo.id} 
              id={photo.id}
              albumId={photo.albumId}
              thumbnailUrl={photo.thumbnailUrl}
              title={photo.title}
              url={photo.url}
            />)}
        </div>
      </div>
  );
}