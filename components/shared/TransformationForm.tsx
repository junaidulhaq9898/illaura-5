"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { CustomField } from "./CustomField";
import { useEffect, useState } from "react";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import MediaUploader from "./MediaUploader";
import TransformedImage from "./TransformedImage";
import { updateCredits } from "@/lib/actions/user.actions";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.actions";
import { useRouter } from "next/navigation";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";

type TransformationKey = "restore" | "fill" | "remove" | "recolor";

type CustomImage = {
  publicId: string;
  width: number;
  height: number;
  secureURL: string;
  aspectRatio?: string;
};

type Transformations = {
  [key in TransformationKey]?: { [key: string]: any };
};

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState<CustomImage | null>(data);
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const router = useRouter();

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState) => ({
        ...prevState!,
        [type as TransformationKey]: {
          ...prevState?.[type as TransformationKey],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setIsTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation || {}, transformationConfig || {})
    );

    setNewTransformation(null);

    await updateCredits(userId, creditFee);
  };

  // Other form logic remains unchanged...
};
