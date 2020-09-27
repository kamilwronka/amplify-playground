import React, { useState } from "react";
import { DefaultButton, Stack } from "@fluentui/react";
import { API } from "aws-amplify";
import axios from "axios";

export default function UploadField() {
  const [file, setFile] = useState({ url: "", file: null });
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    const fileObject = event.target.files[0];
    setFile({ file: fileObject, url: URL.createObjectURL(fileObject) });
  };

  const uploadToS3 = async (presignedUrl) => {
    return axios.put(presignedUrl, file.file, {
      headers: { ContentType: file.file.type },
    });
  };

  const handleFileUpload = async () => {
    console.log(file);
    const response = await API.get("memes-authorized", "/presignedUrl");
    const s3response = await uploadToS3(response.presignedUrl);
    await API.post("memes-authorized", "/upload", {
      body: {
        url: response.presignedUrl.split("?")[0],
        title: title,
      },
    });
    console.log(s3response);
    setFile({ file: null, url: "" });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Stack vertical>
      <input type="file" id="meme" name="meme" onChange={handleChange} />
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={handleTitleChange}
        value={title}
      />
      <img src={file.url} alt="" style={{ maxWidth: 1366 }} />
      <DefaultButton text="Upload " onClick={handleFileUpload} />
    </Stack>
  );
}
