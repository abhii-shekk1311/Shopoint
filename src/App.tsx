import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./components/Pages/NotFound";
import ProductDetails from "./components/Pages/ProductDetails";
import ProductListing from "./components/Pages/ProductListing";
import Header from "./components/UI/Header";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <Header onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)} />
      <Routes>
        <Route
          path="/"
          element={<ProductListing isSidebarOpen={isSidebarOpen} />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
