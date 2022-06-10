# React testing library

- Not just a library, also a philosophy ("opinionated")
    - Test your software the way user actually use it
        - not internal implementation
    - Find elements by accessibility markers, not test IDs
- More philosophy

## What is React testing?

- React testing library
    - Provides virtual DOM for tests
- Jest
    - Test runner that
        - find tests
        - runs test
        - determines whether test passed or failed

## Assertions
- **toBe:** checks if value is equal to expected value
- **toHaveLength:** checks if array has expected length.
- **toBeVisible:** checks if element is visible
- **toBeChecked:** checks if element is checked

## TDD
is write test first, then write code according to "spec" set out in test

### why TDD
makes a huge difference in the way you write code, part of the coding process, not a "chore" to do at the end
