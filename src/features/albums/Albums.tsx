import { useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    albums,
    AlbumsState,
    AlbumState,
    getAlbumsAsync
} from './albumsSlice';
import {
  users, UserState
} from './../users/usersSlice';
const Nav = lazy(() => import('../nav/Nav'));
const AlbumInfo = lazy(() => import('../albumInfo/AlbumInfo'));

export default function Albums() {
  const dispatch = useAppDispatch();
  const albumsData : AlbumsState = useAppSelector(albums);
  const usersData : UserState = useAppSelector(users);

  const { status, allAlbums, user } = albumsData;
  const { allUsers } = usersData;

  const { userId } = useParams();

  useEffect(() => {
    let currentUser = allUsers.find((user:any) => user.id === parseInt(userId || ''))
    dispatch(getAlbumsAsync({id: userId || '', currentUser})) // GET Albums API call
  },[dispatch, userId, allUsers])
  return (
      status === 'loading' || status === 'failed' ? 
      <div className='mt-16 text-lg font-bold'>{status === 'loading' && 'Loading...'}{status === 'failed' && 'Error from server...'}</div>
      : 
      <div className='p-4'>
        <Nav currentUser={user.name} currentUserId={user.id} />
        <h3 className='text-2xl font-bold'>Select album to view photos</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {allAlbums.length > 0 && allAlbums.map((album: AlbumState) => 
            <AlbumInfo 
                key={album.id} 
                id={album.id}
                title={album.title}
                userId={album.userId}
            />)}
        </div>
      </div>
  );
}