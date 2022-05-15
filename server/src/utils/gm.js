import fs from "fs";
import gm from "gm";

fs.readFile(
  "alireza-zarafshani-F0ZhXJs2LP0-unsplash.jpg",
  "utf8",
  function (err, data) {
    if (err) throw err;
    console.log(data);
  }
);

// resize and remove EXIF profile data
gm("alireza-zarafshani-F0ZhXJs2LP0-unsplash.jpg")
  .resize(240, 240)
  .noProfile()
  .write("resize.png", function (err) {
    if (!err) console.log("done");
  });
