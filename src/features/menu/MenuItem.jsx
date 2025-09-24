import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import CartItemControl from '../../ui/CartItemControl';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  return (
    <li className="my-10 flex gap-2 border-b-2 border-solid border-stone-400/50 pb-2 md:gap-4">
      <img
        className={`h-[60px] md:h-28 ${soldOut ? 'brightness-75 grayscale' : ' '} `}
        src={imageUrl}
        alt={name}
      />
      <div className="flex w-full flex-col justify-between text-xs md:text-xl">
        <div>
          <p>{name}</p>
          <p>{ingredients.join(', ')}</p>
        </div>

        <div className="flex items-center justify-between">
          {!soldOut ? (
            <>
              <p>{formatCurrency(unitPrice)}</p>
              <CartItemControl pizza={pizza} />
            </>
          ) : (
            <p>Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
