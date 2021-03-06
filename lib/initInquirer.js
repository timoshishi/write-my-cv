const inquirer = require('inquirer');
const createCoverQuestions = require('./createCoverQuestions');
const searchJobs = require('./getJobURLs');
const readPersonalization = require('./readPersonalization');
const writeFiles = require('./writeDocs');

const initInquirer = async () => {
  try {
    const initialQuestions = await inquirer.prompt([
      {
        type: 'list',
        name: 'initial',
        message:
          'Would you like to write a cover letter or search for recent job listings?',
        choices: ['Write a cover letter', 'Search Jobs'],
      },
    ]);
    if (initialQuestions.initial === 'Search Jobs') {
      searchJobs();
    } else {
      let personalData = readPersonalization();
      const coverQuestions = createCoverQuestions(personalData);

      const options = await inquirer.prompt(coverQuestions);
      await writeFiles({ ...options, personalData });
    }
    //const unfilledData = checkPersonalData(personalData)
    //if (unfilledData) {
    //const setupQuestions = createSetupQuestions(unfilledData)
    //const personalData = await inquirer.prompt(setupQuestions)
    //await writePersonalization(personalData)
    //personalData = readPersonalization
    // }
  } catch (err) {
    console.error(err);
  }
};

module.exports = initInquirer;
