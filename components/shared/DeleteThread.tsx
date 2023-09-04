"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

type Props = {
  threadId: string;
  parentId: string | null;
  isComment?: boolean;
};

function DeleteThread({ threadId, parentId, isComment }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <Image
      src="/assets/delete.svg"
      alt="delete"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={async () => {
        await deleteThread(threadId, pathname);
        if (!parentId || !isComment) {
          router.push("/");
        }
      }}
    />
  );
}

export default DeleteThread;
