'use client';

import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import {
  useUploadRoomImagesMutation,
  useDeleteRoomImagesMutation,
} from '@/redux/api/roomApi';
import { revalidateTag } from '@/helpers/revalidate';
import { IImages, IRoom } from '@/backend/models/room';
import ButtonLoader from '../layout/ButtonLoader';

interface Props {
  data: {
    room: IRoom;
  };
}

const UploadRoomImages = ({ data }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<IImages[]>();

  useEffect(() => {
    if (data) {
      setUploadedImages(data?.room?.images);
    }
  }, [data]);

  const router = useRouter();

  const [uploadRoomImages, { isLoading, isSuccess, error }] =
    useUploadRoomImagesMutation();

  const [
    deleteRoomImages,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteRoomImagesMutation();

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag('RoomDetails');
      setImagesPreview([]);
      router.refresh();
      toast.success('Images Uploaded');
    }
  }, [error, isSuccess]);

  useEffect(() => {
    if (deleteError && 'data' in deleteError) {
      toast.error(deleteError?.data?.errMessage);
    }

    if (isDeleteSuccess) {
      revalidateTag('RoomDetails');
      router.refresh();
      toast.success('Images Deleted');
    }
  }, [deleteError, isDeleteSuccess]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevState) => [...prevState, reader.result as string]);
          setImagesPreview((prevState) => [
            ...prevState,
            reader.result as string,
          ]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadRoomImages({ id: data?.room?._id, body: { images } });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageDelete = (imgId: string) => {
    deleteRoomImages({ id: data.room._id, body: { imgId } });
  };

  const removeImagePreview = (imgUrl: string) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== imgUrl);
    setImagesPreview(filteredImagesPreview);
    setImages(filteredImagesPreview);
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-7 mt-5 mt-lg-0">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Room Uploaded Images</h2>

          <div className="form-group">
            <label htmlFor="customFile" className="form-label">
              Choose Images
            </label>

            <div className="custom-file">
              <input
                ref={fileInputRef}
                type="file"
                name="product_images"
                className="form-control"
                id="customFile"
                onChange={onChange}
                onClick={handleResetFileInput}
                multiple
                required
              />
            </div>

            {imagesPreview?.length > 0 && (
              <div className="new-images mt-4">
                <p className="text-warning">New Images:</p>
                <div className="row mt-4">
                  {imagesPreview.map((img, ind) => (
                    <div className="col-md-3 mt-2">
                      <div className="card">
                        <img
                          src={img}
                          alt={`image ${ind}`}
                          className="card-img-top p-2"
                          style={{ width: '100%', height: '80px' }}
                        />
                        <button
                          style={{
                            backgroundColor: '#dc3545',
                            borderColor: '#dc3545',
                          }}
                          type="button"
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          onClick={() => removeImagePreview(img)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!!uploadedImages?.length && (
              <div className="uploaded-images mt-4">
                <p className="text-success">Uploaded Room Images:</p>
                <div className="row mt-1">
                  {uploadedImages?.map((img) => (
                    <div className="col-md-3 mt-2">
                      <div className="card">
                        <img
                          src={img?.url}
                          alt={img?.url}
                          className="card-img-top p-2"
                          style={{ width: '100%', height: '80px' }}
                        />
                        <button
                          style={{
                            backgroundColor: '#dc3545',
                            borderColor: '#dc3545',
                          }}
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          onClick={() => handleImageDelete(img?.public_id)}
                          disabled={isDeleteLoading || isLoading}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={isLoading || isDeleteLoading}
          >
            {isLoading || isDeleteLoading ? <ButtonLoader /> : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadRoomImages;
