"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function Ai() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [imageString, setImageString] = useState<string | null>(null);
  const [messageResult, setMessageResult] = useState<string | null>(null);
  const [messageAsk, setMessageAsk] = useState<string>("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({ width: 540, height: 360 });
    if (imageSrc) {
      setImageString(imageSrc);
      GenerateMessage(imageSrc);
    }
  }, [webcamRef, messageAsk]);

  const GenerateMessage = async (imageSrc: string) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = messageAsk || "What is in this photo?";
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageSrc.split(",")[1],
            mimeType: "image/jpeg",
          },
        },
      ]);

      setMessageResult(result.response.text());
    } catch (error) {
      console.error("Error analyzing the image:", error);
      setMessageResult("Failed to analyze the image.");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setCaptureEnable((state) => !state)}>
            {isCaptureEnable ? "Close" : "Open Camera"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          {imageString ? (
            <Image src={imageString} alt="capture" width={540} height={360} />
          ) : (
            <>
              {isCaptureEnable && (
                <Webcam audio={false} width={540} height={360} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
              )}
            </>
          )}
        </Grid>
        {imageString != null && (
          <Grid item xs={12}>
            <Button variant="outlined" onClick={() => setImageString(null)}>
              {"Re Capture"}
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            type="text"
            label="Command"
            name="Command"
            fullWidth
            margin="normal"
            value={messageAsk}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageAsk(e.target.value)}
          />
          {isCaptureEnable && !imageString && (
            <Button variant="outlined" onClick={capture}>
              {"Send"}
            </Button>
          )}
          {messageResult && (
            <>
              <Typography variant="h5">{"Result"}</Typography>
              <Typography variant="body2">{messageResult}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
