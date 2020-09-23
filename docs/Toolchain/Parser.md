# Markdata.js

[Markdata.js](https://github.com/chmlee/markdata.js) is the parser and emitter for Markdown files, and is the core of the Markdata toolkit.

::: tip
There is no need to download markdata.js if you are using Markdata Editor, as it is already included.
:::

## Requirement

- [Node.js](https://nodejs.org)

## Download

If you have [git](https://github.com/chmlee/markdata.js), you can clone the repository

```shell
$ git clone https://github.com/chmlee/markdata.js
```
otherwise download the repository from [GitHub](https://github.com/chmlee/markdata.js)

## Usage

### JavaScript

The `markdata.min.js` file exports `MdFile` class:

```js
const { MdFile } = reqruie('/path/to/markdata.min.js');
const mdFile = new MdFile(text);
const csv = mdFile.toCSV();
const tree = mdFile.toTree();
```

### CLI

An experimental command-line tool `parsemd` is also available for Linux and macOS, but requires [Node.js](https://nodejs.org) and [commander.js](https://github.com/tj/commander.js/).
It takes a path of a Markdata file as input, and write the dataset to stdout.

```shell
$ ./parsemd /path/to/md/file
```

A more useful way to use this command is to write the output to a file.

```shell
$ ./parsemd /path/to/md/file > output.csv
```

You may have to modify the shebang of the script depending on your operating system.
