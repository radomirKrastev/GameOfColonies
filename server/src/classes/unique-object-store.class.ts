export class UniqueObjectStore<T> {
  private items: T[] = [];

  add(additions: T[]): void {
    const itemsAsString = this.items.map(item => JSON.stringify(item));

    additions.forEach((addition) => {
      const additionAsString = JSON.stringify(addition);
      if (!itemsAsString.includes(additionAsString)) {
        this.items.push(addition);
      }
    });
  }

  getAll(): T[] {
    return this.items;
  }
}