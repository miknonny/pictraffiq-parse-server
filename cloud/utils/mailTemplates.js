/**
* @param{string} username
* @return{object} welcomeUser and cameraUpates
*/
var mailTemplates = (username) => {
  return {
    /**
     * Welcomes the user to Pictraffiq
     */
    welcomeUser: () => {
      return `
        Sup ${username}, <br /> We are (happy) to have you join our large
        family.<br />
      `
    },

    /**
     * @param{object} new locations where cams where installed
     */
    cameraUpdates: (locations) => {
      return `
        hey ${username} <br /> We have added added more traffic cams. <br />
        Cams below <br />
        ${locations}
      `
    }
  }
}

module.exports = mailTemplates
