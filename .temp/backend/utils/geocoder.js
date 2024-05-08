"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var NodeGeocoder = require('node-geocoder');
var options = {
    fetch: node_fetch_1.default,
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
};
var geoCoder = NodeGeocoder(options);
exports.default = geoCoder;
