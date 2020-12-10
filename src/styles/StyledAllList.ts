import tw, { styled } from 'twin.macro';

export const StyledAllList = styled.div`
  ${tw`flex flex-auto box-border w-full h-full`}

  & .filter {
    ${tw`hidden sm:flex bg-red-200`}
    ${tw`sm:(w-4/12)`};
    ${tw`md:(w-3/12)`};
    ${tw`xl:(w-2/12)`};

    @media (min-width: 640px) {
      min-height: calc(100vh - 64px - 48px);
    }
  }

  & .content {
    flex-basis: 100%;
    max-width: 1500px;
    ${tw`mx-auto p-4`}
    ${tw`sm:(w-8/12) p-8`};
    ${tw`md:(w-9/12)`};
    ${tw`xl:(w-10/12)`};
  }

  & .products {
    ${tw`grid grid-cols-2 gap-x-2 gap-y-2`}
    ${tw`sm:(grid-cols-2 gap-y-4)`}
  ${tw`md:(grid-cols-3 gap-x-3)`}
  ${tw`lg:(grid-cols-4 gap-x-3)`}
  ${tw`xl:(grid-cols-5 gap-x-3)`}
  /* ${tw`lg:(grid-cols-6)`} */
  }

  & .posts {
  }
`;
