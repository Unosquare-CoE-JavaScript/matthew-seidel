import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(
            ctx.json([
                {name: "Chocolate", imagePath: "/images/chocolate.png"},
                {name: "Vanilla", imagePath: "/images/vanilla.png"},
            ])
        )
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(
            ctx.json([
                {name: "Cherries", imagePath: "/images/cherries.png"},
                {name: "Sprinkles", imagePath: "/images/sprinkles.png"},
                {name: "Chocolate Chips", imagePath: "/images/chocolate-chips.png"},
            ])
        )
    }),
    //handle not found
    rest.get("**", (req, res, ctx) => {
        return res(
            ctx.status(404, "Not found")
        )
    }),
]