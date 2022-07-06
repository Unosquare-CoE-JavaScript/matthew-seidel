function merge<T extends object, R extends object>(obj1: T, obj2: R): T & R {
  return Object.assign(obj1, obj2);
}

// console.log(merge({ name: 'Max' }, { age: 30 }));

const merged = merge({ name: "Max" }, { age: 30 });
console.log(merged.age);

interface Lengthy {
  length: number;
}

function countAndPrint<T extends Lengthy>(data: T): [T, string] {
  let description: string = "No data";
  if (data.length > 1) {
    description = `got ${data.length} items`;
  }
  return [data, description];
}

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  keys: U
) {
  return obj[keys];
}

console.log(countAndPrint(["Max", "Anna"]));

console.log(extractAndConvert({ name: "Max", lastName: "Seidel" }, "name"));

class DataStorage<T extends string | number | boolean> {
  private data: Array<T> = [];
  /**
   * check the index of the item
   * @param item - item to check
   * @returns number - index of the item. -1 if not found
   */
  #getIndex(item: T): number {
    return this.data.indexOf(item);
  }
  /**
   * check if the item exists
   * @param item - item to check
   * @returns void | never - throws error if item does not exist
   */
  #itemExists(item: T): void | never {
    if (this.#getIndex(item) === -1) throw new Error("Item does not exists");
  }
  /**
   * check if the item does not exist
   * @param item - item to check
   * @returns void | never - throws error if item exists
   */
  #itemDoesNotExist(item: T): void | never {
    if (this.#getIndex(item) !== -1) throw new Error("Item already exist");
  }
  /**
   * add item to the data storage
   * @param item - item to add
   * @returns void | never - throws error if item already exists
   */
  addItem(item: T): void | never {
    this.#itemDoesNotExist(item);
    this.data.push(item);
  }
  /**
   * remove item from the data storage
   * @param item - item to remove
   * @returns void | never - throws error if item does not exist
   */
  removeItem(item: T): void | never {
    const index = this.#getIndex(item);
    this.#itemExists(item);
    this.data.splice(index, 1);
  }
  /**
   * get item from the data storage
   * @returns Array<T> - returns the data storage
   */
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Anna");
console.log(textStorage.getItems());
textStorage.removeItem("Max");
console.log(textStorage.getItems());

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: "Max" });
// objectStorage.addItem({ name: "Anna" });
// console.log(objectStorage.getItems());
// objectStorage.removeItem({ name: "Max" });

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}
function createCourseGoal({
  title,
  description,
  completeUntil,
}: Partial<CourseGoal>): Partial<CourseGoal> {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;
  return courseGoal;
}

createCourseGoal({ title: "Master JS" });
