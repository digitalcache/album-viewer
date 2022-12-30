import { Link } from "react-router-dom";
import { AlbumState } from "../albums/albumsSlice";

export default function AlbumInfo(props: AlbumState) {
  return (
    <Link to={`/album/${props.id}`} >  {/* Redirect to album to display all the photos */}
        <div className="max-w-sm rounded overflow-hidden shadow h-full bg-blue-500" data-testid={`album-${props.id}`}>
            <div className="px-6 py-4">
                <div className="font-bold text-white">{props.title}</div>
            </div>
        </div>
    </Link>
  )
}
