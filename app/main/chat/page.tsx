"use client"
import React, { useEffect, useState } from "react";

import axios from "axios";
import { userfirebase } from "@/context/firebase";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/markdownrender";
const SERVER =
  "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io";
interface chattype {
  message: string;
  message_by: "user" | "ai";
  created_at?: string;
  id?: string;
}
const formSchema = z.object({
  message: z.string().min(1, {
    message: "message is required",
  }),
});
const ChatPage = () => {
  const [chats, setchats] = useState<chattype[]>([]);
  const { auth } = userfirebase();
  const [show, setshow] = useState(false);
  const pathname = usePathname();
  const [prevchats, setprevchats] = useState<chattype[] | null>(null);
  const toggle = () => {
    setshow((value) => !value);
  };
  const fetchprevchats = async () => {
    let idtoken = await auth.currentUser?.getIdToken();
    if (idtoken) {
      try {

        let response = await axios.get(SERVER + "/data-get/get-messages/", {
          headers: {
            Authorization: "Bearer " + idtoken,
            "Content-Type": "application/json",
          },
        });
        setprevchats(response.data);
      }
      catch (err) {
        setprevchats([])
        console.log(err)
      }
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setchats((value) => [
      ...value,
      { message: values.message, message_by: "user" },
    ]);
    const idtoken = await auth.currentUser?.getIdToken();
    form.reset();
    if (idtoken) {

      let response = await axios.post(
        SERVER + "/data-add/add-message/",
        {
          message: values.message,
        },
        {
          headers: {
            Authorization: "Bearer " + idtoken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setchats((value) => [
          ...value,
          { message: response.data[1].message, message_by: "ai" },
        ]);
      } else {
        setchats((value) => [
          ...value,
          {
            message: "I am Sorry. There's some error on the server.",
            message_by: "ai",
          },
        ]);
      }
    } else {
      setchats([...chats, { message: "some error occured", message_by: "ai" }]);
    }

  }
  useEffect(() => {
    fetchprevchats();
  }, [auth]);
  return (
    <div className="flex-1 w-full">




      <div className="h-screen overflow-y-auto p-4 pb-36">

        {prevchats &&
          prevchats.map((chat, index) =>
            chat.message_by === "user" ? (
              <div className="mb-2 text-right" key={index}>
                <p className="bg-gray-900 text-white rounded-lg py-2 px-4 inline-block">
                  {chat.message}
                </p>
              </div>
            ) : (
              <div key={index} className="flex mb-4 cursor-pointer">
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                  <p className="text-gray-700">
                    <MarkdownRenderer content={chat.message} />
                  </p>
                </div>
              </div>
            )
          )}
        {!prevchats && <div>Loading</div>}
        {chats.length > 0 &&
          chats.map((chat, index) =>
            chat.message_by === "user" ? (
              <div key={index} className="mb-2 text-right">
                <p className="bg-gray-900 text-white rounded-lg py-2 px-4 inline-block">
                  {chat.message}
                </p>
              </div>
            ) : (
              <div key={index} className="flex mb-4 cursor-pointer">
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                  <p className="text-gray-700">
                    <MarkdownRenderer content={chat.message} />
                  </p>
                </div>
              </div>
            )
          )}



      </div>


      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" px-2s  space-x-2 flex fixed bottom-0 p-2   w-4/5 "
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" bg-white w-[60rem] flex"
                    placeholder="Type your message here"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>

  );
};

export default ChatPage;

// left
{
  /* <div className="mb-2">
<p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">Welcome to Financial Nexus</p>
</div> */
}
// right
{
  /* <div className="mb-2 text-right">
<p className="bg-gray-900 text-white rounded-lg py-2 px-4 inline-block">hello</p>
</div> */
}
