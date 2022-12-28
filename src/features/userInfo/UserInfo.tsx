import { Link } from "react-router-dom";
import { UserInfoState } from "../users/usersSlice";

export default function UserInfo(props: UserInfoState) {
  return (
    <Link to={`/user/${props.id}`} >
        <div className="max-w-sm rounded overflow-hidden shadow h-full" data-testid={`user-${props.id}`}>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 text-base">
                    {`${props.address.suite}, ${props.address.street}, ${props.address.city}`}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.email}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.phone}</span>
            </div>
        </div>
    </Link>
   
  )
}
