"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
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
const ChatWidget = () => {
    const [chats, setchats] = useState<chattype[]>([{ message: "Welcome to Financial Nexus", message_by:"ai" }])
    const { auth } = userfirebase()
    const [show, setshow] = useState(false)
    const pathname = usePathname()
    const [prevchats, setprevchats] = useState<chattype[] | null>(null)
    const toggle = () => {
        setshow(value => (!value))
    }
    const fetchprevchats = async () => {
        let idtoken = await auth.currentUser?.getIdToken()
        if (idtoken) {
            console.log(idtoken)


      let response = await axios.get(SERVER + "/data-get/get-messages/", {
        headers: {
          Authorization: "Bearer " + idtoken,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setprevchats(response.data);
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
    if (idtoken) {
      console.log(idtoken);

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
    form.reset();
  }
  useEffect(() => {
    fetchprevchats();
  }, [auth]);
  return (
    <div
      className={`${
        pathname == "/main/chat" && "hidden"
      } h-full flex items-end py-2`}
    >
      <Button
        onClick={toggle}
        className={`${
          show && "hidden"
        } z-40 absolute aitom-3 right-2 w-24 h-14`}
      >
        FinBot
      </Button>
      <div
        id="chat-container"
        className={`fixed ${!show && "hidden"} aitom-5 z-40 right-4 w-96`}
      >
        <div className="bg-white shadow-md pb-2 rounded-lg max-w-lg w-full">
          <div className=" border-b p-4 bg-gray-900 text-white rounded-t-lg flex justify-between items-center">
            <h1>FinBot</h1>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                onClick={toggle}
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* previos chats  */}
          <div id="chatbox" className="p-4 h-80 overflow-y-auto" >
            {prevchats &&
              prevchats.map((chat, index) =>
                chat.message_by === "user" ? (
                  <div className="mb-2 text-right" key={index}>
                    <p className="bg-gray-900 text-white rounded-lg py-2 px-4 inline-block">
                      {chat.message}
                    </p>
                  </div>
                ) : (
                  <div className="mb-2" key={index}>
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                      {chat.message}
                    </p>
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
                  <div key={index} className="mb-2">
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                      {chat.message}
                    </p>
                  </div>
                )
              )}
          </div>

                

                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" justify-evenly flex">
                            <FormField

                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input className='w-[17rem]' placeholder="shadcn" {...field} />
                                        </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;

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
