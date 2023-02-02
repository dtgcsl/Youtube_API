const axios = require("axios").default;
const fs = require("fs");

// test-1 AIzaSyCLzEkftCyo2hRY-v29Zkq2j77tlPADX-4
// test-2 AIzaSyC92IKgGLOzPXweagGk-NzU1SULeS8R9nA
// test-3 AIzaSyBh2auJ-aidvV1gU2AxeAyqipFsW2Fke0s
// test-3 AIzaSyAwSCynbvfAmhlxAfT7ID2wDYb_Y1crKi0
// test-4 AIzaSyCNaLzPuzMjziuXeEEC19Co4BDy8UULdFY
// AIzaSyDBO377vgmqEbMKjtiRuN0mqSctWbfpAr8
// AIzaSyAMUawUoFK8BuEhdN5L1W56h2sntroW95U
const APIkey = "AIzaSyAMUawUoFK8BuEhdN5L1W56h2sntroW95U";

let videoIds = [];

const a = async (pageToken) => {
  try {
    // https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCp_l_2FmtgbEABkDqyLbRLA&maxResults=50&key=AIzaSyDBO377vgmqEbMKjtiRuN0mqSctWbfpAr8

    // GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCp_l_2FmtgbEABkDqyLbRLA&key=[YOUR_API_KEY]
    const res = await axios({
      method: "get",
      url: "https://youtube.googleapis.com/youtube/v3/search",
      params: {
        part: "snippet",
        channelId: "UCp_l_2FmtgbEABkDqyLbRLA",
        maxResults: "50",
        type: "video",
        key: APIkey,
        pageToken: pageToken,
      },
    });
    if (res.statusText === "OK") {
      // console.log("response", res.data.items);

      // console.log(total);
      // let videoIds = [];
      res.data.items.map((item) => {
        console.log("---", item);
        // TEXT

        // let data = ` ${item.id.videoId} / ${item.snippet.title} / ${item.snippet.thumbnails.high.url}\n`;
        // fs.appendFile("data.txt", data, (err) => {
        //   if (err) {
        //     console.log(err);
        //   }
        // });

        //////////////////////////////////////////////
        // JSON
        // if (item.id.videoId == null) {
        // console.log("---", item);
        // }
        videoIds.push({
          id: item.id.videoId,
          name: item.snippet.title,
          thumbnails: item.snippet.thumbnails.high.url,
        });
      });
    }
    if (res.data.nextPageToken == null)
      return fs.appendFile("data.json", JSON.stringify(videoIds), (err) => {});
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return a(res.data.nextPageToken);
  } catch (err) {
    console.log(err.response);
    console.log("Error", err);
  }
};
a();

// a("CDIQAA");
// a("CGQQAA");
// a("CJYBEAA");
// a("CMgBEAA");

// `${youtubeUrl}/playlists?part=${paramGetPlaylistArr.part}&channelId=${channelID}&maxResults=${paramGetPlaylistArr.maxResults}&key=${APIKey}`);

// https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCp_l_2FmtgbEABkDqyLbRLA&maxResults=50&key=AIzaSyDBO377vgmqEbMKjtiRuN0mqSctWbfpAr8
