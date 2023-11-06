import Button from "@components/Button";
import { prisma } from "@server/db/client";

const PendingChapters = async () => {
  // Use prisma to get all pending chapter requests
  console.log(prisma);
  const pendingChapters = await prisma.user.findMany();
  console.log(pendingChapters);
  // Map every chapter request to a pending chapter component and return!
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default PendingChapters;
