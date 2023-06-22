import { gql } from "@apollo/client";
// import { clientOnServerSide } from "~/lib/apollo";

type User = {
  id: string;
  name: string;
};

const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default async function WithClientSide() {
  // const { data, loading }: { data: { users: User[] }; loading: boolean } =
  //   await clientOnServerSide().query({
  //     query: GET_USER,
  //   });

  return (
    <main className="w-screen h-screen flex flex-col item-center justify-center">
      <h1 className="text-center text-4xl font-bold ">
        Hello GraphQL on Client
      </h1>

      {/* <div className="mt-12 w-1/2 flex items-center justify-center mx-auto">
        {loading && <p className=" text-center">Loading...</p>}

        {!loading && !data && <p>No data</p>}

        {!loading && (
          <ul>
            {data &&
              data.users?.map((user) => (
                <li key={user.id} className="text-2xl text-slate-400">
                  {"-> "} {user.name}
                </li>
              ))}
          </ul>
        )}
      </div> */}
    </main>
  );
}
