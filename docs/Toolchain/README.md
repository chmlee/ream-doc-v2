# Toolchain

The following tools are developed around REAM language.
The goal is to provide a user-friendly workflow to create, edit, distribute and reuse REAM files.

## Alpha

- [reamparser.js](https://github.com/chmlee/reamparser.js):
a REAM parser and emitter written in native JavaScript.

- [REAM Editor](https://github.com/chmlee/ream-editor):
a hackable editor for REAM.

- [REAM Editor Lite](https://github.com/chmlee/ream-editor-lite):
a lite version of REAM Editor as a Vue component.

- [prism-ream](https://github.com/chmlee/prism):
a fork of syntax highlighting library [PrismJS](https://github.com/PrismJS/prism) with REAM support added.
I may create a pull request once the language is stable.


## Planned

- reamparser.rs:
A REAM parser and emitter written in Rust.
May replace reamparser.js as the default parser for REAM if the development goes well.

- A project and package manager for REAM, inspired by [python-poetry](https://python-poetry.org) and [Cargo](https://doc.rust-lang.org/cargo/).

- vim-ream:
syntax highlighting for Vim.
