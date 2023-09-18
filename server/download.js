import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    console.log("Baixando o vídeo:", videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("Esse vídeo não é um Shorts")
        }
      })
      .on("end", () => {
        console.log("Download finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log("Erro:", error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
