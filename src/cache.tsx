import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        likes: {
          merge(_, incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
    Post: {
      fields: {
        replies: {
          merge(_, incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
    Query: {
      fields: {
        userProducts: {
          merge(_, incoming: any[]) {
            return [...incoming];
          },
        },
        products: {
          merge(_, incoming: any[]) {
            return [...incoming];
          },
        },
        posts: {
          merge(_, incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
  },
});
