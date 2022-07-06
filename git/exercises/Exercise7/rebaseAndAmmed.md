# Exercise
1. Make a commit, then practice using the `--amend` option to make another change to the previous commit.
2. Make two non-conflicting changes to two different branches. Rebase one branch onto the other.
3. Make another change to your current branch. Use an interactive rebase (`git rebase -i`) to rebase the two branches. Try squashing your two commits and rewording the message during the rebase.

# Solution

1. first we are going to create two new files, then we will add just one to our commit
``` bash
> echo "This is the first file" > first.txt
> echo "This is the second file" > second.txt
> git add first.txt
> git commit -m "adding two files"
[exercise7 9619c96] commiting two new files
 10 files changed, 769 insertions(+)
 create mode 100644 first.txt
```
since we didn't add the second file, we will amend the commit
``` bash
> git add second.txt
> git commit --amend
[exercise7 b4952f3] Committing two new files
 Date: Wed Oct 4 23:06:48 2017 -0700
 2 files changed, 2 insertions(+)
 create mode 100644 first.txt
 create mode 100644 second.txt
 ```
 2.
 ```
 > git checkout main
 Switched to branch 'main'
Your branch is up-to-date with 'origin/main'.

$> git checkout -b exercise7-2
Switched to a new branch 'exercise7-2'

$> git log --oneline
43388fe Initial commit
```
now let's create a new feature on our branch
``` bash
> git checkout main
Switched to branch 'main'
Your branch is up-to-date with 'origin/main'.
> echo "master made a new change" >> hello.txt
git add hello.txt
git commit -m "master made a new change"
[exercise7 9619c96] master made a new change
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
```
now let's rebase our branch on master
``` bash
> git checkout exercise7-2
Switched to branch 'exercise7-2'
> git rebase master
First, rewinding head to replay your work on top of it...
Applying: master made a new change
> git log --oneline
e83fafa Adding a new feature
a2c699b Master has continued to change
43388fe Initial commit
```

3. 
``` bash
$> echo "Another new feature" > another_feature.txt

$> git add another_feature.txt

$> git commit -m "Adding another new feature"
[exercise7-2 6449351] Adding another new feature
 1 file changed, 1 insertion(+)
 create mode 100644 another_feature.txt
$> git log -n 3 --oneline
8470d04 (HEAD -> exercise7-2) Adding another new feature
64db08a Adding a new feature
ce8865e (master) Master has continued to change
$> git rebase -i HEAD~2
pick edaa170 Adding a new feature
pick 6449351 Adding another new feature
detached HEAD dd693ff] Adding two new features
 Date: Wed Oct 4 23:54:35 2017 -0700
 1 file changed, 1 insertion(+)
 create mode 100644 feature.txt
[detached HEAD 03de89d] Adding two new features
 Date: Wed Oct 4 23:54:35 2017 -0700
 2 files changed, 2 insertions(+)
 create mode 100644 another_feature.txt
 create mode 100644 feature.txt
Successfully rebased and updated refs/heads/exercise7-2.
$> git log --oneline
03de89d Adding two new features
a2c699b Master has continued to change
43388fe Initial commit
```

