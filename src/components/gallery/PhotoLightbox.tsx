import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { IPhoto } from "@/types/types";
import { getPreviewUrl, getThumbnailUrl } from "@/services/cloudinaryService";

interface Props {
	photos: IPhoto[];
	index: number;
	isOpen: boolean;
	onClose: () => void;
}

export const PhotoLightbox = ({ photos, index, isOpen, onClose }: Props) => {
	const slides = photos.map((p) => ({
		src: getPreviewUrl(p.publicId),
		thumbnail: getThumbnailUrl(p.publicId),
	}));

	return (
		<Lightbox
			open={isOpen}
			close={onClose}
			index={index}
			slides={slides}
			plugins={[Thumbnails, Zoom]}
			animation={{ fade: 300 }}
			carousel={{ finite: false }}
			styles={{
				container: { backgroundColor: "rgba(0, 0, 0, .9)" }
			}}
		/>
	);
};