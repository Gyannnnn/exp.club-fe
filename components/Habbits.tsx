import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import axios from "axios";
import { ProfileHabit } from "@/Types/axiosTypes";

export default async function Habits({ userId, token }: { userId: string; token: string }) {
  const res = await axios.get<ProfileHabit>(`http://localhost:8000/api/v1/habits/getByUserId/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res) {
    return <div><h1>Failed to fetch habits</h1></div>;
  }

  const data = await res.data;
  const habitData = data.habits;
  console.log(data);

  return (
    <Card className="w-full min-h-48">
      <CardHeader>Habits</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {habitData.length === 0 ? (
          <h1>No habits found</h1>
        ) : (
          habitData.map((habit)=> (
            <Card key={habit.id} className="relative h-28 pl-2">
              <h1>{habit.name}</h1>
              <p>{habit.description}</p>
              <Badge
                variant="secondary"
                className="bg-green-500 text-white dark:bg-blue-600 absolute top-2 right-2"
              >
                Completed
              </Badge>
              <Badge
                className="font-bold absolute bottom-2 right-2"
                variant="default"
              >
                {new Date(habit.createdAt).toLocaleDateString()}
              </Badge>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
