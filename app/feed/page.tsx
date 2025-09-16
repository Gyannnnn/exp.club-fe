import { auth } from "@/auth";
import LoginFirst from "@/components/LoginFirst";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedRes } from "@/Types/axiosTypes";
import axios from "axios";
import React from "react";

export default async function FeedPage() {
  const session = await auth();
  if (!session?.user) {
    return <LoginFirst />;
  }
  try {
    const res = await axios.get<FeedRes>(
      `https://exp-club-be.vercel.app/api/v1/habits/getuserfeed/${
        session.user.id as string
      }`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const feedData = res.data.habits;
    
    return (
      <div className="w-full h-full mb-20 mt-10 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold">
              Habits Feed
            </CardTitle>
            <p className="text-muted-foreground">
              Habits from you and people you follow
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {feedData.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-muted-foreground">
                  No habits found
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Start following people or create habits to see them here.
                </p>
              </div>
            ) : (
              feedData.map((habit) => (
                <Card key={habit.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="flex flex-col sm:flex-row items-start p-4 gap-4">
                    <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${habit.user.userName}`} />
                        <AvatarFallback>{habit.user.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-semibold">{habit.user.userName}</h3>
                        <span className="text-xs text-muted-foreground">
                          {habit.user.userBio}
                        </span>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-bold text-primary">{habit.name}</h2>
                        <p className="text-sm text-muted-foreground">{habit.description}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-2">
                        <Badge variant="outline" className="text-xs w-fit">
                          {habit.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(habit.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    
                  </div>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.log(error);
    const err = error as Error;
    return (
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-destructive">Follow users to get their habits</h2>
            
            <p className="mt-2 text-muted-foreground">{err.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}