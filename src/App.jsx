import './app.css'
import './reset.css'

const data = [
  {
    id: 1,
    title: 'Waffle',
    name: 'Waffle with Berries',
    price: 6.50,
    image: 'public/images/waffle-img.svg',
    quantity: 0,
  },
  {
    id: 2,
    title: 'Crème Brûlée',
    name: 'Vanilla Bean Crème Brûlée',
    price: 7.00,
    image: 'public/images/vanilla-bean-img.svg',
    quantity: 0,
  },
  {
    id: 3,
    title: 'Macaron',
    name: 'Macaron Mix of Five',
    price: 8.00,
    image: 'public/images/macaron-img.svg',
    quantity: 0,
  },
  {
    id: 4,
    title: 'Tiramisu',
    name: 'Classic Tiramisu',
    price: 5.50,
    image: 'public/images/tiramisu-img.svg',
    quantity: 0,
  },
  {
    id: 5,
    title: 'Baklava',
    name: 'Pistachio Baklava',
    price: 4.00,
    image: 'public/images/baklava-img.svg',
    quantity: 0,
  },
  {
    id: 6,
    title: 'Pie',
    name: 'Lemon Meringue Pie',
    price: 5.00,
    image: 'public/images/lemon-img.svg',
    quantity: 0,
  },
  {
    id: 7,
    title: 'Cake',
    name: 'Red Velvet Cake',
    price: 4.50,
    image: 'public/images/red-velvet-img.svg',
    quantity: 0,
  },
  {
    id: 8,
    title: 'Brownie',
    name: 'Salted Caramel Brownie',
    price: 5.50,
    image: 'public/images/brownie-img.svg',
    quantity: 0,
  },
  {
    id: 9,
    title: 'Panna Cotta',
    name: 'Vanilla Panna Cotta',
    price: 6.50,
    image: 'public/images/panna-cotta-img.svg',
    quantity: 0,
  },
];

function App() {
  return (
    <div className='container'>
      <h1>Desserts</h1>
      <ProductList/>
    </div>
  )
}

function ProductList() {
  return (
    <div className="productList">
      {
      data.map((x) => (
        <ProductCard key={x.id} name={x.name} title={x.title} price={x.price} imageUrl={x.image}/>
      )) 
      }
    </div>
  )
}

function ProductCard( { name, title, price, imageUrl } ) {
  return (
    <div className="card">
      <div className="imageContainer">
        <img src={imageUrl} alt="" className="cardImage"/>
      </div>
      <div className="cardText">
        <p className="cardTitle">{title}</p>
        <p className="cardName">{name}</p>
        <p className="cardPrice">${price}</p>
      </div>
    </div>
  )
}

export default App
