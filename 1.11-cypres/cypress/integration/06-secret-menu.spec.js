/// <reference types="cypress" />

import faker from "faker";

const restaurants = [
  "Chick-fil-A",
  "McDonalds",
  "In-N-Out",
  "KFC",
  "Jack In The Box",
  "Jamba Juice",
  "Starbucks",
  "Dairy Queen",
  "Burger King",
  "Chipotle",
  "Taco Bell",
  "Five Guys",
  "Sonic",
  "Subway",
  "Panera Bread",
];

const properties = [
  "name",
  "whereToOrder",
  "description",
  "secret",
  "ingredients",
  "popularity",
  "price",
  "howToOrder",
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe("Secret Menu Items", () => {
  beforeEach(() => {
    cy.visit("/secret-menu");
  });

  it("should exist have the title on the page", () => {
    cy.get("h1").should("contain", "Secret Menu Items");
  });

  properties.forEach((property) => {
    it(`should have a restaurant called ${property}`, () => {
      cy.get(`#${property}-column`);
    });
    it("should hide column if unchecked", () => {
      cy.get(`#show-${property}`).click();
      cy.get(`#${property}-column`).should("not.be.visible");
    });
  });
  restaurants.forEach((restaurant) => {
    it(`should display only ${restaurant} if is selected`, () => {
      cy.get("#restaurant-visibility-filter").select(restaurant);
      cy.get(".whereToOrder").should("contain", restaurant);
    });
  });
  const randomNumber = faker.random.number({
    min: 1,
    max: 10,
  });
  for (let index = 0; index < randomNumber; index++) {
    let number = faker.random.number({
      min: 1,
      max: 7,
    });
    it(`should display ${number} star rating`, () => {
      cy.get("#minimum-rating-visibility").invoke("val", number).trigger("input");
      cy.get('td[headers="popularity-column"]').each(($el) => {
        expect(+$el.text()).to.be.gte(number);
      });
    });
  }
});
