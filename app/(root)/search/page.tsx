import UserCard from "@/components/cards/UserCard";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { fetchUsers } from "@/lib/actions/user.actions";
import { User } from "@/types";

const Search = async () => {
  const { dbUser } = await useLoggedUser();

  const result = await fetchUsers({
    userId: dbUser._id.toString(),
    searchString: "",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users found.</p>
        ) : (
          result.users.map((person: User) => (
            <UserCard
              key={person._id.toString()}
              userId={person._id.toString()}
              userImage={person.image}
              userName={person.name}
              userUsername={person.username}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Search;
