import { auth } from '@clerk/nextjs/server';
import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    type: string;
  };
}

const AddTransformationTypePage = async ({ params }: PageProps) => {
  try {
    // Await the result of auth to get the authenticated user's details
    const authResult = await auth(); // This is an async call
    console.log('Auth result:', authResult);

    const { userId } = authResult;

    // If no user is signed in, redirect to sign-in page
    if (!userId) {
      console.warn('No userId found. Redirecting to /sign-in...');
      redirect('/sign-in');
      return null;
    }

    // Safely get the transformation type
    const transformation = transformationTypes[params.type as keyof typeof transformationTypes];
    console.log('Transformation:', transformation);

    if (!transformation) {
      console.warn(`Transformation type "${params.type}" not found. Redirecting to /404...`);
      redirect('/404');
      return null;
    }

    // Fetch the user by ID
    const user = await getUserById(userId);
    console.log('User:', user);

    if (!user) {
      console.error('User not found. Redirecting to /error...');
      redirect('/error');
      return null;
    }

    // Render the page with valid data
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
  } catch (error) {
    console.error('Error in AddTransformationTypePage:', error);
    redirect('/error');
    return null;
  }
};

export default AddTransformationTypePage;