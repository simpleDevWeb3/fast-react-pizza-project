import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import SecondaryButton from '../../ui/SecondaryButton';
import { clearCart } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
function Cart() {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { name } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function handleClear() {
    dispatch(clearCart());
  }
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {cart.length === 0 ? (
        <p>Your cart is still empty. Start adding some pizzas :)</p>
      ) : (
        <>
          <h2 className="font-bold">
            Your cart, <span className="uppercase">{name}</span>{' '}
          </h2>
          <ul className="my-4">
            {cart.map((item) => (
              <CartItem item={item} />
            ))}
          </ul>
          <div className="flex gap-4">
            <Button to="/order/new">
              Order pizzas {formatCurrency(totalPrice)}
            </Button>
            <SecondaryButton action={handleClear}>Clear Cart</SecondaryButton>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
