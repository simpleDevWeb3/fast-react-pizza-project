// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder, updateOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearCart } from '../cart/cartSlice';
import Button from '../../ui/Button';
function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const dispatch = useDispatch();
  const fetcher = useFetcher();

  function updatePriority() {
    fetcher.submit(
      {
        priority: true,
      },
      { method: 'post' },
    );
  }

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  
  return (
    <div className="mx-10 my-10 flex flex-col justify-center gap-4">
      <div className="flex items-center justify-between gap-10">
        <h2 className="font-bold"> Order status {id}</h2>

        <div className="flex gap-4 text-sm font-semibold text-stone-50">
          {priority && (
            <span className="rounded-full border bg-red-400 px-4 py-1">
              Priority
            </span>
          )}
          <span className="rounded-full border bg-green-400 px-4 py-1">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex justify-between bg-stone-400/40 px-4 py-4">
        <p className="font-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="px-4">
        <p className="border-non grid grid-cols-[1fr_70px_70px] border-b-2 font-semibold">
          <span>Item Details</span>
          <span>unit</span>
          <span>Total</span>
        </p>
        {cart.map((item) => (
          <li className="my-1 grid grid-cols-[1fr_70px_70px] items-center">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span className="text-sm">{formatCurrency(item.unitPrice)}</span>
            <span className="font-bold">
              {formatCurrency(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="bg-stone-400/40 px-4 py-4 text-right">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <span>
        {!priority && (
          <Button
            action={updatePriority}
            disabled={fetcher.state === 'submitting'}
          >
            {fetcher.state === 'submitting' ? 'Updating...' : 'Make Priority'}
          </Button>
        )}
      </span>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const priority = data.priority === 'true';

  await updateOrder(params.orderId, { priority });

  return { success: true, priority };
}

export default Order;
