# todo-app

A **"To do" list** application built with Next.js 14 (app router) with TypeScript and Tailwind CSS.

## Technologies used

1. Next.js 14
2. React
3. TypeScript
4. Tailwind CSS

## Running the app

1. Clone the application.
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local server URL ([http://localhost:3000](http://localhost:3000)) in your web browser.

## Technical Docs

### Dark Mode (with Tailwind CSS)

1. Enable dark mode in tailwind.config.ts by adding the ff in config object:

```(ts)
const config: Config = {
  darkMode: 'class',
}
```

2. To toggle dark mode in the application, use the `useDarkMode` custom hook. Create a theme switcher button and use the `toggleDarkMode` function returned by the `useDarkMode` and pass it to the onClick handler of the theme switcher button. This custom hook adds a `dark` class to the `html` tag.

3. The added `dark` class to the `html` tag is being picked up by Tailwind CSS. In your JSX, the utility classes that are prepended with `dark:` will be applied whenever `dark` class is present in the `html` tag. (Reference: https://tailwindcss.com/docs/dark-mode)

4. To enable toggling dark mode in the stories in the Storybook app, we installed `storybook-tailwind-dark-mode`. After installing, do the ff:

   - Add `storybook-tailwind-dark-mode` in the `addons` array in `.storybook/main.js`:
     ```(typescript)
     const config: StorybookConfig = {
        addons: [
            // other addons here
            'storybook-tailwind-dark-mode',
        ],
     };
     ```
   - Add `darkMode` property (empty object) under `globalTypes` oject in `.storybook/preview.js`:
     ```(typescript)
      const preview: Preview = {
        globalTypes: {
          darkMode: {},
        },
      };
     ```

   Reference: https://storybook.js.org/addons/storybook-tailwind-dark-mode
