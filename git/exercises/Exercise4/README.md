1. Merge the `exercise3` branch into `exercise4`, and look at the git log.
2. Use `git reset --hard HEAD^` to reset your `exercise4` branch back one commit, then use the `--no-ff` option to `git merge` to merge `exercise3` again. Look at the git log, how is it different from the last step?
3. Make two conflicting changes to `hello.txt` in two different branches.
4. Enable ReReRe, then merge one branch into the other.
5. Backup again with `git reset --hard HEAD^`, then attempt the merge again. Notice how ReReRe automatically resolves the conflict for you.

# Solution

1. Merge the `exercise3` branch into `exercise4`, and look at the git log.

``` bash
$> git merge exercise3
Updating 43388fe..e348ebc
Fast-forward
  hello.txt | 1 +
  1 file changed, 1 insertion(+)
```

2. Use `git reset --hard HEAD^` to reset your `exercise4` branch back one commit, then use the `--no-ff` option to `git merge` to merge `exercise3` again. Look at the git log, how is it different from the last step?

``` bash
$> git reset --hard HEAD^
HEAD is now at 43388fe Initial commit
$> git merge --no-ff exercise3
Merge made by the 'recursive' strategy.
 hello.txt | 1 +
 1 file changed, 1 insertion(+)
 ```

 3. Make two conflicting changes to `hello.txt` in two different branches.

 ``` bash
$> git checkout -b mundo
$> echo "mundo" > hello.txt
$> git add hello.txt
$> git commit -m "mundo"
[mundo cc74f58] changing the world to mundo
 1 file changed, 1 insertion(+), 1 deletion(-)
$> git checkout exercise4
$> echo "hola world" > hello.txt
$> git add hello.txt
$> git commit -m "hola world"
```
    
4. Enable ReReRe, then merge one branch into the other.
    
``` bash
$> git config rerere.enabled true
$> git merge mundo
Auto-merging matt.txt
CONFLICT (content): Merge conflict in matt.txt
Recorded preimage for 'matt.txt'
Automatic merge failed; fix conflicts and then commit the result.
$> git rerere diff
--- a/matt.txt
+++ b/matt.txt
@@ -1,5 +1,5 @@
-<<<<<<<
-hello mundo!
-=======
+<<<<<<< HEAD
 hola World
->>>>>>>
+=======
+hello mundo!
+>>>>>>> mundo
$> echo "hola mundo" > hello.txt
$> git add hello.txt
$> git commit -m "hola mundo"
[exercise4 fc9e7b0] hola mundo
 1 file changed, 1 insertion(+), 1 deletion(-)
 ```
 5. Backup again with `git reset --hard HEAD^`, then attempt the merge again. Notice how ReReRe automatically resolves the conflict for you.

 ``` bash
$> git reset --hard HEAD^
HEAD is now at b031caa test
$> git merge mundo
Updating b031caa..cc74f58
Fast-forward
 matt.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
 ```