import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation, useParams } from 'react-router-dom';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';
  const { cart } = useSelector((state) => state.cart);
  console.log(navigation);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="scrollbar-hidden overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      {cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
