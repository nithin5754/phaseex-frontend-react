import { useGetSearchUserMutation } from "@/app/redux/api/searchApi";
import { useEffect, useRef, useState } from "react";
import { ResponseSUserType } from "@/features/types/searchType";
import { SearchUser } from "../search/index";
import { LottieAnimation } from "../lootie/Lootie";
import noSearchUser from "../../../public/json/empty-user-1.json";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { AUserSearch } from "../Avatar";
import { PlusCircleIcon } from "lucide-react";
import { UserSearchSkeleton } from "../shimmer/index";
import { useSelector } from "react-redux";
import { cacheResults } from "@/app/redux/slice/searchSlice";
import { RootState, useAppDispatch } from "@/app/redux/api/store";

import useAuth from "@/hooks/useAuth";

import { useSocket } from "@/app/socketContext";
import { SpaceCollabSendType, useAddCollaboratorsMutation, useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/app/redux/api/UserApi";
import { toast } from "../ui/use-toast";

export interface ReceiveNotificationType {
  id: string;
  ownerId: string;
  senderId: string;
  link: string;
  priority: string;
  title: string;
  type: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

const SearchPeople = () => {
  const [searchItem, setSearchItem] = useState<ResponseSUserType[] | null>(
    null
  );
   const {id}=useParams()

   const user = useAuth();
   const dispatch = useAppDispatch();
 
   const { socket } = useSocket();
 
   const cache = useSelector((state: RootState) => state.search)

   if(!id||typeof id !== 'string'){
    return <h1>loading...</h1>
   }

  const [searchQuery, setSearchQuery] = useState<string | "">("");
  const [getSearchUser, { isLoading: searchLoading }] =
    useGetSearchUserMutation();

    const {data:getSingleWorkSpace}=useGetSingleWorkSpaceQuery(id,  {
      pollingInterval:120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })


    const {data:getUserById}=useGetUserByIdQuery(undefined,  {
      pollingInterval:120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    })


   

  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  const [addCollaborators]=useAddCollaboratorsMutation()



  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!searchQuery.trim()) {
      setSearchItem(null);
      return;
    }

    if (cache[searchQuery]) {
      setSearchItem(cache[searchQuery]);
    } else {
      timer = setTimeout(() => {
        fetch();
      }, 300);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, cache]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  const fetch = async () => {
    setSearchItem(null);
    const response = await getSearchUser(searchQuery).unwrap();
    if (response && response.length > 0) {
      setSearchItem(response);
      dispatch(cacheResults({ [searchQuery]: response }));
    }
  };
  
 
  const handleSubmit = async(userId: string, userName: string) => {

    if (socket && user&&getSingleWorkSpace&&getUserById) {
    let collabData:SpaceCollabSendType={
      workspaceId:getSingleWorkSpace?.id,
      collaboratorId:userId
    }
      try {
        const response=await addCollaborators(collabData).unwrap()
        console.log(response,"add collabarators")
          const inviteLink = `/invite?workspace=${getSingleWorkSpace.id}&username=${userId}&notificationId=`;
          socket.emit("sendNotification", {
            senderId: user.userId,
            receiverName: userId,
            workspaceName:getSingleWorkSpace.title,
            Description:`hey ${userName} . I am reaching out to invite you to join our upcoming team-building event. This gathering is designed to foster stronger bonds among our team members, encouraging open communication and collaborative problem-solving. Your participation will not only enrich our team dynamics but also offer you a platform to share your ideas and learn from your peers .Please confirm it by clicking accept button  Looking forward to your positive response.`,
            type: "invite",
            messageReceiver:userName,
            link:inviteLink,
            messageSendBy:getUserById.userName,
            message: `${getUserById.userName} inviting you to join our space ${getSingleWorkSpace.title}`,
          });
      } catch (error:any) {
        if (!error.status) {
          toast({
            title: "no response",
            variant: "destructive",
          });
        } else if (error.status) {
          toast({
            title: `${error.data.message}`,
            variant: "destructive",
          });
        }
      
      }
       
    }
  };

  return (
    <div className="bg-white w-[80%] m-auto overflow-hidden dark:bg-background dark:text-primary dark:border-border">
      <SearchUser
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        inputRef={inputRef}
        setShowSuggestions={setShowSuggestions}
      />
      {showSuggestions && (
        <div className="border dark:border-border w-[90%] m-auto mt-4 rounded-md z-50">
          <Command>
            <CommandList>
              <>
                {!searchLoading ? (
                  <CommandGroup heading="Suggestions">
                    {searchItem && searchItem.length > 0 ? (
                      searchItem.map((search: ResponseSUserType) => (
                        <CommandItem key={search.id}>
                          <PlusCircleIcon
                            className="mr-4"
                            onClick={() =>
                              handleSubmit(search.id, search.userName)
                            }
                          />
                          <AUserSearch />
                          {search.userName}
                        </CommandItem>
                      ))
                    ) : (
                      <CommandEmpty>
                        <LottieAnimation
                          animationData={noSearchUser}
                          height={100}
                          width={300}
                        />
                      </CommandEmpty>
                    )}
                  </CommandGroup>
                ) : (
                  <>
                    <UserSearchSkeleton />
                    <UserSearchSkeleton />
                  </>
                )}
              </>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchPeople;
