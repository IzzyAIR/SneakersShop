import Card from "../components/Card/Card";
import React from "react";
import AppContext from "../context";

function Favorites() {
  const {favorite, onAddToFavorite} = React.useContext(AppContext);




  return (
    <div className="main content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="cardBlock">
        {favorite.map((item) => (
          <Card
            {...item}
            favorited={true}
            key={item.id}
            item={item}
            onFav={(obj) => {
              onAddToFavorite(obj);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
/* {items.map((item, index) => 
    <Card key={item.id} 
        favorited= {true}
        onFav ={onAddToFavorite}
        {...item}
        // title={item.title}
        // price={item.price}
        // imgUrl={item.imgUrl}
        // id={item.id}
    />
)} */
