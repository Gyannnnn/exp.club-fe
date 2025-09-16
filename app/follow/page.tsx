import { auth } from "@/auth";
import LoginFirst from "@/components/LoginFirst";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { users } from "@/Types/axiosTypes";
import { MailCheckIcon } from "lucide-react";
import Folllow from "@/components/Folllow";

export default async function FollowPage() {
  const session = await auth();
  if (!session?.user) {
    return <LoginFirst />;
  }
  try {
    const res = await axios.get<users>(
      "https://exp-club-be.vercel.app/api/v1/users/all",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = res.data.users;

    return (
      <div className="min-h-full w-full flex flex-col gap-2 sm:pt-20 pb-20 pt-10">
        <h1>Follow other users</h1>
        {data.map((user, index) => (
          <Card
            key={index}
            className="w-full max-w-2xl mx-auto h-auto flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 mb-4 shadow-md rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex flex-col w-full">
              <h1 className="text-lg font-semibold text-gray-900">
                {user.userName}
              </h1>
              <p className="text-sm text-gray-600">{user.userBio}</p>
              <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-500">
                <span>🔥 {user.streak} Streak</span>
                <span className="flex items-center gap-1">
                  <MailCheckIcon /> {user.userEmail}
                </span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 self-end md:self-center">
              <Folllow
                followeeId={user.id}
                followerId={session.user.id}
                token={session.accessToken as string}
              />
            </div>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    );
  }
}
