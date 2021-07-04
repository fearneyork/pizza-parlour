import { useState } from 'react';

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
        'https://cdn.pixabay.com/photo/2017/12/05/20/09/pizza-3000274_1280.jpg',
    },
    {
      name: "Gieseppe's Not Sloppy, He's Vegan (VE)",
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/11/29/13/02/cheese-1869708_1280.jpg',
    },
    {
      name: "Nacho Libre (V)",
      imageUrl:
        'https://cdn.pixabay.com/photo/2020/02/04/12/14/pepperoni-4818019_1280.jpg',
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
    <div className="App">
      <Header />
      <Likes likeCount={likeCount} increaseLikes={increaseLikes} />
      <Menu isConfirmed={isConfirmed} pizzas={pizzas} addToBasket={addToBasket} removeFromBasket={removeFromBasket} basket={basket} />
      <Basket isConfirmed={isConfirmed} basket={basket} clearBasket={clearBasket}/>
      <br></br>
      <Confirmation isConfirmed={isConfirmed} confirmationMessage={confirmationMessage} />
    </div>
  );
};

const Header = () => {
  return <h1>HY Part-Time Pizza Parlour</h1>
}

const Likes = ({likeCount, increaseLikes}) => {
  return(
  <section className="likes">
    <h2>Likes : {likeCount}</h2>
    <button onClick={increaseLikes} >+1 Likes</button>
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
              <p>{pizza.name}</p>
              <button onClick={() => addToBasket(pizza.name)} disabled={isConfirmed}>+1 to Basket</button>
              <br></br>
              <button onClick={() => removeFromBasket(pizza.name)} disabled={basket[pizza.name] >= 1 && !isConfirmed ? false: true} >-1 from Basket</button>
              <br></br>
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
                <ul>
                  {item} Qty: {basket[item]}
                </ul>
              </li>
            )
          })}
      </ul>
      <p> Total Pizzas in basket: {Object.values(basket).reduce((a, b) => a + b)} </p>
      <button onClick={clearBasket} disabled={isConfirmed}>Clear Basket</button>
    </section>
  );
}

const Confirmation = ({isConfirmed, confirmationMessage}) => {
  return(
    <section>
      <button onClick={confirmationMessage} disabled={isConfirmed}>Confirmation</button>
    </section>
  );
}

export default App;
