import { useEffect, lazy } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    users,
    getUsersAsync,
    UserInfoState,
    UserState
} from './usersSlice';
const Nav = lazy(() => import('../nav/Nav'));
const UserInfo = lazy(() => import('../userInfo/UserInfo'));

export default function Users() {
  const dispatch = useAppDispatch();
  const usersData : UserState = useAppSelector(users);
  const { status, allUsers } = usersData

  useEffect(() => {
    dispatch(getUsersAsync())  // GET Users API call
  },[])

  return (
      status === 'loading' || status === 'failed' ? 
      <div className='mt-16 text-lg font-bold'>{status === 'loading' && 'Loading...'}{status === 'failed' && 'Error from server...'}</div> 
      : 
      <div className='p-4'>
        <Nav />
        <h3 className='text-2xl font-bold'>Select users to view albums</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {allUsers.length > 0 && allUsers.map((user: UserInfoState) => 
            <UserInfo 
              key={user.id} 
              id={user.id}
              address={user.address}
              name={user.name}
              email={user.email}
              phone={user.phone}
              username={user.username}
            />)}
        </div>
      </div>
  );
}