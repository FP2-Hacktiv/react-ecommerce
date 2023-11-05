import PropTypes from "prop-types";

const ProductImage = ({ imageSrc, altText }) => {
  return (
    <div className="w-1/2 border border-slate-400 rounded-xl p-4 mr-6">
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

ProductImage.propTypes = {
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
};

export default ProductImage;
