import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useEffect, useState } from "react";

import HomePage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitesProvider } from "./contexts/CitiesContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <CitesProvider>
        <AuthProvider>
          <BrowserRouter>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CitesProvider>
    </>
  );
}

export default App;
