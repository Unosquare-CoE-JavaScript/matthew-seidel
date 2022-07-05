// const person: { name: string; age: number } = {

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: Role;
} = {
  name: "Matt",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

let role: [number, string];
role = [2, "admin"];

let favoriteActivities: string[];
favoriteActivities = ["Sports", "Cooking"];

console.log(person);
// console.log(person.nickname); should throw error
