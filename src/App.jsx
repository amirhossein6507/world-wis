import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import HomePage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import NotFound from "./pages/NotFound";
// import Test from "./pages/Test";

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Test = lazy(() => import("./pages/Homepage"));

// dist/index.html                   0.47 kB │ gzip:   0.30 kB
// dist/assets/icon-C76IL8ru.png    20.20 kB
// dist/assets/bg-CEKSzw8m.jpg     344.58 kB
// dist/assets/index-kxwTEt6Z.css   31.28 kB │ gzip:   5.19 kB
// dist/assets/index-CjXR0klF.js   581.23 kB │ gzip: 171.46 kB

function App() {
  return (
    <>
      <CitesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/world-wis" element={<HomePage />} /> */}
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="products" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="/test" element={<Test />} />
                <Route path="/SpinnerFullPage" element={<SpinnerFullPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CitesProvider>
    </>
  );
}

export default App;
