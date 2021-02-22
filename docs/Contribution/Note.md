# Note

This article records some of my random thoughts before and during my work on REAM and its toolchain.
It probably doesn't belong in the official documentation, and will be moved to my personal website in the future.

The first section lists some of the problems I experience when using Microsoft Excel and Word to collect and document social science data.
The second section explains the motivation behind creating REAM.
The third section explains some of the design choices for the toolchain, and how these designs makes REAM an appealing choice for social scientists.

## Problems
The project was inspired by my work at the Cline Center.
I work on the Composition of Religious and Ethnic Groups (CREG) Project, and my task is to merge several existing datasets on ethnic groups in one master dataset, with a region focus on Sub-Saharan Africa.
For every match I make between datasets, I have to update the master dataset, record the rationale in the documentation, as well as the sources that support the match.
That being said, we have documentation for *(almost) every data point* in the master dataset.

We use Microsoft Excel to store the data, and Microsoft Word to document the matches.
However, there are several things I don't like about the workflow.

### Dataset and documentation are separate

For every match I make, I first edit the master dataset in Excel, then edit the documentation in Word.
Recording the same decision is two different applications is tedious and error prone.
The potential inconsistency between the dataset and the documentation not only make the dataset harder to read but also hard to update in the future.

My ideal solution should merge the dataset and its documentation in one single file.

### Large spreadsheets are hard to edit

Spreadsheets are handy tools to organize data when everything fit in my screen.
I can see all the columns and rows, and have a full picture of of my dataset.
The [*What You See Is What You Get (WYSIWYG)*](https://en.wikipedia.org/wiki/WYSIWYG) design is what makes Excel and other spreadsheet applications popular at the first place.

But when the dataset spans beyond my screen, it's most appealing design diminishes.
I have to scroll horizontally and vertically to navigate between cells.
I have to filter and sort and zoom out to squeeze all relevant information into the screen.
I argue that if you need a [hyper-scrolling mouse](https://www.logitech.com/en-us/products/mice/m720-triathlon.910-004790.html) to move between cells comfortably, you are probably using the wrong tool.

My ideal solution should work well with large dataset natively.
One way to do so is to modularize the dataset.

### Spreadsheet's simple structure limits the way we store data

The spreadsheet seems like a perfect format to store social science datasets: each row represents a data point, each column represents a variable, and the entire spreadsheet is essentially one gigantic matrix.

Now consider collecting data to test the following empirical model adapted from Fearon and Laitin (2003) to test whether mountainous countries are more prone to civil war, with GDP as a control variable:

$$CivilWar_{ij} = \beta_{0} + \beta_{1}Mountainous_{j} + \beta_{2}GDP_{ij}$$
where $CivilWar_{ij}$ is civil war onset for country $j$ on year $i$, $Mountainous_{j}$ measures how mountainous country $j$ is, and $GDP_{ij}$ measures the GDP for country $j$ for year $i$.
For the sake of simplicity, let $j \in \{x, y, z\}$ and $i \in \{1, 2\}$.

If stored in the form of spreadsheet, your dataset should look something like:

| $ID$ | $Country$ | $Year$ | $CivilWar$ | $Mountainous$ | $GDP$ |
| --- | --- | --- | --- | --- | --- |
| 1 | $x$ | $1$ | $w_{x1}$ | $m_x$ | $g_{x1}$ |
| 2 | $x$ | $2$ | $w_{x2}$ | $m_x$ | $g_{x2}$ |
| 3 | $y$ | $1$ | $w_{y1}$ | $m_y$ | $g_{y1}$ |
| 4 | $y$ | $2$ | $w_{y2}$ | $m_y$ | $g_{y2}$ |
| 5 | $z$ | $1$ | $w_{z1}$ | $m_z$ | $g_{z1}$ |
| 6 | $z$ | $2$ | $w_{z2}$ | $m_z$ | $g_{z2}$ |

Since the spreadsheet is small and well-ordered, its easy for users to update the data.
Say we want to update $Mountainous$ for country $x$ from $m_x$ to $m'_{x}$, we are able to quickly locate the two $m_x$s and update the data manually - they are stored in column 5 of row 1 and 2.
But if the data is not well-ordered, or the spreadsheet is huge, locating all relevant cells may not be easy, and this may lead to maintenance nightmare.

One solution is to update the relevant cells with a scripting language, such as VBA, Python or R.
So you would do something like `data$Mountainous[data$Country == 'x',] = new_value`in R.
This requires users to be familiar with programming.
Also using any languages other than VBA meaning exporting and re-importing the spreadsheet.

Another solution is to change the way we store data.
Observe that any data point with the same $country$ will have the same $Mountainous$:
Data point where $Country = x$ will always have $Mountain = m_x$, regardless of what $Year$ is.
To save $m_x$ only once in the dataset, we can reorganize the data in a hierarchal form.
In JSON, the structure would be something like:
```json{5,13,21}
{
    "country": [
        {
            "name": "x",
            "Mountainous": "m_x"
            "year": [
                { "name": 1, "CivilWar": "w_x1", "GDP": "g_x1" }
                { "name": 2, "CivilWar": "w_x2", "GDP": "g_x2" }
            ]
        },
        {
            "name": "y",
            "Mountainous": "m_y"
            "year": [
                { "name": 1, "CivilWar": "w_y1", "GDP": "g_y1" }
                { "name": 2, "CivilWar": "w_y2", "GDP": "g_y2" }
            ]
        },
        {
            "name": "z",
            "Mountainous": "m_z"
            "year": [
                { "name": 1, "CivilWar": "w_z1", "GDP": "g_z1" }
                { "name": 2, "CivilWar": "w_z2", "GDP": "g_z2" }
            ]
        }
    ]

}

```
Now there is only one $m_{x}$ in the entire dataset, and the two $GDP$s for country $x$ is associated with this one $m_{x}$.
We just have to convert it to an analysis-ready format, by first flatten the structure into:
```json
[
    {"country_name": "x", "country_Mountainous": "m_x", "year_name": 1, "year_CivilWar": "w_x1", "year_GDP": "g_x1"},
    {"country_name": "x", "country_Mountainous": "m_x", "year_name": 2, "year_CivilWar": "w_x2", "year_GDP": "g_x2"},
    {"country_name": "y", "country_Mountainous": "m_y", "year_name": 1, "year_CivilWar": "w_y1", "year_GDP": "g_y1"},
    {"country_name": "y", "country_Mountainous": "m_y", "year_name": 2, "year_CivilWar": "w_y2", "year_GDP": "g_y2"},
    {"countrz_name": "z", "countrz_Mountainous": "m_z", "year_name": 1, "year_CivilWar": "w_z1", "year_GDP": "g_z1"},
    {"countrz_name": "z", "countrz_Mountainous": "m_z", "year_name": 2, "year_CivilWar": "w_z2", "year_GDP": "g_z2"}
]
```
then convert this into CSV.

But JSON is difficult to edit and read, and it doesn't support comments natively.
My ideal solution should use a human-friendly data serialization standard that works well with hierarchal data.

### I don't like Microsoft Office Suite

1. I use Linux, and Microsoft Office doesn't run natively on Linux.
So I had to run a virtual Windows 10 on top of Linux - that is 2 CPU cores, 2.5GB of memory, 200MB of video memory, and 50GB of storage minimum - just to run a spreadsheet application and a word application.
My ideal solution should be cross-platform.

2. Microsoft controls my data.
If I purchase Microsoft 365 service, I am buying the *subscription*, not the actual programmes.
Once I stop renewing my subscription, my datasets and documentations may not render or work properly.
My ideal solution should be [free and open-source](https://en.wikipedia.org/wiki/Free_and_open-source_software).

3. Microsoft Excel comes with many wonderful functionalities, most of which I do not use.
I had worked on the same project so long that I wrote custom R and Python scripts to perform commonly used operations more efficiently.
Now I find myself using Excel only as a CSV editor with color support.
That being said, my ideal solution should have a minimalistic and high-performing front-end for basic editing, and provide the option to connect to a kernel of my choosing when advance functionalities are required, like [Vim](https://www.vim.org) and [Jupyter Notebook](https://jupyter.org/). (Fun fact: There are [140+ kernels](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) available for Jupyter Notebook, not just ipython)

### Conclusion

To reiterate, I want a tool/language that
1. saves data and its documentation in one file,
2. is able to handle large datasets natively,
3. works well with hierarchal data,
4. is human-readable,
5. is cross-platform,
6. is free and open-source,
7. provides or works well with a minimalistic editor.

In additional, I also want the solution to have version control support, or work well with an existing version control tool.

## Why REAM

I did not initially write REAM with all 7 features in mind.

When collecting my data for my undergraduate thesis, I wanted to edit my dataset in my favourite editor [Neovim](https://neovim.io).
I tried [a plugin](https://github.com/chrisbra/csv.vim) that handles CSV files in Vim, but found some of its core functionalities to be inconsistent.
This is when I start exploring CSV alternatives that are easy to edit in text editors.
Meanwhile, I started reflecting on my past experience with data and see how I cam improve my workflow with my new solution.

### YAML

My first choice was [YAML](https://yaml.org/) since it's a human-friendly data serialization standard I was already familiar with.
It also support comments so I can add inline documentation.
I can rewrite the [previous example](#spreadsheet-s-simple-strucutre-limits-the-way-we-store-data) in YAML:
```yaml
country:
    - name: x
      Mountainous: m_x
      year:
          - name: 1
            CivilWar: w_x1
            GDP: g_x1
          - name: 2
            CivilWar: w_x2
            GDP: g_x2
    - name: y
      Mountainous: m_y
      year:
          - name: 1
            CivilWar: w_y1
            GDP: g_y1
          - name: 2
            CivilWar: w_y2
            GDP: g_y2
    - name: z
      Mountainous: m_z
      year:
          - name: 1
            CivilWar: w_z1
            GDP: g_z1
          - name: 2
            CivilWar: w_z2
            GDP: g_z2
```

It's so much more readable than JSON.

But that's not all.
YAML's [anchors and aliases](https://yaml.org/spec/1.2/spec.html#id2765878) allow easy reference to existing data and make the dataset modular.
If I adjust the way data is organized:
```yaml
country:
    - &country_x
      country_name: x
      country_Mountainous: mx
    - &country_y
      country_name: y
      country_Mountainous: my
    - &country_z
      countrz_name: z
      countrz_Mountainous: mz
year:
    - <<: *country_x
      year_name: 1
      year_CivilWar: wx1
      year_GDP: gx1
    - <<: *country_x
      year_name: 2
      year_CivilWar: wx2
      year_GDP: gx2
    - <<: *country_y
      year_name: 1
      year_CivilWar: wy1
      year_GDP: gy1
    - <<: *country_y
      year_name: 2
      year_CivilWar: wy2
      year_GDP: gy2
    - <<: *country_z
      year_name: 1
      year_CivilWar: wz1
      year_GDP: gz1
    - <<: *country_z
      year_name: 2
      year_CivilWar: wz2
      year_GDP: gz2
```

With Python's [`pyyaml`](https://pypi.org/project/PyYAML/) library doing most of the heavy work, all I have to do is:
```python
import yaml

# read yaml file
with open("test3.yaml", "r") as f:
    dat = yaml.safe_load(f)

# extract year entries
years = [ list(entry.values()) for entry in dat['year'] ]

# save as csv
with open("test3.csv", "w") as f:
    for year in years:
        lines = ",".join([ str(item) for item in year ])
        f.write(line)
        f.write("\n")
```
to generate the CSV file.

But this breaks the hierarchal structure.
To prevent recursive referencing, the data structure is now flat; both `country` and `year` entires are now placed at the same level instead of being nested in one another.
Since variables with identical keys will be overwritten when referencing, I have to rename variables to make them unique, hence the `country_` and `year_` prefixes.
And since comments in YAML are simply ignored, I have to modify the parser to extract my inline documentation.

Modifying the parser to parse comments is not hard, but fixing other problems requires creating a superset of the language.
If that's the case, I see no reason why I must stick to YAML.

### TOML

TOML is a another config file standard that emphasize human readability, and I quite like the syntax for [Array of Tables](https://toml.io/en/v1.0.0-rc.3#array-of-tables).
I can rewrite the [previous example](#spreadsheet-limits-the-way-we-store-data) in TOML:
```toml
[[country]]
  name = "x"
  Mountainous = "mx"

  [[country.year]]
    name = 1
    CivilWar = "wx1"
    GDP = "gx1"

  [[country.year]]
    name = 2
    CivilWar = "wx2"
    GDP = "gx2"

[[country]]
  name = "y"
  Mountainous = "my"

  [[country.year]]
    name = 1
    CivilWar = "wy1"
    GDP = "gy1"

  [[country.year]]
    name = 2
    CivilWar = "wy2"
    GDP = "gy2"

[[country]]
  name = "z"
  Mountainous = "mz"

  [[country.year]]
    name = 1
    CivilWar = "wz1"
    GDP = "gz1"

  [[country.year]]
    name = 2
    CivilWar = "wz2"
    GDP = "gz2"
```

I prefer TOML's syntax over YAML's when it comes to nested data as it doesn't rely on indentation, but it lack referencing.
In fact, the author explicitly rejected the idea during early development ([Issue #13](https://github.com/toml-lang/toml/issues/13) and [Issue #77](https://github.com/toml-lang/toml/issues/77)).
To implement reference in TOML implies creating a superset of TOML.

In conclusion, I want a language that is able to reference and reuse existing data (like the rejected proposal in [Issue #13](https://github.com/toml-lang/toml/issues/13), but with better syntax) and has readable syntax for "list of objects" (or "array of tables" in TOML).

I found none, so I wrote my own.

### SQL

You might wonder why I didn't consider SQL databases, and the answer is quite simple: I did not know SQL back then.

Nevertheless, if I want REAM to be more than a personal project, I have to consider what exactly does REAM provide that SQL does not, instead of reinventing an inferior relational database.
Why would social scientists choose REAM over a 40+ year technology that is proven to be efficient and reliable?

The most fundamental design differences between the two is that SQL databases are dynamic, while REAM store everything in static files:

#### SQL databases are harder to perform CRUD operations on

CRUD are four basic data manipulation operations: create, read, update and delete.
There are three methods that I can think of.

(1) manually type the `INSERT`, `SELECT`, `UPDATE`, `DELECT` commands into the SQL prompt.

(2) manually edit `INSERT` commands in a `.sql` file, then `\i` and `SELECT` whenever you want to read it.

(3) hire a full-stack engineer to write a front-end CRUD application and maintain the back-end server, or do them yourself.

The third method is too expensive for a personal project.
As to the first two methods... I don't think SQL is designed to be used like that.

REAM, on the other side, can be edited in any text editor.
Since it is designed to do so, it is much pleasant to the eyes in plain text.

SQL:
```sql
INSERT INTO person (first_name, last_name, gender, email)
values ('John', 'Doe', 'Male', 'john.doe@example.com');
```

REAM:
```ream
## Person
- first_name: John
- last_name: Doe
- gender: Male
- email: john.doe@example.com
```

An editor for REAM is also under development.
I'm working on a module that generates a graphical CRUD application based on the schema provided.

#### SQL databases are harder to version control

There are many solutions for version controlling SQL databases.
Some involving commercial softwares, others advocate "best practices."
This is a very complicated topic and I do not have the knowledge to elaborate on each of the solutions.
In summary, there is no native way to version control SQL databases.

REAM, on the other side, save everything in text files.
You can use any version control tools to track changes.
I use Git, and designed the syntax to work well with [`git-diff`](https://git-scm.com/docs/git-diff).

#### What if I want to build a website to present my data?

This is what modern databases are primarily used for.
If this is a hard requirement, you should use SQL databases.

But this is not to say you can't use REAM to build websites.
With the rise of static site generators, it is now possible to write a website entirely in Markdown.
Since REAM is a strict subset of Markdown, you may be able to figure out a way to use REAM with the static site generator of your choosing.

(I have been searching for a static Wiki generator that (1) uses Markdown, (2) uses Git for version control, and (3) runs entirely on the client side.
The only tool that satisfy all three requirements is [MDwiki](https://github.com/Dynalon/mdwiki), which is no longer maintained.)

In conclusion, SQL is a powerful tool.
You may be able to adapt your workflow to work with SQL databases, but it requires significant amount of skill and/or money to make it work.
REAM aims to provide an easy workflow to create, edit, distribute and reuse dataset, which will be further explained in the next section.


## Toolchain Design

The subsection on [SQL](#sql) briefly explain why REAM may be a better option compared to SQL databases.
This section further explain some of the features that makes REAM and it toolchain an appealing tool for social scientists.

<!-- ### Design Principle

I have collaboration in mind when designing the toolchain.
In a collaborative data collection project, there are two types of people: project managers and contributors.
Project managers are in charge of maintaining the codebook and establishing the instructions on data collection.
Contributors collect data, edit the datasets, and request changes to be merged back to the master spreadsheet.
The project managers then review the updates, and decide whether to accept the merge request.

It should be
There is be no local installation, no third party interpreter/compiler as dependencies, and no need to set up development environment.
To edit a dataset, all you need to do is to visit the online editor, and drag and drop your REAM file to the browser.
To submit

As for project manager, the requirements would be higher.
Since REAM toolchain relies on Git, basic Git knowledge would be very useful.
-->

### REAM-Editor

Although the language is designed to be editor-friendly, probably not many people are willing edit datasets in text editors.
An easy-to-use editor to edit REAM file is needed.

#### Web-based

When designing REAM and its toolchain, I have collaborative work in mind.
In order to make contribution easy, the editor should require no local installation or third party dependencies.
To edit a REAM file, all you need is to visit the online editor, and drag and drop the file to the browser.
Pull request can be done through GitHub's website, and GitHub integration might be added to the editor.
No programming or command line is required for basic operations.

#### Real-Time Preview

Since CSV/spreadsheet is REAM's primary compile target, the editor should provide real-time preview, just like [StackEdit](https://stackedit.io/app#) (This is actually where the inspiration come from)

#### Graphical CRUD Application

After REAM Schema is implemented, REAM-Editor should be able to generate HTML forms based on the schema provided for basic CRUD operation.
Synchronize type checking and error handling should also be implemented.

#### Hackable

The Editor is written in Vue, so it should be easy to incorporate custom Vue components so as to edit and render the dataset however you desire.

### Parser

The parser is the most important part of the toolchain.
It compiles REAM datasets to analysis-ready formats, such as CSV and JSON.
More formats might be supported in the future.

Even though the parser can be written in any programming languages, there is only a few to choose from if we want the parser to be included in the web-based editor.
The current implementation is written in JavaScript.

However, I still want the parser to be able to work as a command line tool to provide more advanced functionalities.
To distribute such CLI tool, there are two options:

1. Publish to npm, but I suspect few of the potential users have node and npm/yarn installed.

2. Distribute native binaries, but it might be huge in size.

Both are possible, but neither is ideal.

I am currently experimenting with a Rust implementation.
If successful, the parser would be compiled to binary executables for the CLI tool, and WASM modules for the web-based editor.

### Package Manager

If I want to plot fancy graphs in R, I do not need write a plotting library.
I can use `ggplot2`:
1. Download `ggplot2`
```R
install.packages("ggplot2")
2. Import `ggplot2`
```R
library(ggplot2)
```
3. Use `ggolot2`
```R
plot_1 = ggplot(dat = data) + geom_point(aes(x = x, y = y))
```

If I want to do matrix calculations in Python, I do not need to write a new linear algebra library.
I can use `numpy`
1. Download `numpy`
```bash
pip install --user numpy
```
2. Import `numpy`
```python
import numpy as np
import numpy.linalg as la
```
3. Use `numpy`
```python
mat_A_inv = la.inv(mat_A)
```

If I want to add GDP variables to my dataset, I do not need to calculate GDP for each country.
I can use GDP data from World Bank.
1. Download the dataset

(1) Google `World Bank GDP` and click on the first result

(2) Download the data in CSV

(3) Unzip `API_NY.GDP.MKTP.CD_DS2_en_csv_v2_1678496.zip`

2. Import dataset

(1) Read the CSV
```R
wb = read.csv("./API_NY.GDP.MKTP.CD_DS2_en_csv_v2_1678496.csv")
```

(2) See error messages
```
Error in read.table(file = file, header = header, sep = sep, quote = quote,  :
  more columns than column names)
```

(3) Open the CSV file in a text editor. Discover the dataset header is on line 5.

(4) Read CSV again
```R
wb = read.csv("./API_NY.GDP.MKTP.CD_DS2_en_csv_v2_1678496.csv", skip = 4, header = T)
```

3. Use the dataset

(1) Write a function to extract GDP:
```R
get_gdp = function(country, year) {
  col_i = grep(paste0('X', year), names(wb))
  gdp = wb[wb$Country.Name == country,][col_i]
  return(gdp[1,1])
}
```

(2) Apply the function on each row in your dataset
```R
my_data$GDP = apply(my_data, 1, function(row) get_gdp(row['country'], row['year']))
```

(3) Discover Cote d'Ivoire has `NA` GDP. Oh, it's called "Sierra Leone" in the World Banks' dataset.

(4) Figure out all the name differences between the two datasets and write a "dictionary" to translate the names.
```R
country_dict = list(
  "Brunei" = "Brunei Darussalam",
  "Dominican Republic" = "Dominica",
  "Cote d'Ivoire" = "Sierra Leone"
  # You get the idea
)
```
(5) Modify `get_gdp`
```R{3}
get_gdp = function(my_country, year) {
  col_i = grep(paste0('X', year), names(wb))
  wb_country = country_dict[[my_country]]
  gdp = wb[wb$Country.Name == wb_country,][col_i]
  return(gdp[1,1])
}
```

(6) Apply the function on each row in your dataset
```R
my_data$GDP = apply(my_data, 1, function(row) get_gdp(row['country'], row['year']))
```

There should be a easier way to import and add existing datasets to new datasets.

In fact, it's not unheard of to download datasets with package managers.
Beside the build-in datasets in R, you can download quite a few datasets from [`CRAN`](https://cran.r-project.org/) using `install.pacakges`, including example datasets in libraries (`diamonds` in `ggplot2`), datasets as libraries (`titanic`), or wrappers of APIs (`censusapi`).

I think it would be awesome if we have a package and project manager for REAM datasets.
Writing a package manager that people don't hate is a notoriously difficult task, so I don't expect this to be officially released in the near future.
I'll work on a naive implementation (essentially wrappers of git commands) as a proof of concept.
