import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Check, Mail, Search, UserPlus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export function MembersTabList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);

  // Mock user data - in a real app, this would come from an API
  const mockUsers: User[] = [
    {
      id: 1,
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Sam Taylor",
      username: "samt",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Jordan Lee",
      username: "jlee",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Casey Morgan",
      username: "cmorgan",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      name: "Riley Smith",
      username: "rsmith",
      avatar: "/api/placeholder/40/40",
    },
  ];

  // const mockUsers: User[] = [];

  const filteredUsers: User[] = searchQuery
    ? mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockUsers;

  const handleEmailInvite = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email && !invitedEmails.includes(email)) {
      setInvitedEmails([...invitedEmails, email]);
      setEmail("");
    }
  };

  const handleUserInvite = (user: User): void => {
    if (!invitedUsers.some((u) => u.id === user.id)) {
      setInvitedUsers([...invitedUsers, user]);
    }
  };

  const isUserInvited = (userId: number): boolean => {
    return invitedUsers.some((user) => user.id === userId);
  };

  return (
    <Tabs defaultValue="invite-email" className="w-full ">
      <TabsList className="grid w-full grid-cols-4 ">
        <TabsTrigger value="invite-email">Invite</TabsTrigger>
        <TabsTrigger value="invite-search">Search </TabsTrigger>
        <TabsTrigger value="group-members">Members</TabsTrigger>
        <TabsTrigger value="pending-request">Pending</TabsTrigger>
      </TabsList>
      <TabsContent value="invite-email">
      <Card className="h-full w-full  border border-transparent">
            <CardHeader>
              <CardTitle>Invite Friends</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="">
                <form onSubmit={handleEmailInvite} className="mb-4">
                  <div className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        placeholder="Enter email address"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                    >
                      Invite
                    </button>
                  </div>
                </form>

                {/* List of invited emails */}
                {invitedEmails.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      Invited Emails:
                    </h3>
                    <div className="space-y-2">
                      {invitedEmails.map((invitedEmail, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm bg-blue-50 p-2 "
                        >
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>{invitedEmail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
      </TabsContent>
      <TabsContent value="invite-search">
  
          <Card className=" h-full border border-transparent">
            <CardHeader>
              <CardTitle>Find Members</CardTitle>
            </CardHeader>
              
      
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <div className="relative mb-8">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search by name or username"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:text-black rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <ScrollArea className="h-[36vh] w-full  border border-transparent">
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between px-3 py-1 border   "
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUserInvite(user)}
                      disabled={isUserInvited(user.id)}
                      className={`p-2  ${
                        isUserInvited(user.id)
                          ? "bg-gray-100 text-gray-400 cursor-default"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      aria-label={isUserInvited(user.id) ? "Invited" : "Invite"}
                    >
                      {isUserInvited(user.id) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <UserPlus className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              </ScrollArea>

         
            </CardContent>
          </Card>

      </TabsContent>
      <TabsContent value="group-members">
      <Card className=" h-[52vh] border border-transparent">
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
          </Card>
      </TabsContent>

      <TabsContent value="pending-request" className="">
      <Card className="h-[58vh] w-full  border border-transparent">
            <CardHeader>
              <CardTitle>Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
          </Card>
      </TabsContent>
    </Tabs>
  );
}
