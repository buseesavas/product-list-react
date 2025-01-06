import { useState } from 'react';
import './app.css'
import './reset.css'

const data = [
  {
    id: 1,
    title: 'Waffle',
    name: 'Waffle with Berries',
    price: 6.50,
    image: 'waffle-img.svg',
    quantity: 0,
  },
  {
    id: 2,
    title: 'Crème Brûlée',
    name: 'Vanilla Bean Crème Brûlée',
    price: 7.00,
    image: 'vanilla-bean-img.svg',
    quantity: 0,
  },
  {
    id: 3,
    title: 'Macaron',
    name: 'Macaron Mix of Five',
    price: 8.00,
    image: 'macaron-img.svg',
    quantity: 0,
  },
  {
    id: 4,
    title: 'Tiramisu',
    name: 'Classic Tiramisu',
    price: 5.50,
    image: 'tiramisu-img.svg',
    quantity: 0,
  },
  {
    id: 5,
    title: 'Baklava',
    name: 'Pistachio Baklava',
    price: 4.00,
    image: 'baklava-img.svg',
    quantity: 0,
  },
  {
    id: 6,
    title: 'Pie',
    name: 'Lemon Meringue Pie',
    price: 5.00,
    image: 'lemon-img.svg',
    quantity: 0,
  },
  {
    id: 7,
    title: 'Cake',
    name: 'Red Velvet Cake',
    price: 4.50,
    image: 'red-velvet-img.svg',
    quantity: 0,
  },
  {
    id: 8,
    title: 'Brownie',
    name: 'Salted Caramel Brownie',
    price: 5.50,
    image: 'brownie-img.svg',
    quantity: 0,
  },
  {
    id: 9,
    title: 'Panna Cotta',
    name: 'Vanilla Panna Cotta',
    price: 6.50,
    image: 'panna-cotta-img.svg',
    quantity: 0,
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: 0 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const decrease = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='container'>
      <h1>Desserts</h1>
      <ProductList addToCart={addToCart} removeFromCart={removeFromCart} decrease={decrease}/>
      <Order cart={cart} total={total} removeFromCart={removeFromCart} totalItems={totalItems} decrease={decrease}/>
    </div>
  );
}

function ProductList({ addToCart, removeFromCart, decrease }) {
  return (
    <div className="productList">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          decrease={decrease}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, removeFromCart, addToCart, decrease }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleAddBtn = () => {
    setQuantity(quantity + 1);
    addToCart(product);
  };

  // const handleRemoveBtn = () => {
  //   setQuantity(quantity - 1);
  //   removeFromCart(product.id);
  // };

  const decreaseBtn = () => {
    decrease(product.id);
    setQuantity(quantity - 1);
  }

  return (
    <div className="card">
      <img src={product.image} alt="" className="cardImage" />
      {quantity === 0 ? (
        <button onClick={handleAddBtn} className="addToCartBtn" data-id={product.id}>
          <img src="basket-img.svg" alt="Basket Image" />
          Add to Cart
        </button>
      ) : (
        <div className="productsBtns">
          <button onClick={decreaseBtn} className="removeBtn" data-id={product.id}>
            <img src="minus-icon.svg" alt="Minus Icon" />
          </button>
          <span className="quantityText">{quantity}</span>
          <button onClick={handleAddBtn} className="addBtn" data-id={product.id}>
            <img src="plus-icon.svg" alt="Plus Icon" />
          </button>
        </div>
      )}

      <div className="cardText">
        <p className="cardTitle">{product.title}</p>
        <p className="cardName">{product.name}</p>
        <p className="cardPrice">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

function Order({ cart, total, totalItems, removeFromCart }) {
  return (
    <div className="orderBox">
      <h2>Your cart (<span className="totalCartText">{totalItems}</span>)</h2>
      {cart.length === 0 ? (
        <div className="emptyCart">
          <img src="empty-card-img.svg" alt="" />
          <h5>Your added items will appear here</h5>
        </div>
      ) : (
        <ul className="orders">
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.quantity}x @ ${item.price.toFixed(2)}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="fullBasket">
          <div className="carbonText">
            <p>
              <img src="carbon-tree.svg" alt="Carbon tree" />
              This is a <span>carbon-neutral</span> delivery
            </p>
          </div>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="confirmBtn">Confirm Order</button>
        </div>
      )}
    </div>
  );
}

export default App;