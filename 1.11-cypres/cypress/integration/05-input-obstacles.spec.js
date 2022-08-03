/// <reference types="cypress" />

import faker from "faker";

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select('Thor');
    cy.get('[data-test="select-result"]').should('contain', 'Thor');
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-result"]').contains('(None)');
    cy.get('[data-test="checkbox-tomato"]').click();
    cy.get('[data-test="checkbox-result"]').contains('Tomato');
  });

  it('should find and control a radio input', () => {   
    cy.get('[data-test="radio-ringo"]').click();
    cy.get('[data-test="radio-result"]').should('contain', 'Ringo');
  });

  it('should find and control a color input', () => {
    const color = faker.internet.color();
    cy.get('[data-test="color-input"]').invoke('val', color).trigger('input');
    cy.get('[data-test="color-result"]').contains(color);
  });

  it('should find and control a date input', () => {
    const date = faker.date.future();
    const dateString = date.toISOString().split('T')[0];
    cy.get('[data-test="date-input"]').invoke('val', dateString).trigger('input');
    cy.get('[data-test="date-result"]').contains(dateString);
  });

  it('should find and control a range input', () => {
    const number = faker.random.number({
      min: 0,
      max: 10
    });
    cy.get('[data-test="range-input"]').invoke('val', number).trigger('input');
    cy.get('[data-test="range-result"]').contains(number);
  });

  it('should find and control a file input', () => {
    const fileName = faker.system.fileName();
    cy.get('[data-test="file-input"]').invoke('val', 'test.txt').trigger('input');
    cy.get('[data-test="file-result"]').contains('test.txt');
  });
});
