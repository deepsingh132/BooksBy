import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useMemo} from "react";
import { removeAllProducts } from "./redux/cartRedux";
import "./components/Styles/app.css";
import LoadingOverlay from "./components/SpinnerOverlay";
import { loginFailure } from "./redux/userRedux";

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));
const Success = lazy(() => import("./pages/Success"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Institute = lazy(() => import("./pages/Institute"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PasswordRecover = lazy(() => import("./pages/PasswordRecover"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const localUser = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = useMemo(() => {
    return user && JSON.parse(localUser).currentUser;
  }, [user, localUser]);
  const token = currentUser?.token;
  const quantity = useSelector((state) => state.cart.quantity);
  const error = useSelector((state) => state.cart.error);
  const isFetching = useSelector((state) => state.cart.isFetching);
  const dispatch = useDispatch();

  if (!user && quantity > 0) {
    dispatch(removeAllProducts());
  }

  useMemo(() => {
    if (error && isFetching) {
      dispatch(loginFailure());
    }
  }, [error, isFetching, dispatch]);
  return (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/products"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <ProductList />
                </Suspense>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <Product user={user} token={token} />
                </Suspense>
              }
            />
            <Route
              path="/institute/:id"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <Institute />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<LoadingOverlay apiCall={true}/>}>
                  <Cart user={user} token={token} />
                </Suspense>
              }
            />
            <Route
              path="/order_details"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <OrderDetails token={token} />
                </Suspense>
              }
            />
            <Route
              path="/success"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <Success />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  {user ? <Navigate to="/" /> : <Login />}
                </Suspense>
              }
            />
            <Route
              path="/logout"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  {user ? <Navigate to="/" /> : <Register />}
                </Suspense>
              }
              />
              <Route
                path="/recover_password"
                element={
                  <Suspense fallback={<LoadingOverlay />}>
                    <PasswordRecover />
                  </Suspense>
                }
              />
              <Route
                path="/reset_password"
                element={
                  <Suspense fallback={<LoadingOverlay />}>
                    <PasswordReset />
                  </Suspense>
                }
              />
            <Route
              path="/*" // Catch all other routes
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
  );
};

export default App;
