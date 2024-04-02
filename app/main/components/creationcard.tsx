import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface CreationCardProps {
  heading: string;
  details?: string;
}
const CreationCard = ({ heading, details }: CreationCardProps) => {
  return (
    <Card className="w-full bg-gray-100 shadow-lg cursor-pointer">
      <CardHeader>
        <CardTitle className="">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        {details && (
          <CardDescription>
            <Button
              variant="default"
              className="w-full shadow-lg hover:scale-105 transition-all"
            >
              Add
            </Button>
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default CreationCard;
