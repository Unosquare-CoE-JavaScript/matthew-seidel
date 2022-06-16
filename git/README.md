# Notes


## cat-file
git-cat-file - Provide content or type and size information for repository objects

### -t
Show the type of the object

``` bash
git cat-file -t 98a0
blob
```

### -p
Show the object's content
``` bash
git cat-file -p 98a0
Hello World!
```

### why can't we change commits?

- if you change any data about the commit, the commit will hav a new SHA1 hash

- Even if the files don't change, the created date will change

 this is a security feature to prevent people from changing the commit data.

 ## References - Pointers to commit
 - Tags
 - Branches
 - Head - a  pointer to the correct commit

 # Moving files in & out of a repository

 - add a file in the next commit:
    - git add file.txt
- delete a file in the next commit:
    - git rm file.txt
- rename a fil in the next commit:
    - git mv file.txt file2.txt

## Git add -p
Allows you to stage commit in hunks. This is useful when you are adding a large number of files to a commit. It will stage the files in hunks, so that you can review them before committing.

## Git stash
Save the current state of the repository to a temporary area. you can then restore the state of the repository to the state it was in before you made the change.

### basic use

- stash:
    - git stash
- list changes:
    - git stash list
- show the contents:
    - git stash show stash@{0}
- apply the last stash:
    - git stash apply 
- apply specific stash:
    - git stash apply stash@{0}

### advanced use
- keep untracked files:
    - git stash --include-untracked
- keep all files (even ignored ones):
    - git stash --all
- Name stashes for easy reference
    - git stash save "my stash"
- Populate a stash with files from another stash:
    - git stash branch \<optional stash name>
- Grab a single file from a stash
    - git checkout \<stash name> -- \<filename >

### cleaning the stash
- remove the last stash and applying changes:
    - git stash pop
        - Tip it doesn't remove if there's a merge conflict
- remove the last stash:
    - git stash drop
- remove the nts stash:
    - git stash drop stash@{0}
- remove all stashes:
    - git stash clear

### wait to use
- Keep untracked files
    - git stash --include-untracked
- name stashes for easy reference
    - git stash save "my stash"

# References
### What's a branch
A branch is the pointer to a commit.

### what's head
The head is the pointer to the current commit and what's the next parent will be. Also it's a pointer to the current branch, but it can point to a commit too (detached HEAD).

It moves when you make a commit in the currently active branch and when you checkout a new branch

### sample repo - a simple blog
we're working on a simple blog, where index.txt contains links to our entries, and post titles, the post/directory contains our blog entires.

``` bash
mkdir post
> echo "this my very first blog entry" > post/welcome.txt
> echo "welcome.txt wWelcome to my blog" > index.txt
> git init
> git add .
> git commit -m "first commit"
[master (root-commit) f9f8f8f] first commit
2 files changed, 2 insertions(+)
create mode 100644 index.txt
create mode 100644 post/welcome.txt

> git checkout -b tech_post
Switched to a new branch 'tech_post'
> git add posts/python.txt
> git commit -m "new blog post about python"
[tech_post f9f8f8f] new blog post about python
1 file changed, 1 insertion(+)
create mode 100644 posts/python.txt

```

## Lightweight tags
lightweight tags are used to point to a specific commit, when you create a tag with no arguments, it will capture the value in head

``` bash
> git checkout master
Switched to branch 'master'

> git tag my-first-commit
```

### Annotated tag: git tag -a
point to a commit but store additional information, author, message date.

``` bash
> git tag -a v1.0 -m "Version 1.0 of my blog"
> git tag
v1.0

>git show v1.0
tag v1.0
Tagger: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Wed Jun 15 12:23:42 2022 -0500

Version 1.0 of my blog
```
in practice, this is not used very much.

### Working with tags
- List all tags:
    - git tag
- List all tags and what commit they're pointing to:
    - git show-ref --tags
- List all the tags pointing at a commit
    - git tag --points-at \<commit>
- Looking at the tag, or tagged contents:
    - git show \<tag-name>

### Tags and branches
- **Branch**
    - the current branch pointer moves with every commit to the repository
- **Tag**
    - The commit that a tag points doesn't change, it's a snapshot

## HEAD-LESS/DETACHED HEAD
sometimes you need to checkout a specific commit instead of a branch, git moves the head pointer to that commit as soon as you checkout a different branch or commit, the value of HEAD will point to that new SHA and there is not reference pointing to the commit you made in a detached state.

it can saves your work, creating a new branch that points to the last commit you made in a detached state. 
``` bash
> git branch \<new-branch-name> \<commit>
```
uses the last commit because the other ones point to their parents

## Dangling commits
Discard your works. if you don't point a new branch at those commits, they will no longer be referenced in git. (dangling commits), and eventually they will be garbage collected.

``` bash
> git checkout master
Warning: you are leaving 1 commit behind, not connected to any of your branches:
    f9f8f8f  Merge branch 'tech_post' into master
```

# Fast forward
happens when there are no commits on the base branch that ocurred after the feature branch was created.

in order to avoid this you cant specify `git merge --NO-FF`

## Git merge --no-ff

to retain the history of a merge commit, even if there are no changes to the base branch:

``` bash
> git merge --no-ff \<new_feature>
```
this will force a merge commit, even when one isn't necessary.

``` bash
> git checkout master
> git merge --no-ff new_feature
```
 ## Merge conflicts
 this happen when we try to merge a branch that has a commit that are not comparable to the base branch. git stops until you resolve the merge conflict.

 ``` bash
 > git merge feature
Auto-merging feature
CONFLICT (add/add): Merge conflict in feature
```

## Git RERERE - REuse REcorded REsolution
Git saves how you resolve a conflict and the next conflict will reuse the same resolution.

This is useful for long lived feature branch (like a refactor) or rebasing.

To enable this feature you must:
``` bash
> git config rerere.enabled true
```
is you want to enable it globally:
``` bash
> git config --global rerere.enabled true
```

let's consider a feature branch that has a conflict:
``` bash
> git checkout feature
> git merge master
Auto-merging master
CONFLICT (add/add): Merge conflict in master
Recorded preimage for 'file'
Automatic merge failed; fix conflicts and then commit the result.
### Fix the merge conflict in file
> git add file

> git commit -m "fix conflict"
Recorded resolution for 'feature'
[master f9f8f8f] fix conflict
```
now when we try to merge again, git will reuse the resolution:
``` bash
> git merge master
Auto-merging master
CONFLICT (add/add): Merge conflict in master
Resolved 'feature' using previous resolution
Automatic merge failed; fix conflicts and then commit the result

> git add fil
> git diff --staged
diff --git a/file b/file
index e69de29..e69de29 100644
--- a/file
+++ b/file
@@ -1 +1 @@
-The old change
+This is how I resolved my conflict
\ No newline at end of file
```
for more information you can visit [this link](https://git-scm.com/docs/git-rerere)

# Commits

## Bad commits messages
bad commit messages are:
- empty
- too long
- too short
- not descriptive enough

let's consider
- asdfasdfa
- create main loop and timing control
- enabled config file parsing
- misc bugfixes

good commits are important, they are the reason for the code to be stable and maintainable. They help with:
- debugging and troubleshooting
- creating release notes
- code reviews
- rollbacks
- associating the code with an issue or ticket

unfortunately, almost all people commits wit `>git commit -m "message"` and encapsulate a complex idea in one line is not a good practice. 69 characters to a commit is not enough to describe the code, if your commit message is longer than that you will have to split it into multiple commits.

a good commit message should have this structure:

- Encapsulate the idea in a sentence
- Doesn't introduce breaking changes

let's consider this:

- [feature/main_loop] create main loop and timing control
- [feature/config_file_parsing] enabled config file parsing
- [bugfix/misc_bugfixes] misc bugfixes

## Git log
the basic command to see the history of your repository:
``` bash
> git log
commit cc74f5808641c100e63346f21fde833ad5cc8ba2 (HEAD -> exercise4, mundo)
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Wed Jun 15 14:38:39 2022 -0500

    changing the world to mundo
    commit b031caaeb1bf6846621a96322c9686fed8b112bc
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Wed Jun 15 14:31:23 2022 -0500

    test

```

## --since
you can specify a date to see the commits that happened since that date.

- git log --since="yesterday"
- git log --since="2 days ago"

## --follow
log files that have been moved or renamed.

``` bash
> git log --name-status --follow <file>
```

## --grep
search for commit messages that match a regular expression:
``` bash
> git log -grep <regexp
```

it can be mixed and matched with other flags.

example:
``` bash
> git log -grep=mail --author=matt --since=2.weeks"
```

## got log diff-filter
selectively include or exclude files that have been:
- (A)dded, (D)eleted, (M)odified, (R)enamed, (C)opied, (T)racked, (U)nmerged, or (?)Unknown

``` bash
> git log --diff-filter=A --stat
commit 498eb9342aa136cb16e5044e0c3396dec109ae4b (exersice3)
Author: Matthew Seidel <matthew.seidel@unosquare.com>
Date:   Wed Jun 15 15:29:07 2022 -0500

    This is a test

 matt.txt | 1 +
 1 file changed, 1 insertion(+)

commit 106772437f8b1360084775b8d18b1d6b1043db27 (origin/main, origin/HEAD)
Author: Luis Manuel Naranjo <luis.naranjo@unosquare.com>
Date:   Wed May 25 13:50:27 2022 -0500

    Initial commit

 README.md | 1 +
 ```

## git log referencing commits

^ or ^n, when pass no arguments it will be the first parent commit, when pass an argument it will be the n number, where n is the argument you passed

~ or ~n, when pass nor argument it will be the first commit back, following the first parent commit, when pass an argument it will be the n number, where n is the argument you passed

it can be ^ and ~ combined

let's consider
```  
A
    -B
        -D              A =             = A^0
        -E              B = A^          = A^1       =A~1
        -F              C = A^2         
    -C                  D = A^^         = A^1^1     =A~2
        -F
```

## GIT SHOW: LOOK AT COMMIT
show commit and contents
    
    ``` bash
    > git show <commit>
    ```
show files changed in commit
``` bash
> git show <commit> --stat
```

look at a file from another commit
``` bash
> git show <commit>:<file>
```

## diff
show the changes between two commits, between the stanging area and the repository and what's in the working area

``` bash
> git diff <commit>
```

unstaged changes
``` bash
> git diff
```
staged changes
``` bash
> git diff --staged
```

## diff branches
which branches are merged with master, and can be cleaned up
``` bash
> git diff --merged master
```
which branches are not merged with master, and can be cleaned up
``` bash
> git diff --no-merged master
```

# Fixing mistakes
exists tools to help to fix mistakes such as:
- checkout
- reset
- revert
- clean

## checkout
we can restore tree files or switch between branches

``` bash
> git checkout <commit>
```

#### what happen when we checkout?
1. changes HEAD to point to the new branch
2. Copy the commit snapshot to the staging area
3. Update the working area with the branch content
#### what happen when git checkout --file?
Replace the working area, copy the version from the current staging area

when git checkout overwrite the working area file with the staging area version from the last commit.

usually most get confused about this the double dash '--', this is used to separate the command from the arguments.

``` bash
git checkout -- <fil_path>
```

##### what happen when you git checkout \<commit> --file?
1. update the staging area to match the commit
2. Update the working area to match the starting area

### from a specific commit
copies both working area and starting area
``` bash
git checkout <commit> -- <file_path>
```

## git clean
will clear your working area by deleting untracked files.

you can use --dry-run to see what would be deleted

the -f flag to do the deletion

the flag -d will delete untracked files and directories

## git reset
reset is another command that performs different actions depending on the arguments with a path or not, by default, git performs a `git reset -mixed`

the big difference between git checkout and git reset is checkout moves the reference to the commit, while reset moves the reference to the commit and head.

## git reset \<commit> cheat cheat
1. Move head and current branch
2. reset the staging area
3. reset working area

--soft (1)
---mixed (1) & (2) (default)
---hard (1) & (2) & (3)

# git amend
amend is a command that allows you to edit the last commit 

``` bash
cat index.txt
welcome.txt welcome to my blog
python.txt why python is my favorite language

> git commit -m "Add blog post about python"
[tech_post 4f8f8f8] Add blog post about python
 1 file changed, 2 insertions(+)
 create mode 100644 python.txt
 # i forgot to add blog post
 git add post/python.txt
 git commit --amend
 [tech_post d3f122] Add blog post about python
 2 files changed, 1 insertion(+)
 create mode 100644 python.txt
 create mode 100644 post/welcome.txt
 ```

 as you can see the messages are the same, but the sha are different. Why?

 remember, **commits can not be edited** because they are immutable.
 even if the tree the commit points to is the same, and the shares author, tha date is still different! so a new commit is created

 ## rebase anyway
 image our tech_post and master branch have diverged, we don't want a messy merge commit in our history.
 So we can pull in all the latest changes form master, and apply our commit on top of them by changing the parent commit of our commits.
 so this does rebase, gives a commit a new parent, and then we can merge the two branches again.

``` bash
> git checkout tech_posts
Switched to branch tech_posts
> git rebase master
First, rewinding head to replay your work on top of it...
Applying: Add blog post about python
  
```

the commits can be:
- edited
- removed
- combined
- re-ordered
- inserted
before they're "replayed" on top of the new HEAD.


in the format of \<command> \<commit> \<commit msg> git will pick the commits in the specified order, or stop to take an action when editing or conflict occur.

Interactive rebase with a shortcut
git rebase -i <commit_to_fix>^
(the ^ represent the parent commit)

## rebase options
- pick
    - keep this commit
- reword
    - keep this commit, but change the commit message
- edit
    - keep this commit, but stop to edit mor than the message
- squash
    - combine this commit with the previous one. keep the previous commit message
- exec
    - run the command on this line after picking the previous commit
- drop
    - remove the commit (tip: if you remove this line, the commit will be dropped too!)

tip: you can use rebase to split commits, so you can have a commit into multiples ones. for this you must:
1. start an interactive rebase with rebase -i
2. mark the commit with an edit
3. git reset HEAD^
4. git add
5. git commit
6. repeat 5 and 5 until the working area is clean
7. git rebase --continue

what if we want to amend an arbitrary commit?

1. girt add new files
2. git commit --fixup \<SHA>
    1. this creates a new commit, the message starts with 'fixup'
3. git rebase -i --autosquash \<SHA>^
5. git will generate the right to do for you! just save and quit.

### pull the rip cord!
at any time before rebase is done, if things are going wrong you can `git rebase --abort`

this can be:

- before you rebase / fixup / squash / reorder:
- makes a copy of your current branch:
    - git branch my_branch_backup
- git branch will make a new branch, without switching to it
- if rebase "succeeds" but you messed up...
- git reset my_branch_backup --hard

you're back in business!

### Advantages!
- rebase is incredibly powerful!
- you can slice and dice your git history!
- it's easy to fix previous mistakes in code
- you can keep your git history neat and clean

### commit early and often vs good commits
- git best practice:
    - commit often, prefect later publish once
when working locally, commit whenever you make changes, this will help you to be a more productive developer
- before pushing work to a shared repo you must rebase to clean up the commit history