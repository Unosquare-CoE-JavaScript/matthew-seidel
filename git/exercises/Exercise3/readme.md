### Exercise
1. Check the value of your `HEAD` variable (hint: look in `.git`) and confirm you're pointed at the `exercise3` branch.
2. Use `show-ref` to look at your other heads.
3. Create a lightweight tag and confirm that it's pointing at the right commit.
4. Create an annotated tag, and use `git show` to see more information about it.
5. Get into a "detached HEAD" state by checking out a specific commit, then confirm that your HEAD is pointing at this commit rather than at a branch.
6. Make a new commit, then switch branches to confirm that you're leaving a commit behind.

### Solution
1. 
``` bash
> git checkout exercise3
Switched to branch 'exercise3'
> git branch
  exercise2
* exercise3
  master
```
2. 
``` bash
> git show-ref --heads
43388fee19744e8893467331d7853a6475a227b8 refs/heads/exercise2
e348ebc1187cb3b4066b1e9432a614b464bf9d07 refs/heads/exercise3
43388fee19744e8893467331d7853a6475a227b8 refs/heads/master
```
3.
``` bash
> git tag first-commit
```

4.
``` bash
> git tag -a v1.0 -m "Version 1.0"
> git show v1.0
object e348ebc1187cb3b4066b1e9432a614b464bf9d07
type tag
tag v1.0
tagger Matthew Seidel \<matthew.seidel@unosquare.com>
date "Wed, 15 Jun 2022 15:00:09 -0500"
```
5.
``` bash
> git log --oneline
6b6bf1e (HEAD -> main, tag: v1.0, tag: git-course, tag: first-commit, origin/1.4-concurrent-rendering, 1.4-concurrent-rendering) concurrent rendering
1067724 (origin/main, origin/HEAD) Initial commit
> git checkout 1067724
Note: switching to '1067724'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 1067724 Initial commit
```

6.
``` bash
> echo "this is a test file" > matt.txt
> git add matt.txt
> git commit -m "This is a test"
[detached HEAD 498eb93] This is a test
 1 file changed, 1 insertion(+)
 create mode 100644 matt.txt
> git log --oneline
498eb93 (HEAD) This is a test
1067724 (origin/main, origin/HEAD) Initial commit
> cat .git/HEAD
498eb9342aa136cb16e5044e0c3396dec109ae4b
```