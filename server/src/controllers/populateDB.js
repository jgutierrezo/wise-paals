import teacherFilterModel from "../database/models/tutorModel.js";
import { maleNames, skills, languages } from "./randomLists.js";
import { LoremIpsum } from "lorem-ipsum";
import { unsplashImages } from "./unsplashImages.js";
import { encode, decode } from "node-base64-image";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const postManyTutors = async (req, res) => {
  console.log("Prepare your self");

  const tutors = await tutorList();
  await teacherFilterModel.deleteMany({}).then((error) => {
    console.log("Deleted all tutors");
  });
  await teacherFilterModel
    .insertMany(tutors)
    .then(() => {
      console.log("Good");
    })
    .catch((error) => res.status(409).json({ message: error.message }));
};

const tutorList = async () => {
  const tutors = [];
  const picturesList = await randomPictures();
  for (let i = 0; i < 30; i++) {
    const randomSkills = generateRandomList(skills);
    tutors.push({
      name: maleNames[i],
      description: lorem.generateSentences(5),
      skills: randomSkills,
      spokenLanguages: randomLanguages(randomSkills),
      lessonCost: getRandomInt(4, 100),
      picture: picturesList[i],
    });
  }
  console.log("tutors: ", tutors);
  return tutors;
};

const randomPictures = async () => {
  let unsplashApiCallResult;
  const imagesUrls = [];
  for (let i = 0; i < 1; i++) {
    unsplashApiCallResult = await unsplashImages(i);
    switch (unsplashApiCallResult.type) {
      case "error":
        console.log("error occurred: ", result.errors[0]);
      case "success":
        imagesUrls.push(
          unsplashApiCallResult.response.results.map((image) => image.urls.full)
        );
    }
  }
  const imagesUrlList = [];
  imagesUrls.map((page) => page.map((url) => imagesUrlList.push(url)));
  console.log("imagesUrls: ", imagesUrlList.length);
  console.log("imagesUrls: ", imagesUrlList);
  return imagesUrlList;
};

const randomLanguages = (randomSkills) => {
  const languagesList = generateRandomList(languages);
  const languagesIncludedInSkills = [];
  languagesList.some((language) => {
    if (randomSkills.includes(language))
      languagesIncludedInSkills.push(language);
    return true;
  });
  if (languagesIncludedInSkills)
    return languagesList.concat(languagesIncludedInSkills);
  return languagesList;
};

const generateRandomList = (referenceList) => {
  var newList = [];
  for (let i = 0; i < getRandomInt(1, 5); i++) {
    newList.push(referenceList[getRandomInt(1, referenceList.length)]);
  }
  //Delete duplicates
  return [...new Set(newList)];
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
