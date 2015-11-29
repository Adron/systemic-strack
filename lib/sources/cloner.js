/**
 * Created by Adron on 11/28/15.
 * Description: This code has the purpose of cloning the list of repositories.
 */



var helper = require("./helpers");
var shell = require("shelljs");

var cloner = {};

cloner.cloneIt = function (url) {
  if (!shell.which("git")) {
    var message = "Sorry, this script requires git to be installed on the system this is executing on.";
    helper.infoContentWrite(message);
    shell.exit(1);
  }

  helper.infoContentWrite("cloning " + url);

  var result = shell.exec("git clone " + url);

  if (result.code !== 0) {
    helper.infoContentWrite("Error: Git commit failed." + result.code);
  } else {
    helper.infoContentWrite(result.output);
  }
};

module.exports = cloner;