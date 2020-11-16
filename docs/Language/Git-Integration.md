# Git Integration

[Git](https://git-scm.com/) is a distributed version control system for personal and collaborative projects.
It is widely used in programming but can also be applied to other non-tech files, including REAM files.

This section is not a tutorial on Git, but to showcase what a workflow is like when using REAM and Git without (too many) technical terminologies.

## Example

For this example, we want to collect every country's population and GDP for the year 2019.
At the first phase of the data collection process, we focus on two countries: Afghanistan and Albania.

We start by creating a template for `data.md`:

```ream
# Dataset

## Country
- name: Afghanistan
- pop: %
- GDP: %

## Country
- name: Albania
- pop: %
- GDP: %

## Country
- name: Algeria
- pop: %
- GDP: %
```
and save a snapshot of it.
This snapshot is known as a *commit*.

Your two collaborators, Alice and Bob, specializes in Asia and Europe respectively and are tasked to collect data for corresponding region.
Each of them download a copy of the `data.md` file, to their own *branches*, and work on the files separately.

Now there are three copies of the same file in three different branches: `master`, `alice` and `bob`.

![Git-1](./img/Git-1.svg)

Note all three share the same color, implying that their contents are identical.

Alice adds the relevant information into `data.md` in the `alice` branch, and commit the changes:
```ream
# Dataset

## Country
- name: Afghanistan
- pop: $38041754$
- GDP: $1901353830$

## Country
- name: Albania
- pop: %
- GDP: %

## Country
- name: Algeria
- pop: %
- GDP: %
```

![Git-2](./img/Git-2.svg)

Similarly, Bob adds the relevant information and commit the changes:
```ream
# Dataset

## Country
- name: Afghanistan
- pop: %
- GDP: %

## Country
- name: Albania
- pop: $2854191$
- GDP: $15278077450$

## Country
- name: Algeria
- pop: %
- GDP: %
```
![Git-3](./img/Git-3.svg)

Note that neither Alice nor Bob is able to see the changes committed in the other branch.

To update the `master` branch, Alice and Bob have to request the changes to be pulled to the `master` branch.
Such requests are called *pull requests*.

The `master` branch first merges the changes committed in `bob`.

```ream
# Dataset

## Country
- name: Afghanistan
- pop: %
- GDP: %

## Country
- name: Albania
- pop: $2854191$
- GDP: $15278077450$

## Country
- name: Algeria
- pop: %
- GDP: %
```

![Git-4](./img/Git-4.svg)

Then merges the changes committed in `alice`.
The first phase is now complete, and is *tagged* as version `v0.1`.

```ream
# Dataset

## Country
- name: Afghanistan
- pop: $38041754$
- GDP: $1901353830$

## Country
- name: Albania
- pop: $2854191$
- GDP: $15278077450$

## Country
- name: Algeria
- pop: %
- GDP: %
```
![Git-5](./img/Git-5.svg)

To keep their branches updated with `master`, Alice and Bob need to *rebase* their branches to `master`.

![Git-6](./img/Git-6.svg)

And the cycle goes on.

Instead of having multiple version of the same file (`data_matser.md`, `data_alice.md`, `data_bob.md`, `data_alice_1.md`, `data_bob_1.md`, `data_master_v0.1.md`), you have one `data.md` file with a clean linear history.
