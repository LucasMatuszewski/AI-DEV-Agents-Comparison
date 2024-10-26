## Landing Page and Implementation Descriptions for AI Tools

**TL:DR**: Designs are available in the [Designs](#designs) section.

_Go back to [README.md](README.md) for the main description._

### Project Initialization

- **Initialize a Next.js project with TypeScript support.**
- **Set up TailwindCSS for styling** in the Next.js project.
- **Use MongoDB Node.js Driver** to save form submissions in the `waiting-list` collection. Connect using the URI provided in the `/.env` file as `DATABASE_URI` env.
- **Configure `next-intl` for internationalization** with English and Polish locales saved in the `/locales/` folder as `en.json` and `pl.json` files (they are empty; use English text from the landing page description to populate them and translate them to Polish).
- All required files (logo in SVG, favicon, hero image) are in `/public/images/` folder.

### Design Implementation

- **Create a black-themed landing page** following the attached design files as closely as possible.

- **On Desktop: Hero Image Layout**

  - Two sections in the Hero Image:
    - Picture on the left
    - On the right: logo, text, and form aligned to the left side.
  - **Elements to Include:**
    - White Edukey logo at the top, followed by a smaller "is Cooking..." tagline.
    - Header (H1): "AI Sales & Marketing Acceleration platform" with the word "acceleration" in red (company red color).
    - Paragraph: "Be among the first to experience our cutting-edge AI platform that revolutionizes sales and marketing with Personal AI Trainers (realistic 3D avatars) and cutting-edge AI Automation Tools."
    - Another paragraph above the form: "Join our waiting list and step into the future:"
    - Below, add the email submission form with JavaScript validation:
      - Input: "Your email\*"
      - Button: "Join the revolution!"

- **On Mobile**

  - The right section from the desktop view appears first (with logo, headers, paragraph, and form), followed by the image.

- **Making of Section Below Hero Image**

  - Text: "This page was crafted with the power of AI. Read about the AI tools we used to build it:"
  - Add a list of AI tools used:
    - How AI Built this Landing Page + GPT-4 o1 (manual copy/paste)
    - GitHub Copilot Workspace
    - Cursor AI Composer + Cursor Tab
    - Aider and ClaudeDev (Cline)

### Form Functionality

- **Client-Side Validation**

  - Ensure the email input field meets the required format and is provided.

- **On Form Submission**

  - Save the email to the MongoDB `waiting-list` collection following the provided schema.
  - After the initial email submission, display a second form with not obligatory fields:
    - the user's name (text input),
    - position (select list),
    - company name (text input),
    - country (select list),
    - and industry (select list),
  - Remember to update the existing MongoDB document for the previously submitted email.
  - Provide options for position and industry select lists following the most standard options AI startups use.
  - For the country select list options, you can use some publicly available API or just create example options yourself yourself.
  - At least one field is required for the second form to be valid.

- **Button Text Changes**

  - Initial Button Text: "Join the Revolution"
  - After Click: "Tell Us More About You"

- **Form Validation Messages**

  - "Please enter a valid email address."
  - "Thank you! We've saved your email. Please, could you tell us a bit more? It will help us decide who will be invited to the closed beta first."
  - "Thank you again! You are on our waiting list

### Image and Assets

- **Hero Image**: Include a 1:1 square image depicting a cyberpunk chef cooking with elements representing AI and sales. The image is available in the `/public/images/` folder in two formats (jpg and WebP) and two sizes.
- **Optimize Images for Web Performance**. On mobile, the image should be cropped on the sides to show the center part only, and we can also crop the bottom part around 20%.
- **Alt Text for Image**: "Cyberpunk chef crafting AI solutions in a futuristic Tokyo street at night."

### Styling and Responsiveness

- **TailwindCSS for Responsiveness**: Make the landing page responsive for both mobile and desktop views.
- **Color Palette**: Black, white, and intensive red (`hsl(360, 87%, 44%)`).
- **Animations**: Add subtle animations on button hover and for main elements to fade in.

### Localization and Language Detection

- **Language Detection**: Implement automatic language detection based on the user's browser settings using `next-intl`.
- **Language Toggle**: Provide a toggle between English and Polish in the top-right part of the page with "PL" and "EN" + an icon typical for select lists.

### Footer and Additional Sections

- **Footer**
  - Include a simple footer with the Edukey logo, copyright information, and the current date.
  - Add a white line at the top of the footer to differentiate it as a separate section.
  - Text: "© 2023 Edukey AI. All rights reserved."

### Accessibility and SEO

- **Accessibility**: Ensure all images have descriptive alt text.
- **SEO Optimization**: Include appropriate meta tags and descriptions for SEO.

### Code Quality and Best Practices

- **Next.js and React Best Practices**: Ensure the code is clean, well-documented, and modular.

### Environment Variables and Security

- **Environment Variables**: Store sensitive information like MongoDB credentials in environment variables.

- **Server-Side Handling of Submissions**: Use Next.js internal API (App Router) to manage form submissions securely.

- **Data Integrity**: Use the MongoDB validation schema provided to maintain data integrity.

### Design Enhancements

- **Typography**: Use modern, clean fonts that are easy to read against the dark background.
- **Consistency**: Maintain consistent spacing, padding, and alignment throughout the page.

### User Experience

- **Loading Indicators**: Provide visual feedback for actions that take time, like form submission.
- **Error Handling**: Handle errors gracefully, informing the user if something goes wrong.

### SEO and Meta Tags

- **Title Tag**: "Edukey AI – AI-Driven Sales Acceleration Platform"
- **Meta Description**: "Join Edukey AI's waiting list and be the first to revolutionize your sales and marketing with our AI-powered platform and 3D avatar trainers."

## Designs

_I'm not a designer, so don't expect anything fancy here ;)_

![Hero Image Desktop](/public/Edukey-AI-Waiting-List-horizontal.png)

![Hero Image Mobile](/public/Edukey-AI-Waiting-List-Mobile.png)
