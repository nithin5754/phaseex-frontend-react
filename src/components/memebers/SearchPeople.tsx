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


export interface ReceiveNotificationType {
  id:string, 
  ownerId:string,
  senderId:string,
  link:string,
  priority:string,
  title:string,
  type:string,
  read:boolean,
  createdAt:string,
  updatedAt:string

}

const SearchPeople = () => {
  const [searchItem, setSearchItem] = useState<ResponseSUserType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | "">("");
  const [getSearchUser, { isLoading: searchLoading }] = useGetSearchUserMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const user = useAuth();
  const dispatch=useAppDispatch()



  const { socket } = useSocket();
  




  const cache = useSelector((state: RootState) => state.search);
 

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

  const handleSubmit = (userId: string, userName: string) => {
    if (socket && user) {
      socket.emit('sendNotification', {
        senderName: user.userId,
        receiverName: userId,
        type:"invite",
        name: userName,
        message: `${userId} inviting you to join our space`,
      });
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
        <div className="border dark:border-border w-[90%] m-auto mt-4 rounded-md">
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
                            onClick={() => handleSubmit(search.id, search.userName,)}
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
      {/* <h1>{notification} message</h1> */}
    </div>
  );
};

export default SearchPeople;
