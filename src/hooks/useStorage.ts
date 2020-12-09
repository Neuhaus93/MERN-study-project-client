import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../services/firebase';

export const useStorage = () => {
  function uploadFile(path: string, file: File, isFullPath?: boolean) {
    const uuid = uuidv4();
    const fullPath = isFullPath ? path : path + uuid;

    return storage.ref().child(fullPath).put(file);
  }

  async function uploadMultipleFiles(images: File[], productId: string) {
    const uploadPromises = [] as firebase.storage.UploadTask[];
    const path = `ads/${productId}/`;

    images.forEach((image) => {
      uploadPromises.push(uploadFile(path, image));
    });

    try {
      const snapshots = await Promise.all(uploadPromises);
      const getUrlPromises = [] as Promise<string>[];

      snapshots.forEach((snapshot) =>
        getUrlPromises.push(snapshot.ref.getDownloadURL())
      );
      return Promise.all(getUrlPromises);
    } catch (error) {
      console.log({ from: 'uploadMultipleImages', error });
      return [] as string[];
    }
  }

  function deleteFile(path: string) {
    return storage.ref().child(path).delete();
  }

  async function deleteMultipleFiles(
    deletedImages: string[],
    productId: string
  ) {
    const deletePromises: any[] = [];

    deletedImages.forEach((image) => {
      const lastIndex = image.indexOf('?alt=media');
      const imageId = image.substring(lastIndex - 36, lastIndex);
      deletePromises.push(deleteFile(`ads/${productId}/${imageId}`));
    });

    try {
      await Promise.all(deletePromises);
    } catch (err) {
      console.log({ from: 'deleteMultipleFiles', err });
    }
  }

  function getImages(productId: string) {
    const imagesRef = storage.ref().child(`ads/${productId}`);

    return imagesRef.listAll();
  }

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    deleteMultipleFiles,
    getImages,
  };
};
