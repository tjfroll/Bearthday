### Installation
```
npm install
npm run dev
```

Then, navigate to http://localhost:3000/ in your browser.

### Implementation Notes

This was built using Next.js, Typescript, and Jest, with some date manipulation handled by Luxon.

I'd been meaning to check out Next.js, so I used it to get started in this project. I encountered some issues integrating ts-jest (to keep my test files in Typescript), which required some workarounds. First, Jest requires a custom tsconfig (tsconfig.jest.json) in order to ensure JSX files are transformed into JS. Second, Jest needs some help mocking out CSS Modules, so I used identity-object-proxy as a module wrapper.

For the app itself, there are some unsolved corner cases:
 - Birthdays which occurred very recently (within the last 2 weeks) usually fail to return photos, as NASA has not uploaded any photos between the most recent birthday and today's date
 - leap year birthdays (February 29) will return photos for March 1
