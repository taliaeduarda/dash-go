import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import faker from 'faker'

type Product = {
    name: string;
    provider: string;
    code: string;
    category: string;
    price: number;
    amount: number;
    created_at: string;
  }

export function makeServer() {
    const server = createServer({
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
              createdAt() {
                return faker.date.recent(10);
              },
              amount() {
                  return faker.datatype.number;
              }
            })
          },
      
          seeds(server) {
            server.createList('product', 20)
          },
        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/products');
            this.post('/products');

            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}