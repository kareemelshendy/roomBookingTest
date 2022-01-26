import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SendMessage } from "../../components/chat/send-message/send-message";

export interface Message {
  messge: "string";
  files?: [File];
}

export const SendMessageHOC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [prviewFiles, setPreviewFiles] = useState<string[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (files) {
      setValue("files", files);
    }
  }, [files]);

  const handlePreview = (event: any) => {
    if (event?.target.files && event.target.files[0]) {
      const fileArray = Array.from(event.target.files).map((file: any) => {
        return URL.createObjectURL(file);
      });
      setPreviewFiles((prviewFiles: any) => prviewFiles.concat(fileArray));
    }
  };
  const handleFiles = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const filesArray = Array.from(event.target.files).map((file: any) => {
        return file;
      });

      setFiles((files: any) => files.concat(filesArray));
    }
  };
  const removeElement = (images: string[], i: number) => images.slice(0, i - 1).concat(images.slice(i, images.length));

  function formHandler(data: Message) {
    console.log(data);
    setPreviewFiles([]);
    setFiles([]);
    reset();
  }
  return <SendMessage register={register} handleSubmit={handleSubmit} formHandler={formHandler} handlePreview={handlePreview} handleFiles={handleFiles} removeElement={removeElement} files={files} setFiles={setFiles} previewFiles={prviewFiles} setPreviewFiles={setPreviewFiles} />;
};
