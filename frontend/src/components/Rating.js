function setRatingStarClass(value, filled, half) {
  if (value >= filled) return "fas fa-star";
  else if (value >= half) return "fas fa-star-half-alt";
  else return "far fa-star";
}

export const Rating = ({ value, text, color }) => (
  <div className="rating">
    <span>
      <i style={{ color }} className={setRatingStarClass(value, 1, 0.5)}></i>
    </span>
    <span>
      <i style={{ color }} className={setRatingStarClass(value, 2, 1.5)}></i>
    </span>
    <span>
      <i style={{ color }} className={setRatingStarClass(value, 3, 2.5)}></i>
    </span>
    <span>
      <i style={{ color }} className={setRatingStarClass(value, 4, 3.5)}></i>
    </span>
    <span>
      <i style={{ color }} className={setRatingStarClass(value, 5, 4.5)}></i>
    </span>
    <span>{text}</span>
  </div>
);

Rating.defaultProps = {
  color: "#f8e825",
};
