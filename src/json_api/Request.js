import Utils from '../Utils';
import Response from './Response';
import Filter from '../url/Fragment/Filter';
import Include from '../url/Fragment/Include';
import Url from '../url/Url';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

export default class {
  /**
   * Creates a new request.
   */
  constructor(model) {
    this.model = model;
  }

  /*
   * Gets the axios instance.
   */
  get axios() {
    if (!this.model.axios) {
      return Utils.error('The axios instance is not registered. Please register the axios instance to the model.');
    }
    return this.model.axios;
  }

  /**
   * Performs an HTTP `GET`.
   */
  get(url, config = {}) {
    url = new Include(new Filter(new Url(url, config))).stringify();

    return this.request({
      ...this.model.globalJsonApiConfig,
      ...this.model.jsonApiConfig,
      method: 'get', url,
      ...config,
    });
  }

  /**
   * Performs an HTTP `POST`.
   */
  post(url, data = {}, config = {}) {
    url = new Url(url, config).stringify();

    return this.request({
      ...this.model.globalJsonApiConfig,
      ...this.model.jsonApiConfig,
      method: 'post', url, data,
      ...config,
    });
  }

  /**
   * Performs an HTTP `PUT`.
   */
  put(url, data = {}, config = {}) {
    url = new Url(url, config).stringify();

    return this.request({
      ...this.model.globalJsonApiConfig,
      ...this.model.jsonApiConfig,
      method: 'put', url, data,
      ...config,
    });
  }

  /**
   * Performs an HTTP `PATCH`.
   */
  patch(url, data = {}, config = {}) {
    url = new Url(url, config).stringify();

    return this.request({
      ...this.model.globalJsonApiConfig,
      ...this.model.jsonApiConfig,
      method: 'patch', url, data,
      ...config,
    });
  }

  /**
   * Performs an HTTP `DELETE`.
   */
  delete(url, config = {}) {
    url = new Url(url, config).stringify();

    return this.request({
      ...this.model.globalJsonApiConfig,
      ...this.model.jsonApiConfig,
      method: 'delete', url,
      ...config,
    });
  }

  /**
   * Performs data serialization
   */
  serialize(data = {}) {
    var test = new JSONAPISerializer(this.model.entity, {
      attributes: Object.keys(data),
      keyForAttribute: 'underscore_case',
      pluralizeType: false,
    }).serialize(data);
    return test;
  }

  /**
   * Performs an API request: Awaits an axios request, gets the axios response, and awaits the database commit.
   */
  async request(config) {
    return await new Response(this.model, await this.axios.request(config), config).commit();
  }
}
