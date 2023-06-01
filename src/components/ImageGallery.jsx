import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/all"
import { ThemeContext } from "../context/Theme";

export default function ImageGallery({ imgUrls }) {
    // States
    const [imageToShow, setImageToShow] = useState("");
    const [lightboxDisplay, setLightBoxDisplay] = useState(false);
    
    // Context
    const theme = useContext(ThemeContext)

    let style = imgUrls.length === 1 ? "w-full" : "overflow-hidden rounded-lg h-52"
    
    //looping through our images array to create img elements
    const imageCards = imgUrls.map((image) => (
        <div  key={image} className={style}>
            <img onClick={() => showImage(image)} src={image} className="rounded-lg" alt="" />
        </div>
    ));

    //function to show a specific image in the lightbox, amd make lightbox visible
    const showImage = (image) => {
        setImageToShow(image);
        setLightBoxDisplay(true);
    };

    //hide lightbox
    const hideLightBox = () => {
        setLightBoxDisplay(false)
    };

    //show next image in lightbox
    const showNext = (e) => {
        e.stopPropagation();
        let currentIndex = imgUrls.indexOf(imageToShow);
        if (currentIndex >= imgUrls.length - 1) {
            setLightBoxDisplay(false);
        } else {
            let nextImage = imgUrls[currentIndex + 1];
            setImageToShow(nextImage);
        }
    };

    //show previous image in lightbox
    const showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = imgUrls.indexOf(imageToShow);
        if (currentIndex <= 0) {
            setLightBoxDisplay(false);
        } else {
            let nextImage = imgUrls[currentIndex - 1];
            setImageToShow(nextImage);
        }
    };
    

    return (
    <>
        {imageCards}
        {
            lightboxDisplay ? 
            <div className='px-10 light-box' onClick={hideLightBox}>
                {imgUrls.length > 1 && <button onClick={showPrev}><BsArrowLeftSquareFill className={`text-3xl ${theme.color}`} /></button>}
                <img id="lightbox-img" className='object-contain' src={imageToShow}></img>
                {imgUrls.length > 1 && <button onClick={showNext}><BsArrowRightSquareFill className={`text-3xl ${theme.color}`} /></button>}
            </div>
            : ""
        }
    </>
    );
}

ImageGallery.propTypes = {
    imgUrls: PropTypes.array.isRequired
}
