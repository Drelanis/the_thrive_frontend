import { auth, NASignOut } from '@server';

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';

          await NASignOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Dashboard;
