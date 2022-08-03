/// <reference types="cypress" />

import faker from "faker"

describe('Create a New Item', () => {
    let productName
    const PRODUCT_EMPTY = "No items to show."
    
    const createProduct = () => {
        productName = faker.commerce.productName()
        cy.get('[data-test="new-item-input"]').type(productName);
        cy.get('[data-test="add-item"]').click();
    }
    beforeEach(() => {
        cy.visit('/jetsetter');
    })
    it('should exist a form', () => {
        cy.get('form').should('exist')
    });
    it('should add a new item', () => {
        createProduct()
        cy.get('[data-test="items-unpacked"]').should('contain', productName)
    });
    it('should filter', () => {
        const filtered = "Tooth Brush"
        cy.get('[data-test="filter-items"]').type(filtered);
        cy.get('[data-test="items-unpacked"]').should('contain', filtered);
    });
    it('should remove all items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-unpacked"]').should('contain', PRODUCT_EMPTY);
        cy.get('[data-test="items-packed"]').should('contain', PRODUCT_EMPTY);
    });
    it('should remove an item', () => {
        cy.get('[data-test="items-unpacked"]').should('contain', 'Tooth Brush');
        cy.get('[data-test="items-unpacked"] > ul.s-vF8tIk32PFgu > :nth-child(1) > [data-test="remove"]').click();
        cy.get('[data-test="items-unpacked"]').should('not.contain', 'Tooth Brush');
    });
    it('should unpack all items', () => {
        cy.get('[data-test="items-packed"]').should('contain', 'Hoodie');
        cy.get('[data-test="mark-all-as-unpacked"]').click();
        cy.get('[data-test="items-packed"]').should('contain', PRODUCT_EMPTY);
    });
    it('should pack an item', () => {
        cy.get('[data-test="items-unpacked"]').should('contain', 'Tooth Brush');
        cy.get('[data-test="items-unpacked"] > ul.s-vF8tIk32PFgu > :nth-child(1) > label.s-vF8tIk32PFgu').click();
        cy.get('[data-test="items-packed"]').should('contain', 'Tooth Brush');
        cy.get('[data-test="items-unpacked"]').should('not.contain', 'Tooth Brush');
    })
});
