import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const SERVER = "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import EditProfile from "./EditProfile";
import { userfirebase } from "@/context/firebase";
import { getHeaders } from "@/helpers/getHeaders";

type detailtype={
  name:string,
  email: string
}

const Personal = () => {
  const [detail, setDetail] = useState<detailtype | null>();
  const { auth } = userfirebase();

  const fetchProfile = async () => {
    
    if (auth.currentUser) {
      const res = await fetch(
        `${SERVER}/user/get-user/`,
        { method: "GET", headers:await getHeaders() }
      );
      const data = await res.json();
      setDetail(data);
        console.log(data)
    }
  };
  useEffect(()=>{
    fetchProfile()
  }, [auth.currentUser])

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
            defaultValue={detail?.name}
            readOnly
          />
        </div>
        <div className="grid gap-3 mb-4">
          <Label htmlFor="name">Email</Label>
          <Input
            id="name"
            type="text"
            className="w-full"
            defaultValue={detail?.email}
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