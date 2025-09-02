"use client";


import * as React from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/form";
import { Input } from "@/components/ui/fragments/input";

import { cn } from "@/lib/utils";





import { Textarea } from "@/components/ui/fragments/textarea";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/fragments/select"

import PictureImageInput from "@/components/ui/fragments/picture-input";
import { ProductsSchema } from "@/lib/validations/validations";

import MoneyInput from "@/components/ui/fragments/shadcn-ui-money-input";
import { StatusMerchandise, visibility } from "@/config/enum-type";



interface TaskFormProps<T extends FieldValues, >
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
   curentProducts?: ProductsSchema



}

export function TaskForm<T extends FieldValues, >({
  form,
  onSubmit,

 curentProducts,
  children,

  isPending,
}: TaskFormProps<T>) {





   

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex overflow-y-scroll pt-6 md:pt-0 md:overflow-y-clip flex-col gap-4 px-0"
      >
        <main className="space-y-6 mb-6">
          <section className="space-y-10 border-b pb-8 pt-2 px-4 sm:px-6" >


            
            <FormField
              control={form.control}
              name={"name" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Name</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder={`Products name`}
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">{`Your Productss name.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />




            
       
        

<FormField
  disabled={isPending}
  control={form.control}
  name={"image" as FieldPath<T>}
  render={({ field, fieldState }) => (
    <FormItem>
      <FormLabel className={cn(isPending && "text-muted-foreground")}>
        Cover Image
      </FormLabel>
      <FormControl>
        <PictureImageInput
          disabled={isPending}
          value={field.value}
          onChange={(file) => {
            field.onChange(file)
          }}
          defaultValue={curentProducts?.image || undefined }
          error={fieldState.error?.message}
        />
      </FormControl>
      <FormDescription  className=" sr-only">
        Upload gambar image (SVG, PNG, JPG, GIF - max 2MB)
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>




      <MoneyInput
          form={form}
          disable={isPending}
          label="Price"
          name="price"
          placeholder={`Products price`}
        />
            




<FormField
              control={form.control}
              name={"quantity" as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPending && "text-muted-foreground")}>Quantity</FormLabel>
                  <FormControl>
                    <Input 
                
                      placeholder={`Capactity name`}
                      type="number"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className=" sr-only">{`Quantity`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />




          </section>
          
          <section className="space-y-10 px-4 sm:px-6">
            <header>
              <h1 className="text-lg font-semibold">Optional Fields</h1>
              <p className="text-sm text-muted-foreground">These are columns that do not need any value</p>
            </header>
            
            <section className="space-y-10">
         


       



            <FormField
                control={form.control}
                name={"deskripsi" as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPending && "text-muted-foreground")}>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">{`Products deskripsion`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
     







<FormField
          control={form.control}
          name={"status" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                          {StatusMerchandise.map((item,i ) => (

                  <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
                <FormDescription className=" sr-only">You can manage email addresses in your email settings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />



<FormField
          control={form.control}
          name={"visibility" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {visibility.map((item,i ) => (

                  <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
                <FormDescription className=" sr-only">You can manage email addresses in your email settings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />




            </section>
          </section>
        </main>
       
        {children}
      </form>
    </Form>
  );
}