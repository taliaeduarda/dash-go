import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import faker from 'faker'

type Product = {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      product: Model.extend<Partial<Product>>({})
    },

    factories: {
      product: Factory.extend({
        name(i: number) {
          return `Product ${i + 1}`
        },
        provider() {
          return faker.company.companyName();
        },
        code() {
          return faker.datatype.number();
        },
        category() {
          return faker.commerce.productMaterial();
        },
        price() {
          return faker.commerce.price();
        },
        amount() {
          return faker.datatype.number();
        },
        createdAt() {
          return faker.date.recent();
        },
      })
    },

    seeds(server) {
      server.createList('product', 200)
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/products', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('product').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const products = this.serialize(schema.all('product'))
          .products
          .sort((a, b) => a.createdAt - b.createdAt)
          .slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { products }
        )
      });

      // this.get('/products/:id');
      this.post('/products');

      this.namespace = '';
      this.passthrough()
    }
  })

  return server;
}