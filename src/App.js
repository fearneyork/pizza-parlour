import { useState } from 'react';
import basketImage from "./assets/shopping_basket_white.svg";
import likesImage from "./assets/thumb_up_white.svg";

const emptyBasket = {
  "Can't Cook Won't Cluck!(VE)": 0,
  "Gieseppe's Not Sloppy, He's Vegan (VE)": 0,
  "Nacho Libre (V)": 0,
  "Mock Duck (VE)": 0,
};

const App = () => {
  const pizzas = [
    {
      name: "Can't Cook Won't Cluck!(VE)",
      imageUrl:
        'https://pbs.twimg.com/media/EDXhBX3XkAAOaEo.jpg',
    },
    {
      name: "Gieseppe's Not Sloppy, He's Vegan (VE)",
      imageUrl:
        'https://ilovemanchester.com/wp-content/uploads/2019/05/Crazy-Pedro-%E2%80%9CGIUSEPPE%E2%80%99S-NOT-SLOPPY-HE%E2%80%99S-VEGAN%E2%80%9D-OCTOBER-SPECIAL-.jpg',
    },
    {
      name: "Nacho Libre (V)",
      imageUrl:
        'https://pbs.twimg.com/media/CVuSmXJUEAA85fP.jpg:large',
    },
    {
      name: "Mock Duck (VE)",
      imageUrl: 'https://youmedia-cdn.leeds-list.com/wp-content/uploads/2019/08/17151231/vegan-dough-boys-june-19-no-credit-1-800x450.jpg',
    },
  ];
  
  const [likeCount, setLikeCount] = useState(0);
  const [basket, setBasket] = useState(emptyBasket);
  const [isConfirmed, setIsConfirmed] = useState(false)

  function increaseLikes() {
    setLikeCount((currLikeCount) => {
      return currLikeCount + 1;
    })
  }

  function addToBasket(itemToAdd) {
    setBasket((currBasket) => {
      const newBasket = {...currBasket}
      newBasket[itemToAdd]++;
      return newBasket;
    })
  }

  function removeFromBasket(itemToRemove) {
    setBasket((currBasket) => {
      const newBasket = {...currBasket}
      newBasket[itemToRemove]--;
      return newBasket;
    })
  }

  function clearBasket() {
    setBasket(emptyBasket)
  }

  function confirmationMessage() {
    setIsConfirmed(true);
  }

  return (
    <>
      <Header basket={basket}>
        <Likes likeCount={likeCount} increaseLikes={increaseLikes} />
      </Header>
      <Menu isConfirmed={isConfirmed} pizzas={pizzas} addToBasket={addToBasket} removeFromBasket={removeFromBasket} basket={basket} />
      <Basket isConfirmed={isConfirmed} basket={basket} clearBasket={clearBasket}/>
      <br></br>
      <Confirmation isConfirmed={isConfirmed} confirmationMessage={confirmationMessage} />
    </>
  );
};

const Header = ({basket, children}) => {
  return (
    <header>
      {children}
      <h1><em>HY Part-Time Pizza Parlour</em></h1>
      <button className="basket-button">
        <img src={basketImage} alt="basket icon"></img>
        <p>{Object.values(basket).reduce((a, b) => a + b)}</p>
      </button>
    </header>
  )
}

const Likes = ({likeCount, increaseLikes}) => {
  return(
  <section className="likes">
    <button className="likes-button" onClick={increaseLikes}>
      <img src={likesImage} alt="likes icon"></img>
      <p>{likeCount}</p>
    </button>
  </section>
  )
}

const Menu = ({isConfirmed, pizzas, addToBasket, removeFromBasket, basket}) => {
  return(
    <ul className="menu-list">
        {pizzas.map((pizza) => {
          return (
            <li key={pizza.name} className="menu-item">
              <img
                src={pizza.imageUrl}
                alt={pizza.name}
                className="menu-img"
              ></img>
              <p className="pizza-name">{pizza.name}</p>
              <div className="button-container">
                <button className="add-button" onClick={() => addToBasket(pizza.name)} disabled={isConfirmed}>+1 to Basket</button>
                <button className="remove-button" onClick={() => removeFromBasket(pizza.name)} disabled={basket[pizza.name] >= 1 && !isConfirmed ? false: true} >-1 from Basket</button>
              </div>
            </li>
          );
        })}
      </ul>
  );
}

const Basket = ({isConfirmed, basket, clearBasket}) => {
  return(
    <section>
      <ul className="basket-list">
          {Object.keys(basket).map((item) => {
            return (
              <li key={item} className="basket-item">
                  {item} Qty: {basket[item]}
              </li>
            )
          })}
      </ul>
      <p> Total Pizzas in basket: {Object.values(basket).reduce((a, b) => a + b)} </p>
      <button className="remove-button" onClick={clearBasket} disabled={isConfirmed}>Clear Basket</button>
    </section>
  );
}

const Confirmation = ({isConfirmed, confirmationMessage}) => {
  return(
    <section>
      <button className="add-button" onClick={confirmationMessage} disabled={isConfirmed}>Confirmation</button>
    </section>
  );
}

export default App;
