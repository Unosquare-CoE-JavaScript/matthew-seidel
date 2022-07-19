# Exercise
1. Practice creating a well-crafted commit - look at the format given on the slides for help.
2. Use `git log` to find commits created since yesterday. Rename a file and use the `--name-status` and `--follow` options to `git log` to track down when the file was renamed, and what it used to be called. Use `--grep` to search within commit messages, and `--diff-filter` to find renamed and modified files from `git log`.
3. Use `git show` to get more information about a specific git hash.
4. Try the `--merged` and `--no-merged` options to `git branch` to see which branches have been merged into `master` (or not).

# Solution

1. 
``` bash
> git add .
> git commit -m "[training/exercise5] creating a good commit"
[exercise5 a14e185] [training/exercise5] creating a good commit
 7 files changed, 169 insertions(+)
 create mode 100644 .DS_Store
 create mode 100644 git/.DS_Store
 create mode 100644 git/README.md
 create mode 160000 git/advanced-git
 create mode 100644 git/exercices/Exercise1-simpleCommit.ts
 create mode 100644 git/exercices/Exercise3/readme.md
 create mode 100644 git/exercices/Exercise4/README.md
 ```
 2.
 ``` bash
 > git log --since="yesterday"
 commit a14e18594164078f0513dcdf2ce3ace027c0beb4 (HEAD -> exercise5)
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Thu Jun 16 11:02:54 2022 -0500

    [training/exersice5] creating a good commit

commit cc74f5808641c100e63346f21fde833ad5cc8ba2 (mundo, exercise4)
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Wed Jun 15 17:38:39 2022 -0500

    changing the world to mundo

commit b031caaeb1bf6846621a96322c9686fed8b112bc
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Wed Jun 15 17:31:23 2022 -0500

    test
```
we renamed the file matt.txt to matthew.txt and then
``` bash
> git log --name-status --follow matthew.txt
4b2b90e Replacing greeting with tokens for i18n
R073    matt.txt       matthew.txt
fec9e7b Changing Hello to Hola
M       matt.txt
afa34a6 Changing World to Mundo
M       matt.txt
e348ebc Testing the emergency git-casting system
M       matt.txt
43388fe Initial commit
A       matt.txt
```
3.
``` bash
git show
commit a14e18594164078f0513dcdf2ce3ace027c0beb4 (HEAD -> exercise5)
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Thu Jun 16 11:02:54 2022 -0500

    [training/exersice5] creating a good commit

diff --git a/.DS_Store b/.DS_Store
new file mode 100644
index 0000000..df519ad
Binary files /dev/null and b/.DS_Store differ
diff --git a/git/.DS_Store b/git/.DS_Store
new file mode 100644
index 0000000..fe8d6a6
Binary files /dev/null and b/git/.DS_Store differ
diff --git a/git/README.md b/git/README.md
new file mode 100644
index 0000000..e69de29
diff --git a/git/advanced-git b/git/advanced-git
```

4. 
``` bash
> git branch --merged
1.4-concurrent-rendering
  main
 01-javascript
  1.2-Asynchronous
  1.2-testing
  1.3-expert-control-props
  1.3-expert-state-initializer
  1.3-experto
  1.3-experto-base
  1.3-experto-component-compound
  1.3-experto-extensible-styles
  1.3-experto-lazyload
  1.3-experto-lazyload-nested-rrd6
  1.3-experto-lazyload-rrd-v6
  exercise4
* exercise5
  exersice3
  mundo
```
