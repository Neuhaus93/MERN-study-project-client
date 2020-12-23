import React, { useState } from 'react';
import { BiImageAdd, BiTrash } from 'react-icons/bi';
import tw, { styled } from 'twin.macro';

interface Props {
  subscription: string | null;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  initialImages?: string[];
  setDeletedImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageUploadContaienr: React.FC<Props> = (props) => {
  const {
    subscription,
    images,
    setImages,
    initialImages,
    setDeletedImages,
  } = props;
  const [picturesLimit, setPicturesLimit] = useState(8);
  const [error, setError] = useState('');
  const [imagesMaxed, setImagesMaxed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;

    if (!inputFiles || inputFiles.length === 0) return;
    const currentLength = [...images].length;

    if (inputFiles.length + currentLength > picturesLimit) {
      setError(`You can only upload a maximum of ${picturesLimit} pictures`);
      return;
    }
    if (inputFiles.length + currentLength === picturesLimit) {
      setImagesMaxed(true);
    }

    setError('');
    setImages(images.concat(fileListToArray(inputFiles)));
  };

  const handleDelete = (index: number) => {
    /**
     * Deleting from the new image files */
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setImagesMaxed(false);

    /**
     * Reseting the error message
     */
    setError('');
  };

  return (
    <>
      <div>
        <label className='text-input-label'>Photos</label>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-4'>
          {images &&
            [...images].map((image, index) => {
              const src = URL.createObjectURL(image);
              return (
                <StyImgContainer key={index}>
                  <StyDeleteButton onClick={() => handleDelete(index)}>
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
              images={images}
              picturesLimit={picturesLimit}
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
  images: File[];
  picturesLimit: number;
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
        disabled={
          !!(props.images && props.images?.length > props.picturesLimit)
        }
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
