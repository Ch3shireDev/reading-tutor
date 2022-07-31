import stream from "stream";

export interface IAudioCapture {
    capture(): stream.Readable;
}