import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";
import { redirect } from "next/navigation";

interface PageProps {
  params: { id: string };
  request: { userId?: string }; // Define a specific type for the request
}

const Page = async ({ params: { id }, request }: PageProps) => {
  const userId = request.userId; // Access userId from the request object

  if (!userId) {
    redirect("/sign-in"); // Redirect to sign-in if user is not authenticated
    return null;
  }

  const user = await getUserById(userId); // Fetch user data by userId
  const image = await getImageById(id); // Fetch image data by id

  const transformation = transformationTypes[image.transformationType as keyof typeof transformationTypes];

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