class ProductsAPI {
  constructor(request) {
    this.request = request;
    this.base = '/products';
  }

  async list() {
    return this.request.get(this.base);
  }

  async add(data) {
    return this.request.post(`${this.base}/add`, { data });
  }

  async update(id, data) {
    return this.request.put(`${this.base}/${id}`, { data });
  }

  async remove(id) {
    return this.request.delete(`${this.base}/${id}`);
  }
}

module.exports = { ProductsAPI };