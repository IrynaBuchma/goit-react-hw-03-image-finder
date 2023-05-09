import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ images }) {
    return (
        <div>
            <ul className={css.imageGallery}>
                {images.map(image => (
                <ImageGalleryItem key={image.id} image={image}></ImageGalleryItem>))}
            </ul>
        </div>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
}