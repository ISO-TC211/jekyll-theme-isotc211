# jekyll-theme-isotc211

Modern Jekyll theme for ISO/TC 211 resource sites — Vite 7, Tailwind CSS v4,
dark mode, Inter font, responsive design.

Used by [www.isotc211.org](https://www.isotc211.org),
[registry.isotc211.org](https://registry.isotc211.org), and
[standards.isotc211.org](https://standards.isotc211.org).


## Installation

Add to your Gemfile:

```ruby
gem "jekyll-theme-isotc211", "~> 1.0"
```

And to `_config.yml`:

```yaml
theme: jekyll-theme-isotc211
```

Your site also needs `jekyll-vite`:

```ruby
group :jekyll_plugins do
  gem "jekyll-vite"
end
```

And a `package.json` with Vite + Tailwind:

```json
{
  "private": true,
  "type": "module",
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@tailwindcss/typography": "^0.5",
    "postcss": "^8",
    "tailwindcss": "^4",
    "terser": "^5",
    "vite": "^7",
    "vite-plugin-ruby": "^5"
  }
}
```


## Configuration

```yaml
title: "Resource site for ISO/TC 211 Geographic information/Geomatics"
title_html: "ISO/TC&nbsp;211"
brand_sub: "Harmonized Resources Maintenance Agency"
description: "Resource site description"

header_logo: "/assets/iso-red.svg"  # Optional, defaults to iso-red.svg

google_analytics:
  id: UA-XXXXX-Y

committee:
  id: 211
  name: Geographic information/Geomatics
  home: https://committee.iso.org/home/tc211

nav:
  - title: About
    url: /about/
  - title: Blog
    url: /posts/

footer_links:
  - title: Geodetic Registry
    url: https://geodetic.isotc211.org/
  - title: Schemas
    url: https://schemas.isotc211.org

awards:
  - title: 2010 Lawrence D. Eicher Leadership Award
    path: /award/2010/09/16/tc211-wins-iso-excellence-award.html

social:
  links:
    - url: https://twitter.com/ISOTC211
    - url: https://github.com/ISO-TC211

favicon_svg: "/assets/favicon.svg"
favicon_ico: "/assets/favicon.ico"
```


## Layouts

| Layout | Description |
|--------|-------------|
| `default` | Full page: head, header, main, footer, Vite JS |
| `base` | Raw content pass-through |
| `home` | Content + optional news roll |
| `page` | Generic content page |
| `post` | Blog post with illustration support |
| `posts` | Blog index |
| `base-page` | Content page with header (for resource browser) |
| `resource-index` | Resource directory listing |
| `resource-page` | Two-pane BlueprintJS resource browser |

Sites can override any layout by creating a file with the same name in their
own `_layouts/` directory.


## CSS

The theme provides these CSS files in `_frontend/css/`:

| File | Content |
|------|---------|
| `header.css` | Fixed glassmorphic header, brand bar, navigation |
| `footer.css` | Footer grid, links, social icons |
| `typography.css` | Section labels, headings, meta text |
| `page.css` | AsciiDoc documentation prose defaults |
| `home.css` | Sections, blog list, awards, about page |

Sites can add their own CSS files and import them in their
`_frontend/entrypoints/application.js`.


## Migration from v0.x

1. Remove `font_awesome_kit_url` from `_config.yml`
2. Remove `_sass/` directory from site
3. Replace `jekyll-plugin-frontend-build` with `jekyll-vite` in Gemfile
4. Add Vite config files (`vite.config.ts`, `postcss.config.js`, `config/vite.json`)
5. Update `nav` config from `nav.items` array-of-objects to flat `nav` array
6. Update `footer_nav` to `footer_links`
7. Remove Babel config if present


## Development

```sh
bundle install
```

Point a site to the local theme via Gemfile:

```ruby
gem "jekyll-theme-isotc211", path: "../jekyll-theme-isotc211"
```


## License

MIT
