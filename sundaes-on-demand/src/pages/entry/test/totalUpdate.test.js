import {render, screen} from '../../../test-utils/testing-library';
import userEvent from "@testing-library/user-event"
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import { Options } from '../Options';
import { OrderEntry } from '../OrderEntry';



test('should update scope subtotal', async () => { 
    render(<Options optionType="scoops" />);
    //make sure total starts out at 0
    const scoopSubtotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopSubtotal).toHaveTextContent('$0.00');
    
    //update vanilla scope to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: /vanilla/i});
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');

    //update chocolate scope to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name: /chocolate/i});
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(scoopSubtotal).toHaveTextContent('6.00');
 })

test('should update scope subtotal', async () => {
    render (<Options optionType="toppings" />, {wrapper: OrderDetailsProvider });
    //make sure total starts out at 0
    const toppingSubtotal = screen.getByText('Toppings total: $', {exact: false});
    expect(toppingSubtotal).toHaveTextContent('$0.00');

    //update Cherries&Ms scope to 1 and check subtotal
    const mmsInput = await screen.findByRole('spinbutton', {name: /Cherries/i});
    await userEvent.clear(mmsInput);
    await userEvent.type(mmsInput, '1');
    expect(toppingSubtotal).toHaveTextContent('1.50');

    //update Gummi bears scope to 2 and check subtotal
    const gummiInput = await screen.findByRole('spinbutton', {name: /Chocolate Chips/i});
    await userEvent.clear(gummiInput);
    await userEvent.type(gummiInput, '2');
    expect(toppingSubtotal).toHaveTextContent('4.50');
})

describe('grand total', () => { 
    test('grand total start at $0.00', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByTestId('grand-total');
        expect(grandTotal).toHaveTextContent('$0.00');
        
    })
    test('should grand total updates if scoop is added first', async () => { 
        render(<OrderEntry />);
        const grandTotal = screen.getByTestId('grand-total');

        const vanillaInput = await screen.findByRole('spinbutton', {name: /vanilla/i});
        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('$4.00');
     })
    test('should grand total updates if topping is added first', async () => { 
        render(<OrderEntry />);
        const grandTotal = screen.getByTestId('grand-total');

        const cherriesInput = await screen.findByRole('spinbutton', {name: /Cherries/i});
        await userEvent.clear(cherriesInput);
        await userEvent.type(cherriesInput, '2');

        expect(grandTotal).toHaveTextContent('$3.00');
     })
})