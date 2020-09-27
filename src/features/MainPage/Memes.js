import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Stack } from "@fluentui/react";

const stackItemStyles = {
  root: {
    maxWidth: 1024,
  },
};

export default function Memes() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    API.get("memes", "").then((memes) => setMemes(memes.Items));
  }, []);

  return (
    <Stack>
      {memes.map((meme) => {
        return (
          <Stack.Item styles={stackItemStyles} key={meme.id}>
            <div>
              <p>{meme.title}</p>
              <img style={{ maxWidth: 1024 }} src={meme.url} alt={meme} />
            </div>
          </Stack.Item>
        );
      })}
    </Stack>
  );
}
