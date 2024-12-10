import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server'; // Import auth from @clerk/nextjs/server
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  // Use await to handle the promise returned by auth()
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
    return null;
  }

  const transformation = transformationTypes[type];

  // Ensure that transformation is valid
  if (!transformation) {
    redirect('/404');
    return null;
  }

  // Fetch user data based on the userId
  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;