import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export default function WithClientWrapper() {
  const { data, loading: queryLoading } = useQuery<{ users: User[] }>(GET_USER);
  const [createUser, { data: createdUser, loading: createLoading, error }] =
    useMutation(CREATE_USER);

  const loading = queryLoading || createLoading;

  const [name, setName] = useState("");

  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name) {
      return;
    }

    // // With refetch on api
    // await createUser({
    //   variables: {
    //     name,
    //   },
    //   refetchQueries: [{ query: GET_USER }],
    // });

    // With frontend cache update
    await createUser({
      variables: {
        name,
      },
      update: (cache, { data: { createUser } }) => {
        const { users } = cache.readQuery<{ users: User[] }>({
          query: GET_USER,
        })!;

        cache.writeQuery({
          query: GET_USER,
          data: { users: [...users, createUser] },
        });
      },
    });
  }

  return (
    <main className="w-screen h-screen flex flex-col item-center justify-center">
      <h1 className="text-center text-4xl font-bold ">
        Hello GraphQL on Client
      </h1>

      <div className="mt-12 w-1/2 flex flex-col items-center justify-center mx-auto">
        <form onSubmit={handleCreateUser} className="mb-6 flex flex-col">
          <input
            type="text"
            value={name}
            className="rounded-md bg-transparent border-2 py-2 px-4"
            onChange={(event) => setName(event.target.value)}
          />

          <button type="submit" className="bg-emerald-400 mt-4 rounded-md py-2">
            Submit
          </button>
        </form>

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
      </div>
    </main>
  );
}
