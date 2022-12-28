import { Link } from "react-router-dom";

export interface NavigationState {
    currentUser?: string;
    currentAlbum?: string;
    currentUserId?: number;
}

export default function Nav(props: NavigationState) {
    return (
        <nav className="flex justify-center mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/">
                        <span className="inline-flex items-center font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-black">
                            All Users
                        </span>
                    </Link>
                </li>
                {(props.currentUser || props.currentAlbum) && <li>
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        <Link to={`/user/${props.currentUserId}`}>
                            <span className="ml-1 font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-black">{props.currentUser}</span>
                        </Link>
                    </div>
                </li>}
                {props.currentAlbum && <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        <span className="ml-1 font-medium text-gray-500 md:ml-2 dark:text-gray-400">{props.currentAlbum}</span>
                    </div>
                </li>}
            </ol>
        </nav>
    )
}
