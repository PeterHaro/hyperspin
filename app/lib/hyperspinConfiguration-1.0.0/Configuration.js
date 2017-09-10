const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require("path");
"use strict";

class Configuration {
    _hyperspinInstallPath = "";
    _hyperspinVersion = "";
    _installedEmulators = "";

    constructor(configurationFile) {
        try {
            this.readConfigurationFileAsync(path.join(__dirname, configurationFile), function(configuration) {
                setConfigurationParameters(configuration);
            });

        } catch (e) {
            dialog.showErrorBox("Invalid configuration", configurationFile + " is Invalid.\n Exception: " + e);
        }
    }

    readConfigurationFileAsync(configurationFilePath, callback) {
        fs.readFile(configurationFilePath, "utf8", function (err, data) {
            if (err) {
                console.error(err);
                throw err;
            }
            callback(JSON.parse(data.toString()));
        });
    }

    setConfigurationParameters(configuration) {
        this._hyperspinInstallPath = configuration["hyperspin-install-path"];
        this._hyperspinVersion = configuration["hyperspin-version"];
        this._installedEmulators = configuration["installed-emulators"];
    }

    validateHyperspinPath() { //TODO: Do me differently with the return values
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


    //GENERATED_GETTERS_AND_SETTERS
    get hyperspinInstallPath() {
        return this._hyperspinInstallPath;
    }

    set hyperspinInstallPath(value) {
        this._hyperspinInstallPath = value;
    }

    get hyperspinVersion() {
        return this._hyperspinVersion;
    }

    set hyperspinVersion(value) {
        this._hyperspinVersion = value;
    }

    get installedEmulators() {
        return this._installedEmulators;
    }

    set installedEmulators(value) {
        this._installedEmulators = value;
    }

    //__END_GENERATED_GETTERS_AND_SETTERS
}

module.exports = Configuration;