import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

interface DetailsCardProps {
  heading: string;
  children: React.ReactNode;
}
const Detailscard = ({ heading, children }: DetailsCardProps) => {
  return (
    <Card className="shadow-lg bg-gray-50 w-full">
      <CardHeader>
        <CardTitle className="w-full text-center">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 ">{children}</ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Detailscard;
