"use strict";

var _require = require('customize-cra'),
    useBabelRc = _require.useBabelRc,
    override = _require.override;

module.exports = override(useBabelRc());