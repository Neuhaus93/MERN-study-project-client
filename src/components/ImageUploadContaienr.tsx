import React, { useState } from 'react';
import { BiImageAdd, BiTrash } from 'react-icons/bi';
import tw, { styled } from 'twin.macro';

interface Props {
  subscription: string | null;
  newImages: File[];
  setNewImages: (images: File[]) => void;
  existingImages?: string[];
  setExistingImages?: (images: string[]) => void;
  deletedImages?: string[];
  setDeletedImages?: (deletedImages: string[]) => void;
}

export const ImageUploadContaienr: React.FC<Props> = (props) => {
  const {
    subscription,
    newImages,
    setNewImages,
    existingImages = [],
    setExistingImages,
    deletedImages = [],
    setDeletedImages,
  } = props;
  const [picturesLimit, setPicturesLimit] = useState(8);
  const [error, setError] = useState('');
  const [imagesMaxed, setImagesMaxed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;

    if (!inputFiles || inputFiles.length === 0) return;
    const currentLength = [...existingImages, ...newImages].length;

    if (inputFiles.length + currentLength > picturesLimit) {
      setError(`You can only upload a maximum of ${picturesLimit} pictures`);
      return;
    }
    if (inputFiles.length + currentLength === picturesLimit) {
      setImagesMaxed(true);
    }

    setError('');
    setNewImages(newImages.concat(fileListToArray(inputFiles)));
  };

  const handleDelete = (index: number) => {
    /**
     * Deleting from the existing images
     */
    if (index < existingImages.length) {
      const resultingImages = [...existingImages];
      const deletedImage = resultingImages.splice(index, 1);

      setDeletedImages && setDeletedImages([...deletedImages, deletedImage[0]]);
      setExistingImages && setExistingImages(resultingImages);
    } else {
      /**
       * Deleting from the new image files */
      const resultingImages = [...newImages];
      resultingImages.splice(index - existingImages.length, 1);
      setNewImages(resultingImages);
    }

    /**
     * Reseting the error message
     */
    setImagesMaxed(false);
    setError('');
  };

  return (
    <>
      <div>
        <label className='text-input-label'>Photos</label>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-4'>
          {newImages &&
            [...existingImages, ...newImages].map((image, index) => {
              const src =
                typeof image === 'string' ? image : URL.createObjectURL(image);
              return (
                <StyImgContainer key={index}>
                  <StyDeleteButton
                    type='button'
                    onClick={() => handleDelete(index)}>
                    <BiTrash size={32} />
                  </StyDeleteButton>
                  <img
                    src={src}
                    alt='product'
                    className='object-cover w-full h-full'
                  />
                </StyImgContainer>
              );
            })}
          {!imagesMaxed && (
            <PhotoInput
              handleChange={handleChange}
              disabled={!!(newImages && newImages.length > picturesLimit)}
              subscription={subscription}
            />
          )}
        </div>
      </div>
      {error && <p className='text-input-error'>{error}</p>}
      {imagesMaxed && (
        <p className='text-input-success'>Maximum images reached</p>
      )}
    </>
  );
};

interface PhotoInputProps {
  subscription: string | null;
  disabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoInput: React.FC<PhotoInputProps> = (props) => (
  <div>
    <label htmlFor='upload-photo'>
      <input
        style={{ display: 'none' }}
        id='upload-photo'
        name='upload-photo'
        type='file'
        accept='image/*'
        multiple={props.subscription === 'paid'}
        disabled={props.disabled}
        onChange={props.handleChange}
      />
      <StyImgContainer>
        <BiImageAdd size={32} />
      </StyImgContainer>
    </label>
  </div>
);

const StyDeleteButton = styled.button`
  ${tw`absolute flex inset-0 w-full h-full justify-center items-center text-transparent`};
  ${tw`transition-all hover:(bg-black bg-opacity-70 text-red-600)`};
`;

const StyImgContainer = styled.div`
  ${tw`h-24 sm:h-32 border rounded-sm bg-indigo-50 flex justify-center items-center`};
  ${tw`cursor-pointer overflow-hidden relative border`};
  ${tw`transition duration-200 hover:shadow`};
`;

function fileListToArray(fileList: FileList) {
  return Array.prototype.slice.call(fileList);
}
