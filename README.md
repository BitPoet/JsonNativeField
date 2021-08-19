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

## Field types

The latest release lets you assign and change a field type for the value, so you can enter your data
using one of the following formats leveraging native ProcessWire input fields:

- Text
- Integer
- Float
- Date (Format currently fixed as Y-m-d)
- Date + Time (Format fixed as Y-m-d H:i)

Note that there is currently little plausibility checking done (neither in the UI nor in the
PHP code), so changing a field to date and entering a string that can't be parsed as such
will generate an error and probably shoot your data directly into nirvana.

Field types are stored with the data.

<<<<<<< HEAD
## API Usage

You can set field values through the API. The unformatted value for the JsonNativeField is
a JNJsonData object. Every field inside is of the JNJsonValue type.

```php
// Value is string, generates a text field:
$page->nativeField->set("myfield1", "some text in this field");

// Value is an array, first element is the type, second is the value
$page->nativeField->set("myfield2", ["integer", 1234]);

// Value is a JNJsonValue object
$page->nativeField->set("myfield3", new JNJsonValue("datetime", time()));

// Remove a field
$page->nativeField->remove("myfield2");

// Set multiple fields at once
$page->nativeFields->set([
	"myfield1"	=>	["text", "first field content"],
	"myfield2"	=>	["float", 3.141592687],
	"myfield3"	=>	new JNJsonValue("datetime", time() + 7200)
]);
```
=======
## Field Names

Name fields are currently configured to start and end with a letter (a-zA-Z). In between,
alphanumeric characters (a-zA-Z0-9) and hyphens are allowed.

The only field name currently explicitely disallowed is "data". It will be silently dropped.

The table of fields in the backend is sorted by field names in ascending order. In the raw
field, there is no specific order though since object properties aren't positional.

## Configuration

You can configure settings for every type of custom field (date, date+time, integer, float and text)
on the field's Input tab, e.g. min and max length, validation patterns, date and time input and output
formats etc.
>>>>>>> origin/dev

## Known issues

- Selector operator checks aren't implemented yet
- The UI for the inputfield is still a bit rough, as is the JS code
- Some more sanity checks for values are necessary

## ToDo

- Test date output formats
- Add selector operator/sanity checks
- Allow field settings to be changed in template context
- Generate error/warning when "data" field name is rejected

## License

Mozilla Public License v2 (see file "LICENSE" for details)
