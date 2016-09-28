# JsonNativeField
ProcessWire module for tabular key-value input field with native JSON storage and search in MySQL

## Contained modules

- FieldtypeJsonNative
- InputfieldJsonNativeFields

## Status

Very alpha, use at your own risk (but feel free to report bugs or suggest improvements).

## Requirements

- MySQL >= 5.7.8
- InnoDB storage engine (needs to be set when installing ProcessWire)

## Description

Adds a fieldtype for storing JSON objects in native MySQL JSON columns, and a matching inputfield
for changing that data.

This provides a flexible key-value store independent of regular field types yet searchable through
ProcessWire's regular selector syntax.

## Usage scenario

The fieldtype was created with supporting user-defined fields e.g. for personal profiles in mind.

## Known issues

- Selector operator checks aren't implemented yet
- Currently, all values are treated as strings
- The UI for the inputfield is still a bit rough, as is the JS code
- Some more sanity checks for field names and values are necessary

## License

Mozilla Public License v2 (see file "LICENSE" for details)
