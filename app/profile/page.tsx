import { auth } from "@/auth";
import axios from "axios";

import { UserTypes } from "@/Types/axiosTypes";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import AddHabit from "@/components/AddHabit";
import Habbits from "@/components/Habbits";
import LoginFirst from "@/components/LoginFirst";

export default async function ProfilePage() {
  const session = await auth();
  console.log(session?.accessToken);
  if (!session?.user) {
    return (
     <LoginFirst/>
    );
  }
  try {
    const res = await axios.get<UserTypes>(
      `http://localhost:8000/api/v1/users/getbyemail/${session.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const userData = res.data;
   
    return (
      <div className="h-full w-full bg-background flex flex-col gap-2">
        <div>
          <Card className="w-full min-h-20 flex flex-row justify-around items-center mt-10">
            <div className="flex flex-col items-center sm:items-center sm:w-1/2">
              <Image
                className="rounded-full shadow-md border-4 border-white"
                src="/avatar.jpeg"
                height={150}
                width={150}
                alt="profile"
              />
            </div>
            <div className="flex flex-col justify-center sm:w-1/2 text-center sm:text-left">
              <h1 className="text-xl font-bold">{userData.user.userName}</h1>
              <p className="text-gray-600">{userData.user.userBio}</p>
              <p className="text-sm text-gray-500">{userData.user.userEmail}</p>
              <p className="text-xs text-gray-400">
                Joined: {new Date(userData.user.joinedAt).toLocaleDateString()}
              </p>

              {/* Stats Section */}
              <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                <div className="text-center">
                  <h2 className="text-lg font-semibold">
                    {userData.user.followers.length}
                  </h2>
                  <span className="text-sm text-gray-500">Followers</span>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold">
                    {userData.user.following.length}
                  </h2>
                  <span className="text-sm text-gray-500">Following</span>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold">
                    {userData.user.streak}
                  </h2>
                  <span className="text-sm text-gray-500">Streak 🔥</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <AddHabit token={session?.accessToken as string} userId={session.user.id}/>
        </div>
        <div>
          <Habbits userId={session.user.id} token={session?.accessToken as string}/>
        </div>
      </div>
    );
  } catch (error) {
    const err = error as Error;
    return <div>{err.message}</div>;
  }
}
