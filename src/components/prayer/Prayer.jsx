import { Card, CardContent, CardMedia} from "@mui/material";
import React from "react";


export default function Prayer({name ,time ,img}) {
  return (
    <>
      <Card  sx={{ maxWidth: 345, }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={img}
        />
        <CardContent>
          < h2>
          {name}
          </h2>
          <h1 >
    {time}
          </h1>
          </CardContent>
      </Card>
    </>
  );
}
