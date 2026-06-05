# AI Chef – Addme Seasoning

A React + Tailwind CSS v4 app that generates a personalised Chef Identity Card based on user answers.

## Tech Stack
- React 19 + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion (page transitions)
- React Router DOM v7
- localStorage (data persistence)

## Getting Started

```bash
npm install
npm run dev
```

## Flow
1. **Landing** – Intro screen
2. **Upload** – Take selfie or upload photo + enter name (NO spaces, auto-capitalized)
3. **Question 1** – Chef type
4. **Question 2** – What matters in cooking
5. **Question 3** – What people remember about your food
6. **Generating** – Loading animation while persona is computed
7. **Card** – Generated Chef ID card with download/share
8. **Ambassador Prompt** – Invite to become ambassador
9. **Ambassador Details** – Form saved to localStorage
10. **Success** – Confirmation

## Persona Logic
| Priority | Q2 | Q3 | Persona |
|---|---|---|---|
| 1 | Aroma | Great Aroma | Minister of Aroma |
| 2 | Presentation | Beautiful Presentation | The Camera Eats First Chef |
| 3 | Creativity | Unique Recipes | The Creative Game Changer |
| 4 | Consistency | Signature Recipes | The Recipe Plug |
| 5 | Taste OR Speed | Comfort Food | The People's Favourite |
| 6 | Taste | Rich Flavour OR Signature Recipes | Chief of Flavour |

## Notes
- All data stored in `localStorage` under `ai_chef_data`
- Ambassador submissions stored in `ai_chef_ambassadors`
- Replace share URLs and API endpoints as needed
