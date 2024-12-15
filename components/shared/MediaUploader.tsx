"use client";

import { useToast } from "@/components/ui/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type UploadedImageInfo = {
  publicId: string;
  width: number;
  height: number;
  secureURL: string;
};

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<React.SetStateAction<UploadedImageInfo | null>>;
  publicId: string | undefined;
  image: UploadedImageInfo | null;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  // Adjusted onUploadSuccessHandler to handle undefined info
  const onUploadSuccessHandler = (result: CloudinaryUploadWidgetResults) => {
    const { info } = result;

    if (
      info &&
      typeof info === "object" &&
      "public_id" in info &&
      "width" in info &&
      "height" in info &&
      "secure_url" in info
    ) {
      setImage((prevState) => ({
        ...(prevState || {}),
        publicId: info.public_id,
        width: info.width,
        height: info.height,
        secureURL: info.secure_url,
      }));

      onValueChange(info.public_id);

      toast({
        title: "Image uploaded successfully",
        description: "1 credit was deducted from your account",
        duration: 5000,
        className: "success-toast",
      });
    } else {
      console.error("Invalid upload result:", result);
    }
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="jsm_imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>

          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}  // Use `publicId` directly, assuming it's a string
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="media-uploader_cldImage"
              />
            </div>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;