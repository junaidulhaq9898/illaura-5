import { getAuth } from "@clerk/nextjs/server"; // Correct import for server-side authentication
import { NextRequest } from "next/server"; // Import NextRequest to type the request object
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";

const Page = async ({ params: { id }, request }: { params: { id: string }; request: NextRequest }) => {
  // Pass the NextRequest object to getAuth()
  const { userId } = getAuth(request); // Get authentication details using getAuth() with NextRequest object

  if (!userId) {
    redirect("/sign-in"); // Redirect if user is not authenticated
  }

  const user = await getUserById(userId); // Fetch user data by userId
  const image = await getImageById(id); // Fetch image data by id

  const transformation = transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;