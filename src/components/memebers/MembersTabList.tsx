import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FindMembers from "./FindMembers";
import MembersList from "./MembersList";
import {
  ReceiveCollaboratorType,
  useGetAllCollabInSpaceQuery,
} from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";

export function MembersTabList() {
  const { id } = useParams();
  const [email, setEmail] = useState<string>("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const [accepted, setAccepted] = useState<ReceiveCollaboratorType[] | []>([]);
  const [pending, setPending] = useState<ReceiveCollaboratorType[] | []>([]);

  if (!id || typeof id !== "string") {
    return <h1>loading....</h1>;
  }

  const { data: getAllCollab } = useGetAllCollabInSpaceQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (getAllCollab) {
      setAccepted(
        getAllCollab.filter(
          (data: ReceiveCollaboratorType) => data.verified === true
        )
      );
      setPending(
        getAllCollab.filter(
          (data: ReceiveCollaboratorType) => data.verified === false
        )
      );
    }
  }, [getAllCollab, id]);

  const handleEmailInvite = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email && !invitedEmails.includes(email)) {
      setInvitedEmails([...invitedEmails, email]);
      setEmail("");
    }
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
        <FindMembers />
      </TabsContent>
      <TabsContent value="group-members">
        <MembersList data={accepted} id={id} title="Invited Members"/>
      </TabsContent>

      <TabsContent value="pending-request" className="">
      <MembersList data={pending} id={id} title="Pending Members"/>
      </TabsContent>
    </Tabs>
  );
}
