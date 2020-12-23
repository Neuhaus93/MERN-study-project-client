import { Form, Formik } from 'formik';
import { FaTrash } from 'react-icons/fa';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Moment from 'react-moment';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { ButtonBlueFilled, ButtonRedOutline } from '../components/Buttons';
import { Divider } from '../components/Divider';
import { Modal, NotLoggedInModal } from '../components/Modal';
import { MyImage } from '../components/MyImage';
import {
  PostQuery,
  PostsDocument,
  PostsQuery,
  useDeletePostMutation,
  useDeleteReplyMutation,
  usePostQuery,
  useReplyPostMutation,
} from '../graphql/__generated__';
import { useAuth } from '../hooks/useAuth';
import { DefaultWrapper } from '../styles/Wrapper';
import { DATE_REPLY } from '../util/date-formats';
import { ROUTE_LANDING } from '../util/routes';
import { UserImage } from '../components/UserImage';

interface PostScreenProps extends RouteComponentProps<{ postId: string }> {}

export const PostScreen: React.FC<PostScreenProps> = ({ match }) => {
  const { postId } = match.params;
  const { mongoUser } = useAuth();
  const { data } = usePostQuery({ variables: { postId } });

  // TODO: Change for a loading skeleton
  if (!data) {
    return (
      <DefaultWrapper className='container mb-6 px-3 lg:px-0 mx-auto xl:max-w-screen-xl'></DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper className='container mb-6 px-3 lg:px-0 mx-auto xl:max-w-screen-xl'>
      <h2 className='text-2xl font-bold w-full mt-4 px-1 sm:pt-4 sm:px-6'>
        {data.post.title}
      </h2>
      <Divider width={80} margin='1.25rem auto 1.75rem' />
      <ForumPost
        postId={data.post._id}
        postNumber={1}
        isCreator={data.post.creator._id === mongoUser?._id}
        reply={{
          __typename: 'Reply',
          _id: data.post._id,
          user: data.post.creator,
          body: data.post.body,
          createdAt: data.post.createdAt,
        }}
      />
      {data.post.replies.map((reply, index) => (
        <ForumPost
          key={reply._id}
          postId={data.post._id}
          isCreator={data.post.replies[index].user._id === mongoUser?._id}
          postNumber={index + 2}
          reply={reply}
        />
      ))}
      <ForumForm postId={postId} />
    </DefaultWrapper>
  );
};

interface ForumPostProps {
  postId: string;
  postNumber: number;
  isCreator: boolean;
  reply: PostQuery['post']['replies'][number];
}

const ForumPost: React.FC<ForumPostProps> = (props) => {
  const { postId, postNumber, isCreator, reply } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteReply, { loading: deletingReply }] = useDeleteReplyMutation();
  const [deletePost, { loading: deletingPost }] = useDeletePostMutation();
  const { mongoUser } = useAuth();
  const history = useHistory();

  const handleDelete = async () => {
    if (postId === reply._id) {
      if (mongoUser) {
        await deletePost({
          variables: {
            postId,
            userId: mongoUser._id,
          },
          update: (cache, { data }) => {
            if (!data) return;
            const { deletePost } = data;
            const postsQuery = cache.readQuery<PostsQuery>({
              query: PostsDocument,
            });
            if (!postsQuery) return;

            cache.writeQuery<PostsQuery>({
              query: PostsDocument,
              data: {
                posts: postsQuery.posts.filter(
                  (post) => post._id !== deletePost._id
                ),
              },
            });
          },
        });
        history.push(ROUTE_LANDING);
      }
    } else {
      await deleteReply({
        variables: {
          postId,
          replyId: reply._id,
        },
      });
    }
  };

  const handleClick = () => {
    setModalIsOpen(true);
  };

  return (
    <StyledForumPost className='box-border sm:flex'>
      <div className='user'>
        <div className='user__image'>
          <UserImage square src={reply.user.photo} />
        </div>
        <p className='user__name'>{reply.user.fullName}</p>
        {isCreator && (
          <div className='inline-flex justify-center items-center pt-2'>
            <ButtonRedOutline
              className='opacity-70 mb-2'
              onClick={handleClick}
              disabled={deletingReply || deletingPost}>
              <FaTrash />
            </ButtonRedOutline>
          </div>
        )}
      </div>

      <div className='content'>
        <div className='content__header'>
          <Moment date={new Date(reply.createdAt)} calendar={DATE_REPLY} />
          <div className='pb-2'>#{postNumber}</div>
        </div>
        <span className='content__body'>{reply.body || ''}</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        text='Are you sure you want to delete?'
        actionText='Delete'
        loading={deletingReply || deletingPost}
        handleAction={handleDelete}
      />
    </StyledForumPost>
  );
};

interface ForumFormProps {
  postId: string;
}

const ForumForm: React.FC<ForumFormProps> = (props) => {
  const { postId } = props;
  const { mongoUser } = useAuth();
  const [replyPost, { loading: replyingPost }] = useReplyPostMutation();
  const [newReply, setNewReply] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Reply the post
  const handleSubmit = async ({ reply }: { reply: string }) => {
    /** Checks if user is logged in */
    if (!mongoUser) {
      setModalIsOpen(true);
      return;
    }

    /** Handle edge cases */
    if (!newReply || newReply === '' || postId === '') {
      return;
    }

    await replyPost({
      variables: { postId, userId: mongoUser._id, body: newReply },
    });
    setNewReply('');
  };

  return (
    <>
      <Formik initialValues={{ reply: '' }} onSubmit={handleSubmit}>
        <StyledReplyForm>
          <textarea
            rows={8}
            placeholder='Write your reply'
            onChange={(e) => setNewReply(e.target.value)}
            value={newReply}
          />
          <ButtonBlueFilled type='submit' disabled={replyingPost}>
            REPLY
          </ButtonBlueFilled>
        </StyledReplyForm>
      </Formik>
      <NotLoggedInModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </>
  );
};

const StyledForumPost = styled.div`
  & + & {
    ${tw`mt-2 sm:mt-4`}
  }
  & .user {
    background-color: #f1f0f1;
    ${tw`flex px-1 pt-1 pb-3`}
    ${tw`sm:(px-3 py-0 w-40 flex-col items-center bg-transparent)`}

    &__image {
      ${tw`bg-gray-200 h-14 w-14 flex items-center justify-center rounded overflow-hidden`}
      ${tw`sm:(h-20 w-20)`}
    }
    &__name {
      ${tw`text-sm text-center text-blue-800 mt-1 ml-3`}
      ${tw`sm:(ml-0)`}
    }
  }
  & .content {
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.08);
    ${tw`bg-white p-3 flex-auto w-full rounded-md whitespace-pre-line`}

    &__header {
      ${tw`text-gray-400 flex justify-between pb-2 text-xs`}
    }
    &__body {
      ${tw`text-sm`}
    }
  }
`;

const StyledReplyForm = styled(Form)`
  ${tw`flex flex-col items-end mt-5`}

  & textarea {
    ${tw`bg-white p-4 text-sm flex-auto w-full rounded-md mb-4 border-0 overflow-auto font-normal`}
    box-shadow: 0 16px 16px rgba(0, 0, 0, 0.08);
    outline: 0;
    resize: none;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    letter-spacing: 0.01071em;
    transition: box-shadow 0.5s ease-out;

    &:focus {
      box-shadow: 0 16px 16px rgba(10, 2, 200, 0.08);
    }
  }

  & button {
    ${tw`uppercase`}
  }
`;
