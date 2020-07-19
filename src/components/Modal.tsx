import React from "react";
import { MdClose } from "react-icons/md";

interface Props {
  id: string;
  onClick: () => void;
}

const Modal = ({ id, onClick }: Props) => {
  return (
    <div
      className="absolute top-0 left-0 bg-black bg-opacity-75 w-full h-full z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(3px)" }}
      onClick={onClick}
    >
      <div className="embed-responsive aspect-ratio-21/9 w-4/5 lg:w-11/12">
        <iframe
          title={id}
          src={`${process.env.REACT_APP_YOUTUBE_URL}${id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="embed-responsive-item pin"
        />
      </div>
      <MdClose className="absolute top-0 right-0 w-8 h-8 m-2 cursor-pointer transform transition-transform duration-150 ease-in hover:scale-110" onClick={onClick} />
    </div>
  );
};

export default Modal;
