"use client";


import { SelectTrigger } from "@radix-ui/react-select";

import { ArrowUp, CheckCircle2, Download, Eye, HardHat, Trash2, VenusAndMars } from "lucide-react";
import * as React from "react";


import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "@/components/ui/fragments/data-table-action-bar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/fragments/select";
import { Separator } from "@/components/ui/fragments/separator";
import { StatusEvents, StatusMerchandise, visibilityValue } from "@/config/enum-type";




interface TasksTableActionBarProps {
table: number[];
    setSelected: (value: React.SetStateAction<number[]>) => void

  onTaskDelete: () => void;
isPending: boolean

   onTaskUpdate: ({ field, value, }: {
    field: "status" | "visibility" ;
    value: string;
   
}) => void
}

export function TasksTableActionBar({ setSelected, table, onTaskUpdate, isPending, onTaskDelete}: TasksTableActionBarProps) {




   
  return (
    <DataTableActionBar setSelected={setSelected} table={table} visible={table.length > 0}>
      <DataTableActionBarSelection table={table} setSelected={setSelected} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5 text-accent-foreground">
          <Select
          onValueChange={(value: string) =>
            onTaskUpdate({ field: "status", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update status"
              isPending={isPending}
            >
              <CheckCircle2 className=" " />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {StatusMerchandise.map((status) => (
                <SelectItem key={status.label} value={status.value} className="capitalize">
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
          <Select
          onValueChange={(value: string) =>
            onTaskUpdate({ field: "visibility", value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update Visibility"
              isPending={isPending}
            >
              <Eye/>
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {visibilityValue.map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className="capitalize"
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DataTableActionBarAction
          size="icon"
          tooltip="Delete tasks"
          isPending={isPending}
          onClick={onTaskDelete}
        >
          <Trash2 />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  );
}
