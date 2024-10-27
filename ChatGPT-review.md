# Review of ChatGPT o1-preview, o1-mini, and 4o with canvas:

- The AI tools we used to build the landing page in this test are:
  - ChatGPT o1-preview
  - ChatGPT o1-mini
  - 4o with canvas
- The landing page was built with Next.js, TailwindCSS, MongoDB Node.js Driver, and `next-intl` internationalization.

## Conclusion

- Manual copy/paste with ChatGPT o1-preview and o1-mini was very inefficient and time-consuming.
- Both models are very verbose and repetitive, which makes it difficult to find relevant information.
- The 4o with canvas model was the most effective among them, because:
  - it provided a more clear and concise answer to the questions,
  - it has vision capabilities, which is useful for building a landing page based on designs,
  - it has access to the internet and can read files, what makes it much more useful for our case.
  - it also has access to Canvas, which allow us to edit responses in the chat interface, but it's not very intuitive.
- But even with the 4o with canvas model, it was still very time-consuming and inefficient to copy/paste the answers.
- During the test I really missed Cursor Tab autocomplete and ability to implement suggestions from chat directly in the code ;)
- The biggest issue was the cutoff of the model, which made it difficult to work with newest Next.js 15, React 19 and next-intl 3.
- Especially next-intl 3 has changed a lot, and models provided outdated information.

## Summary

It would be faster to configure whole page with next-intl manually just with documentation, and use ChatGPT o1-preview and o1-mini on later stage for layout and API implementation, which it did pretty well.

o1 models doesn't have vision capabilities so I've used 4o to describe the layout based on images with designs.
The result is not very far from the designs, but it's not perfect. Vision model should be used for this.

So I would say that for FE job with UI development o1 models are not a good choice. But for less visual tasks requiring deep analysis and not based on the newest information/data, o1 models are good. Otherwise we have to provide them all the context needed.
