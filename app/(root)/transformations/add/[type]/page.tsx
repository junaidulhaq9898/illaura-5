import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      redirect('/sign-in');
      return null;
    }

    const transformation = transformationTypes[type];
    if (!transformation) {
      redirect('/404');
      return null;
    }

    const user = await getUserById(userId);
    if (!user) {
      redirect('/error');
      return null;
    }

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
    console.error("Error in AddTransformationTypePage:", error);
    redirect('/error');
    return null;
  }
};

export default AddTransformationTypePage;