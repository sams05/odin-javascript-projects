## Recursion

My implementation of fibonacci and merge sort for TOP's [Recursion Project](https://www.theodinproject.com/lessons/javascript-recursion)

Topics covered:
- Algorithms/pseudocode
- Recursion
    - Benefits
        - [Traverse recursive structures](https://javascript.info/recursion#recursive-traversals)
        - Shorter, more readable code. More elegant.
    - Limits
        - Less efficient than iterative approach. Overhead from creating an execution stack for each recursive call.
        - May lead to overlapping subproblems (e.g. naive implementation of fibonacci)
- [Recursive tail calls](https://webdocs.cs.ualberta.ca/~holte/T26/efficient-rec.html). Convert to recursive tail calls by expanding function definition to pass accumulators (intermediate results).
