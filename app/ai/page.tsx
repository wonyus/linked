"use client";

import ButtonAI from "@Components/InputAI/ButtonAI";
import InputText from "@Components/InputAI/InputText";
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
  const [url, setUrl] = useState<string | null>(null);
  const [messageResult, setMessageResult] = useState<string | null>(null);
  const [messageAsk, setMessageAsk] = useState<string>("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      GenerateMessage(imageSrc);
    }
  }, [webcamRef, messageAsk]);

  const GenerateMessage = async (imageSrc: string) => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
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
      <InputText label="Generate" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageAsk(e.target.value)} />
      <header>
        <h1>Camera App</h1>
      </header>
      {!isCaptureEnable ? (
        <ButtonAI label="Start" onClick={() => setCaptureEnable(true)} />
      ) : (
        <>
          <div>
            <ButtonAI label="End" onClick={() => setCaptureEnable(false)} />
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <ButtonAI label="Capture" onClick={capture} />
        </>
      )}
      {url && (
        <>
          <div>
            <ButtonAI label="Delete" onClick={() => setUrl(null)} />
          </div>
          <div>
            <Image src={url} alt="capture" width={540} height={360} />
          </div>
          {messageResult && (
            <div>
              <h2>Generated Message</h2>
              <p>{messageResult}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
