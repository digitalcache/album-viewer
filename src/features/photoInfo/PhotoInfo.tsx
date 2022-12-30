import { LazyLoadImage } from "react-lazy-load-image-component";
import { PhotoState } from "../photos/photosSlice";
import placeholder from "./placeholder.png";

export default function PhotoInfo(props: PhotoState) {
  return (
    <a target="_blank" rel="noreferrer" href={props.url}> {/* Opens the photo in a new tab */}
        <div className="max-w-sm rounded overflow-hidden shadow-lg h-full" data-testid={`photo-${props.id}`}>
            <LazyLoadImage src={props.thumbnailUrl}
                width={'100%'} height="384px" 
                placeholderSrc={placeholder}
                alt={props.title}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl">{props.title}</div>
            </div>
            <div className="px-6 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.url}</span>
            </div>
        </div>
    </a>
    
  )
}
