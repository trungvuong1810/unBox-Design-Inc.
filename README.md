# unBox Design Inc. — website

Static, multi-page site for unBox Design Inc. (Toronto industrial design & product development). No build step and no dependencies: open `index.html` or serve the folder with any static host (GitHub Pages, Netlify, etc.).

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Pages
| Page | File |
| --- | --- |
| Home | `index.html` |
| Work index (filterable) | `work/index.html` |
| Xamrai Gym Band | `work/xamrai-gym-band.html` |
| COVID Medical Respirator | `work/covid-respirator.html` |
| Acorn Lamp | `work/acorn-lamp.html` |
| Services | `services.html` |
| Process + FAQ | `process.html` |
| Studio (about) | `studio.html` |
| Contact (form opens the visitor's email app) | `contact.html` |
| Not found | `404.html` |

## Structure
- `css/style.css`: all styles. Colours and fonts are CSS variables at the top.
- `js/main.js`: Toronto clock, mobile menu, scroll reveals, project-list hover preview, work filters, contact-form mailto and page transitions.
- `assets/`: line-drawing SVG illustrations and the logo mark.

## Replacing illustrations with photos
The SVGs in `assets/` are placeholders drawn for each project. To use real photography, drop images into `assets/` and change the matching `src` attributes. They're also used for the hover preview (`data-preview`) on the home page.

The header and footer are repeated in each HTML file. If you change navigation, update every page.
