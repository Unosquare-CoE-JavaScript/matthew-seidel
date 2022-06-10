import {render, screen} from '../../../test-utils/testing-library';

import { Options } from '../Options';

test('should display image for each scoop option from server', async () => { 
    render(<Options optionType="scoops" />);
    //find images
    const scoopImages = await screen.findAllByRole('img', {name: /scoop/i});
    expect(scoopImages.length).toBe(2);

    //confirm alt text of images
    const altText = scoopImages.map(image => image.getAttribute('alt'));
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
 })

 test('should display image for each topping option from server', async () => {
    render(<Options optionType="toppings" />);
    //find images
    const toppingImages = await screen.findAllByRole('img', {name: /topping/i});
    expect(toppingImages.length).toBe(3);

    //confirm alt text of images
    const altText = toppingImages.map(image => image.getAttribute('alt'));
    expect(altText).toEqual(['Cherries topping', 'Sprinkles topping', 'Chocolate Chips topping']);
 })

 test('should display an error alert if server returns an error', async () => {
    render(<Options optionType="tooping" />);
    //find images
    const errorAlert = await screen.findAllByRole('alert');
    expect(errorAlert).toHaveLength(1);
 })