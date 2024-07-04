import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function PeopleCard(props) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{props.age}</p>
        <h4 className="font-bold text-large">{props.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={props.src}
          width={100}
        />
      </CardBody>
    </Card>
  );
}
