import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import CartItemControl from '../../ui/CartItemControl';
function CartItem({ item }) {
  const { pizzaId, name, quantity, total, unitPrice } = item;

  return (
    <li className="mb-2 flex items-center justify-between gap-5 border-b-2 border-solid border-gray-400/50 py-4">
      <div>
        <p>
          {quantity}&times; {name}
        </p>
        <p>{formatCurrency(unitPrice)}</p>
      </div>
      <div className="flex items-center gap-4">
        <p>{formatCurrency(total)}</p>
        <CartItemControl pizza={item} />
      </div>
    </li>
  );
}

export default CartItem;
