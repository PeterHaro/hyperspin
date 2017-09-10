const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require("path");
const crypto = require("crypto");

const Configuration = function () {
    "use strict";
    const hyperspinChecksum = "";
    var _hyperspinInstallPath = "";
    var _hyperspinVersion = "";
    var _installedEmulators = "";

    function populateFromConfigurationFile(configurationFile) {
        try {
            fs.readFile(path.join(__dirname, configurationFile), "utf8", function (err, data) {
                if (err) {
                    console.error(err);
                    throw err;
                }
                let configuration = JSON.parse(data);
                _hyperspinInstallPath = configuration["hyperspin-install-path"];
                _hyperspinVersion = configuration["hyperspin-version"];
                _installedEmulators = configuration["installed-emulators"];
            });
        } catch (e) {
            dialog.showErrorBox("Invalid configuration: ", configurationFile + " is Invalid.\n Exception: " + e);
        }
    }

    function validateHyperspinIntegrity() {

    }

    function validateHyperspinPath() { //TODO: Do me differently with the return values
        fs.stat(this._hyperspinInstallPath, function (err, stat) {
            if (err === null) {
                return true;
            } else if (err.code === 'ENOENT') {
                // file does not exist
                return false;
            } else {
                return false;
            }
        });
    }

    //GETTERS_AND_SETTERS
    function getHyperspinInstallPath() {
        return _hyperspinInstallPath;
    }

    function getHyperspinVersion() {
        return _hyperspinVersion;
    }

    function getInstalledEmulators() {
        return _installedEmulators;
    }

    //__END_GETTERS_AND_SETTERS

    return {
        populateFromConfigurationFile : populateFromConfigurationFile,
        validateHyperspinPath : validateHyperspinPath,
        getHyperspinInstallPath : getHyperspinInstallPath,
        getHyperspinVersion : getHyperspinVersion,
        getInstalledEmulators : getInstalledEmulators
    }

}();