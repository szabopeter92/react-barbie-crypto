import './App.css';
import Axios from 'axios'
import {useEffect, useState} from 'react'
import Coin from './components/Coin';

function App() {

  const [coinList, setCoinList] = useState([]);
  const [search, setSearch ] = useState("");

  useEffect(()=>{

      Axios.get("https://api.coinstats.app/public/v1/coins")
          .then(res => setCoinList(res.data.coins))

  }, [])


  const searchedCoin = coinList.filter(coin => {

    //Megnézem, hogy a coinListben eltárolt összes kriptovaluta közül van-e egyezés a nevében azzal amit beírtam az input mezőbe
    return coin.name.toLowerCase().includes(search.toLowerCase());
  })


  return (
    <div className="App">
        <div className="crypto-header">
            <h1>Cryptovaluta Kereső</h1>

            <input type="text" placeholder="Bitcoin..." onChange={(e)=> setSearch(e.target.value) }/>
        </div>

        <div className="crypto-container">
            {
              searchedCoin.map(c => {

                return <Coin key={c.name} name={c.name} icon={c.icon} price={c.price} symbol={c.symbol}/>
              })

            }
        </div>
    </div>
  );
}

export default App;
