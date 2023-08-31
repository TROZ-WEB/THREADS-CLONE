import { PostThreadForm } from "@/components/forms";
import { useLoggedUser } from "@/hooks/useLoggedUser";

const CreateThread = async () => {
  const { dbUser } = await useLoggedUser();

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThreadForm userId={dbUser._id.toString()} />
    </>
  );
};

export default CreateThread;
