# Note

This article records some of my random thoughts before and during my work on REAM and its toolchain.
It probably doesn't belong in the official documentation, and will be moved to my personal website in the future.

The first section lists some of the problems I experience when using Microsoft Excel and Word to collect and document social science data.
The second section explains the motivation behind creating REAM.
The third section explains some of the design choices in the toolchain, and how these designs makes REAM an appealing choice for social scientists.

## Problems
The project was inspired by my work at the Cline Center.
I work on the Composition of Religious and Ethnic Groups (CREG) Project, and my task is to merge several existing datasets on ethnic groups in one master dataset, with a region focus on Sub-Saharan Africa.
For every match I make between datasets, I have to update the master dataset, record the rationale, and provide the sources that support the match.
That being said, we have documentation for *every single data point* in the master dataset.

We use Microsoft Excel to edit the master dataset, and Microsoft Word to document the matches.
However, there are several things I don't like about the workflow.

### Dataset and documentation are separate

For every match I make, I first edit the master dataset in Excel, then edit the documentation in Word.
I'm essentially doing the same thing twice in two different applications, increasing the likelihood of human error.
The potential inconsistency between the dataset and the documentation not only make the dataset hard to read but also hard to update in the future.

My ideal solution should merge the dataset and its documentation in one single file.
Either I merge the documentation into the dataset, or parse the dataset from the documentation.

### Large spreadsheets are hard to edit

Spreadsheets are handy tools to organize data when everything fit in my screen.
I can see all the columns and rows, and have a full picture of of my dataset.
The [*What You See Is What You Get (WYSIWYG)*](https://en.wikipedia.org/wiki/WYSIWYG) design is what makes Excel and other spreadsheet applications popular at the first place.

But when the dataset spans beyond my screen, it's most appealing design diminishes.
I have to scroll horizontally and vertically to navigate between cells.
I have to filter and sort and zoom out to squeeze all relevant information into the screen.
I argue that if you need a [hyper-scrolling mouse](https://www.logitech.com/en-us/products/mice/m720-triathlon.910-004790.html) to move between cells comfortably, you are probably using the wrong tool.

My ideal solution should work well with large dataset natively.

### Spreadsheet limits the way we store data

The spreadsheet seems like a perfect format to store social science datasets: each row represents a data point, each column represents a variable, and the entire spreadsheet is essentially one gigantic matrix.

Now consider collecting data to test the following empirical model adapted from Fearon and Laitin (2003) to test whether mountainous countries are more prone to civil war, with GDP as a control variable:

$$CivilWar_{ij} = \beta_{0} + \beta_{1}Mountainous_{j} + \beta_{2}GDP_{ij}$$
where $CivilWar_{ij}$ is civil war onset for country $j$ on year $i$, $Mountainous_{j}$ measures how mountainous country $j$ is, and $GDP_{ij}$ measures the GDP for country $j$ for year $i$.
For the sake of simplicity, let $j \in \{x, y, z\}$ and $i \in \{1, 2\}$.

If stored in the form of spreadsheet, you'll get 6 data points ($\{x, y, z\} \times \{1, 2\}$):

| $id$ | $country$ | $year$ | $CivilWar$ | $Mountainous$ | $GDP$ |
| --- | --- | --- | --- | --- | --- |
| 1 | $x$ | $1$ | $w_{x1}$ | $m_x$ | $g_{x1}$ |
| 2 | $x$ | $2$ | $w_{x2}$ | $m_x$ | $g_{x2}$ |
| 3 | $y$ | $1$ | $w_{y1}$ | $m_y$ | $g_{y1}$ |
| 4 | $y$ | $2$ | $w_{y2}$ | $m_y$ | $g_{y2}$ |
| 5 | $z$ | $1$ | $w_{z1}$ | $m_z$ | $g_{z1}$ |
| 6 | $z$ | $2$ | $w_{z2}$ | $m_z$ | $g_{z2}$ |

Since the spreadsheet is small and well-ordered, its easy for users to update the data.
Say we want to update $Mountainous$ for country $x$ from $m_x$ to $m'_{x}$, we are able to quickly locate the two $m_x$s and update the data manually - they are stored in column 5 of row 1 and 2.
But if the data is not well-ordered, or the spreadsheet is huge, locating the relevant cells may not be easy.

One solution is to update the relevant cells with a scripting language, such as VBA, Python or R.
So you would do something like `data$Mountainous[data$country == 'x',] = new_value`in R.
This requires users to be familiar with programming.

Another solution is to change the way we store data.
Observe that any data point with the same $country$ will have the same $Mountainous$.
To reference the same information, we can save the data in a structured form.
In JSON, the structure would be something like:
```json{5,13,21}
{
    "country": [
        {
            "name": "x",
            "Mountainous": "mx"
            "year": [
                { "name": 1, "CivilWar": "wx1", "GDP": "gx1" }
                { "name": 2, "CivilWar": "wx2", "GDP": "gx2" }
            ]
        },
        {
            "name": "y",
            "Mountainous": "my"
            "year": [
                { "name": 1, "CivilWar": "wy1", "GDP": "gy1" }
                { "name": 2, "CivilWar": "wy2", "GDP": "gy2" }
            ]
        },
        {
            "name": "z",
            "Mountainous": "mz"
            "year": [
                { "name": 1, "CivilWar": "wz1", "GDP": "gz1" }
                { "name": 2, "CivilWar": "wz2", "GDP": "gz2" }
            ]
        }
    ]

}

```
Observe that there is only one $m_{x}$ in the entire dataset, and the two $GDP$s for country $x$ is associated with this one $m_{x}$.
Now we just have to convert it to a analysis-ready format, by first flatten the structure into:
```json
[
    {"country_name": "x", "country_Mountainous": "mx", "year_name": 1, "year_CivilWar": "wx1", "year_GDP": "gx1"},
    {"country_name": "x", "country_Mountainous": "mx", "year_name": 2, "year_CivilWar": "wx2", "year_GDP": "gx2"},
    {"country_name": "y", "country_Mountainous": "my", "year_name": 1, "year_CivilWar": "wy1", "year_GDP": "gy1"},
    {"country_name": "y", "country_Mountainous": "my", "year_name": 2, "year_CivilWar": "wy2", "year_GDP": "gy2"},
    {"countrz_name": "z", "countrz_Mountainous": "mz", "year_name": 1, "year_CivilWar": "wz1", "year_GDP": "gz1"},
    {"countrz_name": "z", "countrz_Mountainous": "mz", "year_name": 2, "year_CivilWar": "wz2", "year_GDP": "gz2"}
]
```
then convert this into CSV.

But JSON is not easy to edit manually.
My ideal solution should use a human-friendly data serialization standard that works well with structured data.

### I don't like Microsoft Office Suite

1. I use Linux, and Microsoft Office doesn't run natively on Linux.
So I had to run a virtual Windows 10 on top of Linux - that is 3 CPU cores, 2.5GB of memory, 200MB of video memory, and 50GB of storage - just to run a spreadsheet application and a word application.
My ideal solution should be cross-platform.

2. Microsoft controls my data.
If I purchase Microsoft 365 service, I am buying the *subscription*, not the actual programmes.
Once I stop renewing my subscription, my datasets and documentations may not render or work properly.
Granted, the subscription is not super expensive, and Microsoft is not [Gaussian Inc.](https://www.nature.com/articles/429231a), but the fact that I have to pay an annual fee just to properly access my files make me wonder whether or not I actually own the files.
My ideal solution should be free, [as in "free speech"](https://www.gnu.org/philosophy/free-sw.en.html).

3. Microsoft Excel comes with many wonderful functionalities, most of which I do not use.
I find myself using Excel as a CSV editor with color support.
If for some reason I want to do advanced data manipulation, I rather use a scientific languages like R or Python + numpy + pandas instead of the built in VBA.
My ideal solution should have a minimalistic and high-performing front-end for basic editing, and provide the option to connect to a kernel of my choosing when advance functionalities are required, like [Vim](https://www.vim.org) and [Jupyter Notebook](https://jupyter.org/). (Fun fact: There are [140+ kernels](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) available for Jupyter Notebook, not just ipython)

### Conclusion

To reiterate, I want a tool/language that
1. saves data and its documentation in one file,
2. is able to handle large datasets natively,
3. works well with structured data,
4. is human-readable,
5. is cross-platform,
6. is free,
7. provides or works well with a minimalistic editor.

In additional, I also want the solution to have version control support, or work well with an existing version control tool.

## Why REAM

I did not initially write REAM with all 8 features in mind.

When collecting my data for my undergraduate thesis, I wanted to edit my dataset in my favourite editor [Neovim](https://neovim.io).
I was testing [a plugin](https://github.com/chrisbra/csv.vim) that handles CSV files in Vim, but found some of its core functionalities to be inconsistent.
This is when I start exploring CSV alternatives that is easy to edit in text editors.
Meanwhile, I start reflecting on my past experience with data and see how I cam improve my workflow with my new solution.

### YAML

My first choice was [YAML](https://yaml.org/) since it's a human-friendly data serialization standard I was already familiar with.
It also support comments so I can add inline documentation.
I can rewrite the [previous example](#spreadsheet-limits-the-way-we-store-data) in YAML:
```yaml
country:
    - name: x
      Mountainous: mx
      year:
          - name: 1
            CivilWar: wx1
            GDP: gx1
          - name: 2
            CivilWar: wx2
            GDP: gx2
    - name: y
      Mountainous: my
      year:
          - name: 1
            CivilWar: wy1
            GDP: gy1
          - name: 2
            CivilWar: wy2
            GDP: gy2
    - name: z
      Mountainous: mz
      year:
          - name: 1
            CivilWar: wz1
            GDP: gz1
          - name: 2
            CivilWar: wz2
            GDP: gz2
```

It's so much more readable than JSON.

But that's not all.
YAML's [anchors and aliases](https://yaml.org/spec/1.2/spec.html#id2765878) allows easy reference to existing data.
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

But the readability dramatically drops.
To prevent recursive referencing, the data structure is now flat; both `country` and `year` entires are now placed at the same level instead of being nested in one another.
Since variables with identical keys will be overwritten when referencing, I have to rename variables to make them unique, hence the `country_` and `year_` prefixes.
And since comments in YAML are simply ignored, I have to modify the parser to extract my inline documentation.

Modifying the parser to parse comments is not hard, but fixing other problems requires modification to the language itself.
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

I prefer TOML's syntax over YAML's when it comes to nested data, but there is no easy way to reference information in TOML.
In fact, the author explicitly rejected the idea during early development ([Issue #13](https://github.com/toml-lang/toml/issues/13) and [Issue #77](https://github.com/toml-lang/toml/issues/77)).
To implement reference in TOML implies creating a superset of TOML.

In conclusion, I want a language that is able to reference and reuse existing data (like the rejected proposal in [Issue #13](https://github.com/toml-lang/toml/issues/13)) and has readable syntax for "list of objects" (or "array of tables" in TOML).
I found none, so I wrote my own.

### SQL

You might wonder why I didn't consider SQL databases.
First, I wanted to edit my data in an text editor, and I don't think SQL databases are designed to work that way.
Second, I did not know SQL by the time I started writing REAM.

REAM's "inheritance" feature was inspired by my WRONG understanding of how class inheritance work in object-oriented programming.
I branded the new language as "object-oriented data serialization standard" (which doesn't make sense now that I think of it) and googled the term to see whether or not it is used to describe other technology.
Of course I got pages and pages of results on SQL.

If I want other people to use REAM, I have to be very careful not to reinvent relational databases.
What exactly do REAM offers that SQL databases don't?

The most fundamental design differences between the two is that SQL databases requires a server to run, while REAM store everything in static files.
This has profound affects on the workflow:

#### SQL databases are harder to distribute

There are two ways to do so.
You either export your database into a `.sql` file, or maintain a server to export data as a CSV file when a download request is made.
The former solution requires your users to install and understand SQL to use it, and the later requires you to maintain a server, which is not free.

REAM saves everything in static files and plan to utilize Git hosting services for data distribution, which is free.
Downloading REAM files is easy as executing `git clone` commands, and I plan to write a package manager to further simplify the process.

#### SQL databases are harder to perform CRUD operations on

CRUD are four basic data manipulation operations: create, read, update and delete.
There are three methods that I can think of.

(1) manually type the `INSERT`, `SELECT`, `UPDATE`, `DELECT` commands into the SQL prompt.

(2) manually edit `INSERT` commands in a `.sql` file, then `\i` and `SELECT` whenever you want to read it.

(3) hire a full-stack engineer to write a front-end CRUD application and maintain the back-end server.

The third methods, again, is not free.
As to the first two methods... I don't think anyone want to do this in a large project.

REAM, on the other side, can be edited in any text editor.
Since it is designed to do so, it is much pleasant to the eyes in plain text.

SQL:
```sql
INSERT INTO person (first_name, last_name, gender, email)
values ('John', 'Doe', 'Male', 'john.doe@gmail.com');
```

REAM:
```ream
## Person
- first_name: John
- last_name: Doe
- last_name: Male
- email: john.doe@gmail.com
```

A hackable editor for REAM is also under development.
I'm working on a module that generates a graphical CRUD application based on the schema provided.

#### SQL databases are harder to version control

There are many solutions for version controlling SQL databases.
Some involving commercial softwares, others advocate "best practices."
This is a very complicated topic and I do not have the knowledge to elaborate on each of the solutions.
The point is, there is no native way to do version controlling in SQL database.

REAM, on the other side, save everything in text files.
You can use any version control tools to track changes.
I use Git, and designed the syntax to work well with [`git-diff`](https://git-scm.com/docs/git-diff).

#### What if I want to build a website to present my data?

This is what modern databases are primarily used for.
If this is a hard requirement, you should use SQL databases.

But this is not to say you can't use REAM to build websites.
With the revival of static websites, more and more websites are now built with Markdown with the help of static site generator.
Since REAM is a strict subset of Markdown, you may be able to figure out a way to use REAM with your static site generator.

(I have been searching for a static Wiki generator that (1) uses Markdown, (2) uses Git for version control, and (3) runs entirely on the client - no [server](https://www.mediawiki.org/wiki/MediaWiki) or ["serviceless"](https://tiddlywiki.com/) (what a misleading term).
The only tool that satisfy all three requirements is [MDwiki](https://github.com/Dynalon/mdwiki), which is no longer maintained.)

In conclusion, SQL is a powerful tool.
You may be able to adapt your workflow to work with SQL databases, but the skill requirements are also higher.
REAM aims to provide an easy workflow to create, edit, distribute and reuse dataset, which will be further explained in the next section.


## Toolchain Design

The subsection on [SQL](#sql) briefly explain why REAM and its toolchain may be a better option compared to SQL databases.
This section further explain some of the features that makes REAM and it toolchain an appealing tool for social scientists.

### Basic Pinciples

I have collaboration in mind when designing the toolchain.
In a collaborative data collection project, there are two types of people: project managers and contributors.
Project managers are in charge of managing the codebook and establishing the instructions on data collection.
Contributors collect data following the instructions, edit the datasets, and request changes to be merged back to the master spreadsheet.
The project managers then inspect the updates, and either accept or reject the merge.

### REAM-editor

### Package Manager

If I want to plot fancy graphs in R, I do not need write a new plotting library.
I can use `ggplot2`:
1. Download `ggplot2`
```R
install.packages("ggplot2")
```
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

If I want to add GDP in my dataset, I do not need to calculate GDP for each country.
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

(3) Discover Cote d'Ivoire has not GDP. Oh, it's called Sierra Leone in the World Banks' dataset.

(4) Figure out all the name differences between the two datasets and write a dictionary.
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

There must be a easier way to import and incorporate existing datasets.

In fact, it's not unheard of to download datasets with package managers.
Beside the build-in datasets in R, you can download quite a few datasets from [`CRAN`](https://cran.r-project.org/) using `install.pacakges`.
They can be example datasets in libraries (`diamonds` in `ggplot2`), datasets as libraries (`titanic`), or wrappers of APIs (`censusapi`).

Packages managers do more than downloading data.
