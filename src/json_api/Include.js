export default class {
  /**
   * Creates a new include with an array of strings
   */
  constructor(include) {
    this.include = include;
  }

  /**
   * Build jsonApi include
   */
  stringify() {
    return this.include.join(',');
  }
}
