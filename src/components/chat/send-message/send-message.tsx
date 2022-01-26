import Image from "next/image"
import styles from "./sent-message.module.scss";

export const SendMessage = ({ register, formHandler, handleSubmit, handlePreview, handleFiles, removeElement, files, setFiles, setPreviewFiles, previewFiles }: any) => {
  return (
    <form onSubmit={handleSubmit(formHandler)} action="" className={styles.send_message}>
      <div className={`form_group  ${styles.group}`}>
        <div className={styles.inputContainer}>
          <input
            {...register("message", {
              //   validate: {
              //     trapSpacesForRequiredFields: (value: any) => {
              //       return !!value.trim()
              //     },
              //   },
            })}
            className={styles.sendMessage_input}
            placeholder="إكتب هنا ..."
            name="message"
            id=""
          />

          <div className={styles.images}>
            {previewFiles?.map((previewFile: any, index: number) => {
              return (
                <div key={index} className={styles.image_button}>
                  <Image src={previewFiles[index]} alt="" className={styles.image} width="60px" height="60px" />
                  <button
                    className={styles.delete}
                    type="button"
                    onClick={() => {
                      let filteredItems = removeElement(previewFiles, index + 1);
                      // console.log(filteredItems)
                      setPreviewFiles(filteredItems);

                      let filteredImages = removeElement(files, index + 1);
                      // console.log("filterdFiles", filteredImages)
                      setFiles(filteredImages);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <button
            className={styles.uploadImage}
            type="button"
            onClick={() => {
              // document.getElementById("file")?.click()
            }}
          >
            <i className="far fa-smile-wink"></i>
          </button>
          <input
            {...register("files", {
              onChange: (event: any) => {
                handleFiles(event);
                handlePreview(event);
              },
            })}
            multiple
            type="file"
            name="files"
            id="file"
            className={styles.inputFile}
          />
          <button
            className={styles.uploadImage}
            type="button"
            onClick={() => {
              document.getElementById("file")?.click();
            }}
          >
            <i className="fas fa-paperclip"></i>
          </button>
        </div>
      </div>

      <div className={styles.submit}>
        <button type="submit" className={styles.submit_button}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
