import stylesCard from "./Card.module.scss";
import React from "react";
import ContentLoader from "react-content-loader";

function Card({ onPlus, onFav, favorited = false, item, isInCard, loading }) {
  const { id, title, price, imgUrl } = item;

  const [isFav, setIsFav] = React.useState(favorited);

  const onClickPlus = () => {
    if (!isInCard) {
      onPlus(item);
    } else {
      console.log("broken");
    }
  };

  const onClickFav = () => {
    onFav({ id, title, price, imgUrl });
    setIsFav(!isFav);
  };
  return (
    <div className={stylesCard.card}>
      {loading ? (
        <ContentLoader
         
          speed={1}
          width={168}
          height={195}
          viewBox="0 0 168 187"
          backgroundColor="#f5f5f5"
          foregroundColor="#71a0c8"
          // {...props}
        >
          <rect x="0" y="0" rx="10" ry="10" width="168" height="91" />
          <rect x="0" y="107" rx="3" ry="3" width="168" height="15" />
          <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
          <rect x="136" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={stylesCard.fav}>
            <img
              onClick={onClickFav}
              src={isFav ? "/React-img/likeon.svg" : "/React-img/likeoff.png"}
              alt="FavIcon"
            />
          </div>

          <img className="cartImgs ml-15" src={imgUrl} alt="Sneakers" />

          <p>{title}</p>

          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} сум</b>
            </div>

            <img
              className={stylesCard.plus}
              onClick={onClickPlus}
              src={isInCard ? "/React-img/pluson.svg" : "/React-img/plus.svg"}
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
