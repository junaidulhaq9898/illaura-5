import React, { useState } from "react";

// Define the TransformationConfig type
type TransformationConfig = {
  [key: string]: {
    type: string;
    title: string;
    subTitle: string;
    config: Record<string, any>;
    icon: string;
  };
};

// Initial transformations
const initialTransformations: TransformationConfig = {
  restore: {
    type: "restore",
    title: "Restore",
    subTitle: "Restores the image to its original state",
    config: { restore: true },
    icon: "restore-icon",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Remove Background",
    subTitle: "Removes the background from the image",
    config: { removeBackground: true },
    icon: "remove-bg-icon",
  },
  fill: {
    type: "fill",
    title: "Fill",
    subTitle: "Fills the image with a color",
    config: { color: "blue" },
    icon: "fill-icon",
  },
  remove: {
    type: "remove",
    title: "Remove",
    subTitle: "Removes certain elements from the image",
    config: { removeElement: true },
    icon: "remove-icon",
  },
  recolor: {
    type: "recolor",
    title: "Recolor",
    subTitle: "Recolors the image",
    config: { newColor: "red" },
    icon: "recolor-icon",
  },
};

// React Component
const TransformationManager = () => {
  const [transformations, setTransformations] = useState<TransformationConfig>(initialTransformations);

  // Function to update a transformation's config
  const setNewTransformation = (type: keyof TransformationConfig, newConfig: Record<string, any>) => {
    setTransformations((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        config: {
          ...prevState[type].config,
          ...newConfig, // Merge new config properties
        },
      },
    }));
  };

  // Example function to handle updates
  const handleUpdate = () => {
    setNewTransformation("restore", { restore: false }); // Example: Update the 'restore' config
  };

  return (
    <div>
      <h1>Transformation Manager</h1>
      <pre>{JSON.stringify(transformations, null, 2)}</pre>
      <button onClick={handleUpdate}>Update Restore Config</button>
    </div>
  );
};

export default TransformationManager;