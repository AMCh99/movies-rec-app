import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./PAGES/Home";
import MyList from "./PAGES/MyList";
import SearchMovie from "./PAGES/SearchMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="MyList" element={<MyList />} />
          <Route exact path="SearchMovie" element={<SearchMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
