import { auth, NASignOut, signOut } from '@server';

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';

          if (session && session.user.id) {
            await signOut(session.user.id);
          }

          await NASignOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Dashboard;
