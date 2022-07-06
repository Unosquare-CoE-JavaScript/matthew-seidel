# Exercise
1. Make bad changes to a file, then use `git checkout` to fix it. Use `git checkout` to reset your file back to an earlier point in time.
2. Use `git clean` to remove untracked files from your repo. Remember to use `--dry-run` first.
3. Stage a change and then use `git reset` to unstage it. Use `git reset --hard` to reset your branch back pointer, staging area, and working area to an earlier commit. Use "mixed mode" to reset your branch back to an earlier commit, then use `ORIG_HEAD` to reset your branch back to where you were.
4. Practice using `git revert` to safely revert a commit with a new commit.

# Solution
1. 
``` bash
> echo "this is an mistake" > matt.txt
> cat matt.txt
this is an mistake
```
i committed a grammar error, so let's bright back a commit to solve this.

``` bash
> git log --name-status --follow --oneline matt.txt
cc74f58 (mundo, exercise4) changing the world to mundo
M       matt.txt
b031caa test
M       matt.txt
498eb93 (exersice3) This is a test
A       matt.txt
> git checkout cc74f58 -- matt.txt
> git commit cc74f58 -- matt.txt
> cat matt.txt
hello mundo!
``` 
2.
``` bash
> git clean --dry-run
Would remove matthew.txt
> git clean -f
Removing matthew.txt
> cat matthew.txt
cat: matthew.txt: no such file or directory
```

3.
``` bash
> git status
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        matthew.txt
> git reset -- matthew.txt
> git status
Your branch is ahead of 'exercise6' by 1 commit.
  (use "git push" to publish your local commits)
Untracked files:
  (use "git add <file>..." to include in what will be committed)

```
4. 
``` bash
> git log -1 --oneline
[exercise6 9b2c3b3] Revert "Deleting matt.txt"
> git revert 9b2c3b3
 1 file changed, 2 insertions(+)
 create mode 100644 matt.txt
 ```
 