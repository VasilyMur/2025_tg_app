import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
// import ProductList from "./components/ProductList/ProductList";
import Calendar from "./components/Calendar";
import Form from "./components/Form/Form";

function App() {
  const  { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Calendar />}/>
        <Route path={'form'} element={<Form />}/>
      </Routes>
    </div>
  )
}

export default App;