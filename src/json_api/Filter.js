export default class {
  /**
   * Creates a new filter with an object of properties
   */
  constructor(filter) {
    this.filter = filter;
  }

  /**
   * Build jsonApi filters
   */
  stringify() {
    let filter = '';
    for (const [key, value] of Object.entries(this.filter)) {
      filter += `filter[${key}]=${value}`;
    }
    return filter;
  }
}
