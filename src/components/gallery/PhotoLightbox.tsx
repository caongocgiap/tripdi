import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { IPhoto } from "@/types/types";

interface Props {
	photos: IPhoto[];
	index: number;
	isOpen: boolean;
	onClose: () => void;
}

export const PhotoLightbox = ({ photos, index, isOpen, onClose }: Props) => {
	const slides = photos.map((p) => ({ src: p.url.replace('/upload/', '/upload/f_auto,q_auto/') }));

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