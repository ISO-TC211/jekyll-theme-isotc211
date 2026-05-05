# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

jekyll-theme-isotc211 is a Ruby gem providing a Jekyll theme for ISO/TC 211 resource sites. It bundles layouts, includes, CSS (Tailwind v4), JS (dark mode toggle), and Vite config — consuming sites install the gem and override as needed.

Used by www.isotc211.org, registry.isotc211.org, and standards.isotc211.org.

## Commands

```sh
bundle install          # install Ruby deps
bundle exec rake        # default task (currently empty — no test suite)
gem build jekyll-theme-isotc211.gemspec   # build the gem locally
```

There is no test suite. The CI (`rake` workflow) just runs `bundle exec rake` on Ruby 3.4 and 4.0 to verify the gem loads.

To develop against a consuming site, point the site's Gemfile at the local theme:
```ruby
gem "jekyll-theme-isotc211", path: "../jekyll-theme-isotc211"
```

## Architecture

**Gem structure** — `jekyll-theme-isotc211.gemspec` ships only files matching `_includes/`, `_layouts/`, `_frontend/`, `assets/`, `config/`, plus top-level config/license/readme. Everything else (Gemfile, Rakefile, vite.config.ts, etc.) is dev-only and excluded from the gem.

**Layout hierarchy**: `base.html` wraps `default.html` (head + header + main + footer + Vite JS). `home`, `page`, `post`, `posts` all use `default`. Sites override layouts by creating same-named files in their own `_layouts/`.

**Frontend pipeline**: Vite 7 + Tailwind CSS v4 via PostCSS. Entry point is `_frontend/entrypoints/application.js` which imports all CSS files and `theme.js`. Output is loaded via `{% vite_stylesheet_tag application %}` and `{% vite_javascript_tag application %}` (jekyll-vite helpers). Vite config is in `config/vite.json` (source dir: `_frontend`).

**Dark mode**: `theme.js` (IIFE, no deps) manages `dark` class on `<html>`, persisted in localStorage under `iso-tc211-theme`. Inline critical styles in `head.html` ensure no FOUC.

**Config keys** (`_config.yml` defaults): `title`, `title_html`, `brand_sub`, `header_logo`, `nav` (flat array), `footer_links`, `committee`, `social.links`, `awards`, `google_analytics`, `favicon_svg`, `favicon_ico`.

## Release

Triggered via GitHub Actions `release.yml` (workflow_dispatch or repository_dispatch). Optionally bumps version in gemspec, builds gem, pushes to RubyGems, tags and pushes to main. Version is in `jekyll-theme-isotc211.gemspec` `s.version`.

## CSS conventions

CSS files live in `_frontend/css/` — one file per concern (header, footer, typography, page, home). Uses Tailwind v4 utility classes with `@tailwindcss/postcss`. No SCSS.
