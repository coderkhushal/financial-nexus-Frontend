import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EditProfile from "./EditProfile";
import { userfirebase } from "@/context/firebase";
import { getHeaders } from "@/helpers/getHeaders";

const Personal = () => {
  const [detail, setDetail] = useState("");
  const { User } = userfirebase();
  const firebase_user_id = User?._tokenResponse.idToken;

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(firebase_user_id);
      if (firebase_user_id) {
        const res = await fetch(
          "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/user/get-user/",
          { method: "GET", headers: getHeaders(firebase_user_id) }
        );
        const data = await res.json();
        setDetail(data);

        console.log(data);
      }
    };

    if (firebase_user_id) {
      fetchProfile();
    }
  }, [firebase_user_id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>
          <div className="flex justify-between">
            <h2>Secure and Private</h2> <EditProfile />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            className="w-full outline-none focus:outline-none shadow-none"
            defaultValue={detail.name}
            readOnly
          />
        </div>
        <div className="grid gap-3 mb-4">
          <Label htmlFor="name">Email</Label>
          <Input
            id="name"
            type="text"
            className="w-full"
            defaultValue={detail.email}
            readOnly
          />
        </div>
        <div className="grid gap-3 mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
            className="min-h-32"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Personal;
