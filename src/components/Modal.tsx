import React from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { ROUTE_LOGIN } from '../util/routes';
import { ButtonBlueFilled, ButtonBlueGhost } from './Buttons';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  text: string;
  loading?: boolean;
  actionText?: string;
  handleAction?: () => void;
}

const modalStyles: ReactModal.Styles = {
  overlay: {
    zIndex: 40,
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, setIsOpen, loading, text, actionText, handleAction } = props;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel='Example Modal'>
      <div className='my-1 mx-4'>
        <h6 className='text-base text-center mb-5'>{text}</h6>
        <div className='flex space-x-4 justify-center'>
          <ButtonBlueGhost onClick={closeModal}>Close</ButtonBlueGhost>
          {actionText && (
            <ButtonBlueFilled onClick={handleAction} disabled={loading}>
              {actionText}
            </ButtonBlueFilled>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export const NotLoggedInModal: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
}> = ({ isOpen, setIsOpen }) => {
  const history = useHistory();

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      text='You must be logged in to perform this action'
      actionText='Log In'
      handleAction={() => history.push(ROUTE_LOGIN)}
    />
  );
};
