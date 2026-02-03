import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/world-wis" element={<HomePage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<p>cities form</p>} />
            <Route path="cities" element={<p>cities</p>} />
            <Route path="countries" element={<p>countries</p>} />
            <Route path="form" element={<p>form</p>} />
          </Route>
          <Route path="/products" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
