import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  post: Post;
  posts: Array<Post>;
  searchPosts: Array<Post>;
  product: Product;
  products: Array<Product>;
  userProducts: Array<Product>;
  userFavorites: Array<Product>;
  searchProducts: Array<Product>;
  user: User;
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};


export type QuerySearchPostsArgs = {
  term: Scalars['String'];
};


export type QueryProductArgs = {
  productId: Scalars['String'];
};


export type QueryProductsArgs = {
  first?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
};


export type QueryUserProductsArgs = {
  userId: Scalars['String'];
};


export type QueryUserFavoritesArgs = {
  favoritesList: Array<Scalars['String']>;
};


export type QuerySearchProductsArgs = {
  term: Scalars['String'];
};


export type QueryUserArgs = {
  firebaseId?: Maybe<Scalars['String']>;
  mongoId?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  category: Scalars['String'];
  replies: Array<Reply>;
  creator: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  repliesCount: Scalars['Int'];
};

export type Reply = {
  __typename?: 'Reply';
  _id: Scalars['ID'];
  creator: User;
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  socials: UserSocials;
  likes?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  fullName: Scalars['String'];
};

export type UserSocials = {
  __typename?: 'UserSocials';
  phoneNumber?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
};


export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  price: Scalars['Int'];
  category: Scalars['String'];
  images: Array<Scalars['String']>;
  creator: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Post;
  replyPost: Post;
  deleteReply: Post;
  createProduct: Product;
  addProductImages: Product;
  udpateProduct: Product;
  deleteProduct: Scalars['Boolean'];
  createUser: User;
  updateUser: User;
  likeProduct: User;
  addUserImage: User;
};


export type MutationCreatePostArgs = {
  postInput: PostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationReplyPostArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationDeleteReplyArgs = {
  replyId: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationAddProductImagesArgs = {
  imagesSrc: Array<Scalars['String']>;
  productId: Scalars['String'];
};


export type MutationUdpateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationLikeProductArgs = {
  productId: Scalars['String'];
};


export type MutationAddUserImageArgs = {
  imageSrc: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  category: Scalars['String'];
};

export type CreateProductInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  price: Scalars['String'];
  category: Scalars['String'];
};

export type UpdateProductInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  price: Scalars['String'];
  category: Scalars['String'];
  productId: Scalars['String'];
  images: Array<Scalars['String']>;
};

export type CreateUserInput = {
  firebaseId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type UpdateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
};

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, '_id' | 'title' | 'body'>
);

export type RegularProductFragment = (
  { __typename?: 'Product' }
  & Pick<Product, '_id' | 'title' | 'price' | 'location' | 'images'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'firstName' | 'lastName' | 'fullName' | 'email'>
);

export type AddProductImageMutationVariables = Exact<{
  productId: Scalars['String'];
  imagesSrc: Array<Scalars['String']>;
}>;


export type AddProductImageMutation = (
  { __typename?: 'Mutation' }
  & { addProductImages: (
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'images'>
  ) }
);

export type AddUserImageMutationVariables = Exact<{
  imageSrc: Scalars['String'];
}>;


export type AddUserImageMutation = (
  { __typename?: 'Mutation' }
  & { addUserImage: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'photo'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'repliesCount' | 'createdAt'>
    & RegularPostFragment
  ) }
);

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'description' | 'category' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'fullName' | 'photo'>
    ) }
    & RegularProductFragment
  ) }
);

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id'>
  ) }
);

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type DeleteReplyMutationVariables = Exact<{
  postId: Scalars['String'];
  replyId: Scalars['String'];
}>;


export type DeleteReplyMutation = (
  { __typename?: 'Mutation' }
  & { deleteReply: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'repliesCount'>
    & { replies: Array<(
      { __typename?: 'Reply' }
      & Pick<Reply, '_id'>
    )> }
  ) }
);

export type LikeProductMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type LikeProductMutation = (
  { __typename?: 'Mutation' }
  & { likeProduct: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'likes'>
  ) }
);

export type ReplyPostMutationVariables = Exact<{
  postId: Scalars['String'];
  body: Scalars['String'];
}>;


export type ReplyPostMutation = (
  { __typename?: 'Mutation' }
  & { replyPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id'>
    & { replies: Array<(
      { __typename?: 'Reply' }
      & Pick<Reply, '_id' | 'body' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, '_id'>
      ) }
    )> }
  ) }
);

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { udpateProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'description' | 'category'>
    & RegularProductFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'firstName' | 'lastName' | 'fullName'>
    & { socials: (
      { __typename?: 'UserSocials' }
      & Pick<UserSocials, 'phoneNumber' | 'facebook' | 'linkedin' | 'instagram'>
    ) }
  ) }
);

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'category' | 'repliesCount' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'fullName' | 'photo'>
    ), replies: Array<(
      { __typename?: 'Reply' }
      & Pick<Reply, '_id' | 'body' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'fullName' | 'photo'>
      ) }
    )> }
    & RegularPostFragment
  ) }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'category' | 'repliesCount' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'fullName'>
    ) }
  )> }
);

export type ProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'description' | 'category' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'fullName' | 'photo' | 'email'>
      & { socials: (
        { __typename?: 'UserSocials' }
        & Pick<UserSocials, 'phoneNumber' | 'facebook' | 'linkedin' | 'instagram'>
      ) }
    ) }
    & RegularProductFragment
  ) }
);

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'category' | 'createdAt'>
    & RegularProductFragment
  )> }
);

export type SearchPostsQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchPostsQuery = (
  { __typename?: 'Query' }
  & { searchPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'category' | 'repliesCount' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'fullName'>
    ) }
  )> }
);

export type SearchProductsQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchProductsQuery = (
  { __typename?: 'Query' }
  & { searchProducts: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'category' | 'createdAt'>
    & RegularProductFragment
  )> }
);

export type UserQueryVariables = Exact<{
  mongoId?: Maybe<Scalars['String']>;
  firebaseId?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'photo' | 'likes' | 'createdAt' | 'updatedAt'>
    & { socials: (
      { __typename?: 'UserSocials' }
      & Pick<UserSocials, 'phoneNumber' | 'facebook' | 'linkedin' | 'instagram'>
    ) }
    & RegularUserFragment
  ) }
);

export type UserFavoritesQueryVariables = Exact<{
  favoritesList: Array<Scalars['String']>;
}>;


export type UserFavoritesQuery = (
  { __typename?: 'Query' }
  & { userFavorites: Array<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'title' | 'description' | 'category' | 'images' | 'createdAt'>
  )> }
);

export type UserProductsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserProductsQuery = (
  { __typename?: 'Query' }
  & { userProducts: Array<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'title' | 'description' | 'category' | 'images' | 'createdAt'>
  )> }
);

export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  _id
  title
  body
}
    `;
export const RegularProductFragmentDoc = gql`
    fragment RegularProduct on Product {
  _id
  title
  price
  location
  images
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  firstName
  lastName
  fullName
  email
}
    `;
export const AddProductImageDocument = gql`
    mutation AddProductImage($productId: String!, $imagesSrc: [String!]!) {
  addProductImages(productId: $productId, imagesSrc: $imagesSrc) {
    _id
    images
  }
}
    `;
export type AddProductImageMutationFn = Apollo.MutationFunction<AddProductImageMutation, AddProductImageMutationVariables>;

/**
 * __useAddProductImageMutation__
 *
 * To run a mutation, you first call `useAddProductImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductImageMutation, { data, loading, error }] = useAddProductImageMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      imagesSrc: // value for 'imagesSrc'
 *   },
 * });
 */
export function useAddProductImageMutation(baseOptions?: Apollo.MutationHookOptions<AddProductImageMutation, AddProductImageMutationVariables>) {
        return Apollo.useMutation<AddProductImageMutation, AddProductImageMutationVariables>(AddProductImageDocument, baseOptions);
      }
export type AddProductImageMutationHookResult = ReturnType<typeof useAddProductImageMutation>;
export type AddProductImageMutationResult = Apollo.MutationResult<AddProductImageMutation>;
export type AddProductImageMutationOptions = Apollo.BaseMutationOptions<AddProductImageMutation, AddProductImageMutationVariables>;
export const AddUserImageDocument = gql`
    mutation addUserImage($imageSrc: String!) {
  addUserImage(imageSrc: $imageSrc) {
    _id
    photo
  }
}
    `;
export type AddUserImageMutationFn = Apollo.MutationFunction<AddUserImageMutation, AddUserImageMutationVariables>;

/**
 * __useAddUserImageMutation__
 *
 * To run a mutation, you first call `useAddUserImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserImageMutation, { data, loading, error }] = useAddUserImageMutation({
 *   variables: {
 *      imageSrc: // value for 'imageSrc'
 *   },
 * });
 */
export function useAddUserImageMutation(baseOptions?: Apollo.MutationHookOptions<AddUserImageMutation, AddUserImageMutationVariables>) {
        return Apollo.useMutation<AddUserImageMutation, AddUserImageMutationVariables>(AddUserImageDocument, baseOptions);
      }
export type AddUserImageMutationHookResult = ReturnType<typeof useAddUserImageMutation>;
export type AddUserImageMutationResult = Apollo.MutationResult<AddUserImageMutation>;
export type AddUserImageMutationOptions = Apollo.BaseMutationOptions<AddUserImageMutation, AddUserImageMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: PostInput!) {
  createPost(postInput: $postInput) {
    ...RegularPost
    repliesCount
    createdAt
  }
}
    ${RegularPostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!) {
  createProduct(createProductInput: $createProductInput) {
    ...RegularProduct
    description
    category
    creator {
      _id
      fullName
      photo
    }
    createdAt
  }
}
    ${RegularProductFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      createProductInput: // value for 'createProductInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    _id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($productId: String!) {
  deleteProduct(productId: $productId)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteReplyDocument = gql`
    mutation DeleteReply($postId: String!, $replyId: String!) {
  deleteReply(postId: $postId, replyId: $replyId) {
    _id
    replies {
      _id
    }
    repliesCount
  }
}
    `;
export type DeleteReplyMutationFn = Apollo.MutationFunction<DeleteReplyMutation, DeleteReplyMutationVariables>;

/**
 * __useDeleteReplyMutation__
 *
 * To run a mutation, you first call `useDeleteReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReplyMutation, { data, loading, error }] = useDeleteReplyMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      replyId: // value for 'replyId'
 *   },
 * });
 */
export function useDeleteReplyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReplyMutation, DeleteReplyMutationVariables>) {
        return Apollo.useMutation<DeleteReplyMutation, DeleteReplyMutationVariables>(DeleteReplyDocument, baseOptions);
      }
export type DeleteReplyMutationHookResult = ReturnType<typeof useDeleteReplyMutation>;
export type DeleteReplyMutationResult = Apollo.MutationResult<DeleteReplyMutation>;
export type DeleteReplyMutationOptions = Apollo.BaseMutationOptions<DeleteReplyMutation, DeleteReplyMutationVariables>;
export const LikeProductDocument = gql`
    mutation LikeProduct($productId: String!) {
  likeProduct(productId: $productId) {
    _id
    likes
  }
}
    `;
export type LikeProductMutationFn = Apollo.MutationFunction<LikeProductMutation, LikeProductMutationVariables>;

/**
 * __useLikeProductMutation__
 *
 * To run a mutation, you first call `useLikeProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeProductMutation, { data, loading, error }] = useLikeProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useLikeProductMutation(baseOptions?: Apollo.MutationHookOptions<LikeProductMutation, LikeProductMutationVariables>) {
        return Apollo.useMutation<LikeProductMutation, LikeProductMutationVariables>(LikeProductDocument, baseOptions);
      }
export type LikeProductMutationHookResult = ReturnType<typeof useLikeProductMutation>;
export type LikeProductMutationResult = Apollo.MutationResult<LikeProductMutation>;
export type LikeProductMutationOptions = Apollo.BaseMutationOptions<LikeProductMutation, LikeProductMutationVariables>;
export const ReplyPostDocument = gql`
    mutation ReplyPost($postId: String!, $body: String!) {
  replyPost(postId: $postId, body: $body) {
    _id
    replies {
      _id
      body
      creator {
        _id
      }
      createdAt
    }
  }
}
    `;
export type ReplyPostMutationFn = Apollo.MutationFunction<ReplyPostMutation, ReplyPostMutationVariables>;

/**
 * __useReplyPostMutation__
 *
 * To run a mutation, you first call `useReplyPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyPostMutation, { data, loading, error }] = useReplyPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useReplyPostMutation(baseOptions?: Apollo.MutationHookOptions<ReplyPostMutation, ReplyPostMutationVariables>) {
        return Apollo.useMutation<ReplyPostMutation, ReplyPostMutationVariables>(ReplyPostDocument, baseOptions);
      }
export type ReplyPostMutationHookResult = ReturnType<typeof useReplyPostMutation>;
export type ReplyPostMutationResult = Apollo.MutationResult<ReplyPostMutation>;
export type ReplyPostMutationOptions = Apollo.BaseMutationOptions<ReplyPostMutation, ReplyPostMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
  udpateProduct(updateProductInput: $updateProductInput) {
    ...RegularProduct
    description
    category
  }
}
    ${RegularProductFragmentDoc}`;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductInput: // value for 'updateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    _id
    firstName
    lastName
    fullName
    socials {
      phoneNumber
      facebook
      linkedin
      instagram
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(postId: $postId) {
    ...RegularPost
    category
    repliesCount
    creator {
      _id
      fullName
      photo
    }
    replies {
      _id
      creator {
        _id
        fullName
        photo
      }
      body
      createdAt
    }
    repliesCount
    createdAt
    updatedAt
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    _id
    creator {
      _id
      fullName
    }
    title
    category
    repliesCount
    createdAt
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProductDocument = gql`
    query Product($productId: String!) {
  product(productId: $productId) {
    ...RegularProduct
    description
    category
    creator {
      _id
      fullName
      photo
      email
      socials {
        phoneNumber
        facebook
        linkedin
        instagram
      }
    }
    createdAt
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, baseOptions);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, baseOptions);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    ...RegularProduct
    category
    createdAt
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const SearchPostsDocument = gql`
    query SearchPosts($searchTerm: String!) {
  searchPosts(term: $searchTerm) {
    _id
    creator {
      _id
      fullName
    }
    title
    category
    repliesCount
    createdAt
  }
}
    `;

/**
 * __useSearchPostsQuery__
 *
 * To run a query within a React component, call `useSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchPostsQuery(baseOptions: Apollo.QueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
        return Apollo.useQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, baseOptions);
      }
export function useSearchPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
          return Apollo.useLazyQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, baseOptions);
        }
export type SearchPostsQueryHookResult = ReturnType<typeof useSearchPostsQuery>;
export type SearchPostsLazyQueryHookResult = ReturnType<typeof useSearchPostsLazyQuery>;
export type SearchPostsQueryResult = Apollo.QueryResult<SearchPostsQuery, SearchPostsQueryVariables>;
export const SearchProductsDocument = gql`
    query SearchProducts($searchTerm: String!) {
  searchProducts(term: $searchTerm) {
    ...RegularProduct
    category
    createdAt
  }
}
    ${RegularProductFragmentDoc}`;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchProductsQuery(baseOptions: Apollo.QueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
        return Apollo.useQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, baseOptions);
      }
export function useSearchProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
          return Apollo.useLazyQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, baseOptions);
        }
export type SearchProductsQueryHookResult = ReturnType<typeof useSearchProductsQuery>;
export type SearchProductsLazyQueryHookResult = ReturnType<typeof useSearchProductsLazyQuery>;
export type SearchProductsQueryResult = Apollo.QueryResult<SearchProductsQuery, SearchProductsQueryVariables>;
export const UserDocument = gql`
    query User($mongoId: String, $firebaseId: String) {
  user(mongoId: $mongoId, firebaseId: $firebaseId) {
    ...RegularUser
    socials {
      phoneNumber
      facebook
      linkedin
      instagram
    }
    photo
    likes
    createdAt
    updatedAt
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      mongoId: // value for 'mongoId'
 *      firebaseId: // value for 'firebaseId'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFavoritesDocument = gql`
    query UserFavorites($favoritesList: [String!]!) {
  userFavorites(favoritesList: $favoritesList) {
    _id
    title
    description
    category
    images
    createdAt
  }
}
    `;

/**
 * __useUserFavoritesQuery__
 *
 * To run a query within a React component, call `useUserFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFavoritesQuery({
 *   variables: {
 *      favoritesList: // value for 'favoritesList'
 *   },
 * });
 */
export function useUserFavoritesQuery(baseOptions: Apollo.QueryHookOptions<UserFavoritesQuery, UserFavoritesQueryVariables>) {
        return Apollo.useQuery<UserFavoritesQuery, UserFavoritesQueryVariables>(UserFavoritesDocument, baseOptions);
      }
export function useUserFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFavoritesQuery, UserFavoritesQueryVariables>) {
          return Apollo.useLazyQuery<UserFavoritesQuery, UserFavoritesQueryVariables>(UserFavoritesDocument, baseOptions);
        }
export type UserFavoritesQueryHookResult = ReturnType<typeof useUserFavoritesQuery>;
export type UserFavoritesLazyQueryHookResult = ReturnType<typeof useUserFavoritesLazyQuery>;
export type UserFavoritesQueryResult = Apollo.QueryResult<UserFavoritesQuery, UserFavoritesQueryVariables>;
export const UserProductsDocument = gql`
    query UserProducts($userId: String!) {
  userProducts(userId: $userId) {
    _id
    title
    description
    category
    images
    createdAt
  }
}
    `;

/**
 * __useUserProductsQuery__
 *
 * To run a query within a React component, call `useUserProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProductsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProductsQuery(baseOptions: Apollo.QueryHookOptions<UserProductsQuery, UserProductsQueryVariables>) {
        return Apollo.useQuery<UserProductsQuery, UserProductsQueryVariables>(UserProductsDocument, baseOptions);
      }
export function useUserProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProductsQuery, UserProductsQueryVariables>) {
          return Apollo.useLazyQuery<UserProductsQuery, UserProductsQueryVariables>(UserProductsDocument, baseOptions);
        }
export type UserProductsQueryHookResult = ReturnType<typeof useUserProductsQuery>;
export type UserProductsLazyQueryHookResult = ReturnType<typeof useUserProductsLazyQuery>;
export type UserProductsQueryResult = Apollo.QueryResult<UserProductsQuery, UserProductsQueryVariables>;