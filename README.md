# Tree.ly coding task

In this coding task you are asked to work on our open-source project called
[openyieldtables](https://github.com/treely/openyieldtables). Find the website
here: [yieldtables.org](https://yieldtables.org). Yield tables are tables that
provide information about the expected growth of trees in a forest per species.
In the [Yield Table Explorer](https://yieldtables.org/v1/yield-tables-meta/)
you can find all the yield tables and see the structure of them. The repository
includes a Python package and a RESTful API. On the website linked above you
can find links to the Python package documentation and the API docs.

## What we want you to do

We need interpolated versions of the yield tables for several use cases. For
the yield class, which is a property on each yield table, we require
interpolated versions of the data. For example, if a yield table has the yield
classes `8` and `9`, we need the interpolated version of the yield table for
the yield class `8.3`. Your task is to build a Next.js UI (using the yield
table API) where you can select a yield table, enter a yield class
(e.g. `8.3`), and display the interpolated result of the yield table. You can
choose the interpolation method; we currently use linear interpolation.

Please choose the libraries and tools you prefer, if you choose something very
special, please argue why you chose it. The UI should be easy to use and
accessibly.

## What's important for us

The evaluation of the task will be based on the following:

- Correctness (Everything works like expected)
- Robustness (The UI catches all cases)
- Cleanliness (Easy to read code - well formatted - a good amount of comments)
- Documentation (Setup and running the code as well as important decisions
  should be documented and understandable)
- Interaction with the Tree.ly team

## Recommendations

Please set up a GitHub repository where you push your code and add `lukasbals`
as a collaborator. If you need help, feedback, or just want to talk about your
implementation during the task, don't hesitate to reach out to me.

If you have questions about the structure of the yield tables please also reach
out. We are happy to help.

## Useful links

- [The yield tables website](https://yieldtables.org)
- [The yield tables repository](https://github.com/treely/openyieldtables)
- [The API docs](https://yieldtables.org/docs)
- [The Python package docs](https://openyieldtables.readthedocs.io/en/latest/)
- [The yield table explorer](https://yieldtables.org/v1/yield-tables-meta/)
- [Yield table raw data](https://github.com/treely/openyieldtables/tree/main/src/openyieldtables/data)
  The data is stored in CSV files in the `src/openyieldtables/data` folder.
