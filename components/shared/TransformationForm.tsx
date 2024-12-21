import React, { useState, Dispatch, SetStateAction } from 'react';

type CustomImage = {
  _id?: string;
  title: string;
  publicId: string;
  width?: number;
  height?: number;
  secureURL: string;
  aspectRatio?: string;
  prompt?: string;
  color?: string;
  transformationType?: string;
  config?: Record<string, any>;
  transformationURL?: string;
};

type MediaUploaderProps = {
  setImage: Dispatch<SetStateAction<CustomImage | null>>;
  image: CustomImage | null;
};

const TransformationForm: React.FC = () => {
  const [image, setImage] = useState<CustomImage | null>(null);

  const handleAddImage = () => {
    const imageData: CustomImage = {
      title: 'Sample Title',
      publicId: 'sample-public-id',
      width: 100,
      height: 100,
      secureURL: 'https://example.com/image.jpg',
      transformationType: 'resize',
      config: { key: 'value' },
      transformationURL: 'https://example.com/transformed-image.jpg',
    };

    addImage({ image: imageData });
  };

  const handleUpdateImage = () => {
    if (image) {
      const updatedImageData: CustomImage = {
        ...image,
        transformationType: 'resize',
        config: { key: 'updatedValue' },
      };

      updateImage({ image: updatedImageData });
    }
  };

  const addImage = ({ image }: { image: CustomImage }) => {
    console.log('Adding Image:', image);
  };

  const updateImage = ({ image }: { image: CustomImage }) => {
    console.log('Updating Image:', image);
  };

  return (
    <div>
      <h1>Transformation Form</h1>
      <button onClick={handleAddImage}>Add Image</button>
      <button onClick={handleUpdateImage} disabled={!image}>
        Update Image
      </button>
    </div>
  );
};

const MediaUploader: React.FC<MediaUploaderProps> = ({ setImage, image }) => {
  const handleUpload = () => {
    const uploadedImage: CustomImage = {
      title: 'Uploaded Image',
      publicId: 'uploaded-public-id',
      secureURL: 'https://example.com/uploaded.jpg',
    };

    setImage(uploadedImage);
  };

  return (
    <div>
      <h2>Media Uploader</h2>
      <button onClick={handleUpload}>Upload Image</button>
      {image && <p>Uploaded Image: {image.title}</p>}
    </div>
  );
};

export default TransformationForm;
