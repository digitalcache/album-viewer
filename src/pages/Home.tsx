import { lazy } from 'react'
const Users = lazy(() => import('./../features/users/Users'));
function Home () {
    return (
      <div>
        <Users />
      </div>
    );
}

export default Home;