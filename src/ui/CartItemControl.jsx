import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import SmallButton from './SmallButton';
import {
  addCart,
  increment,
  decrement,
  deleteCart,
} from '../features/cart/cartSlice';

function CartItemControl({ pizza }) {
  const dispatch = useDispatch();

  const { id } = pizza;
  const { cart } = useSelector((state) => state.cart);
  const isAdded = cart.some((pizza) => pizza.id === id);
  const { quantity } = cart.find((pizza) => pizza.id === id) ?? 0;

  function handleCart(pizza) {
    return isAdded
      ? dispatch(deleteCart({ id: pizza.id }))
      : dispatch(addCart({ pizza }));
  }

  function handleIncrement(id) {
    if (isAdded) return dispatch(increment({ id }));
  }

  function handleDecrement(id) {
    if (isAdded) return dispatch(decrement({ id }));
  }

  return (
    <div className="gap:5 flex items-center gap-4 text-sm">
      {isAdded && (
        <>
          <SmallButton action={() => handleDecrement(pizza.id)}>-</SmallButton>
          {quantity}
          <SmallButton action={() => handleIncrement(pizza.id)}>+</SmallButton>
        </>
      )}
      <Button action={() => handleCart(pizza)}>
        {isAdded ? 'delete' : 'Add To Cart'}
      </Button>
    </div>
  );
}

export default CartItemControl;
