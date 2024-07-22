import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { UserCheck } from "lucide-react";
import { ToolTipTempalte } from "../aceternityuI";

interface Props {
  role: string;
  setIsRole: React.Dispatch<
    React.SetStateAction<"listManager" | "spaceOwner" | "viewer">
  >;
}

export function UpdateRoleMemberCollab({ role, setIsRole }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-none dark:bg-background  dark:border-none dark:text-primary w-[100px] text-sm font-thin"
        >
          <ToolTipTempalte
            tipTitle={UserCheck}
            tipContent={role}
            iconSize={18}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>set list role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={role}
          onValueChange={(value) =>
            setIsRole(value as "listManager" | "spaceOwner" | "viewer")
          }
        >
          <DropdownMenuRadioItem value="listManager">
            listManager
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="spaceOwner">
            spaceOwner
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="viewer">viewer</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
