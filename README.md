# ISO/TC211 theme by Ribose

Jekyll theme for ISO TC resource websites sites.

Currently used across ISO/TC211 resources
powered by Ribose, including resource index https://www.isotc211.org
and resource sites such as https://geolexica.org/, https://def.isotc211.org/.


## Configuring site

Theme relies on accompanying helper plugin
(note: plugin gem version should match theme version):

```
group :jekyll_plugins do
  gem "jekyll-theme-isotc211-helpers"
  # ...
end
```

Other recommended plugins to add to your Gemfile:

```
group :jekyll_plugins do
  gem "jekyll-theme-isotc211-helpers"

  # ...
  gem "jekyll-data"
  gem "jekyll-asciidoc"
  gem "jekyll-external-links"
end
```

Configuration keys:

```
title: <site title to be used in meta and in body>
title_html: <if specified, is used in body instead of title>

font_awesome_kit_url: <url to your FA kit, free kits are OK with stock theme version>

google_analytics:
  id: UA-XXXXXX-X

committee:
  id: <numerical committee ID>
  name: <full committee name>
  home: <committee homepage, probably on iso.org>
  links:
    - url: /about
      title: About
    - url: /strategic-policy
      title: Strategic Policy Statement
    - url: /faq
      title: FAQ

# Builds browsable resource pages
resource_listings:
  schemas:
    # Source directory containing resources, relative to site source root.
    # Each subdirectory within will be treated as a resource
    resource_root: 'schemas'

    # The path, under which resource browser will be available to site visitors
    index_url: 'schemas'

    # These control resource index & individual resource pages
    index_title: "Schemas"
    resource_label: "schema"

always_show_committee_link_on_landing: yes

awards:
  - title: 2010 Lawrence D. Eicher Leadership Award
    path: /award/2010/09/16/tc211-wins-iso-excellence-award.html

social:
  links:
    - url: https://twitter.com/<account>
    - url: https://github.com/<org>
    - url: https://www.facebook.com/groups/<group ID>/
    - url: https://www.linkedin.com/groups/<group ID>

# Committee site maintainer
powered_by:
  title: <organization name>
  url: <organization site>
  logo_path: /assets/<logo-filename.svg>

# Primary navigation
nav:
  items:
    - id: home
      url: /
      title: Home
      description: Standard resource links & latest news
    - id: news
      url: /posts
      title: News & Articles

# Footer navigation (example)
footer_nav:
  - url: <committee site URL>
    title: ISO/TC XXX
```


## Contributing

Bug reports and pull requests are welcome on GitHub
at https://github.com/riboseinc/jekyll-theme-isotc211.

This project is intended to be a safe, welcoming space for collaboration,
and contributors are expected to adhere
to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## Theme development

Generally, this directory is setup like a Jekyll site. To set it up,
run `bundle install`.

To experiment with this code, add content (projects, software, specs)
and run `bundle exec jekyll serve`. This starts a Jekyll server
using this theme at `http://localhost:4000`. 

Put your layouts in `_layouts`, your includes in `_includes`,
your sass files in `_sass` and any other assets in `assets`.

Add pages, documents, data, etc. like normal to test your theme's contents.

As you make modifications to your theme and to your content, your site will
regenerate and you should see the changes in the browser after a refresh,
like normal.

When your theme is released, only files specified with gemspec file
will be included. If you modify theme to add more directories that
need to be included in the gem, edit regexp in the gemspec.

### Building and releasing

#### Manual test during development

When you’re working on visual aspects of the theme, it’s useful
to see how it would affect the end result (a site *built with* this theme).

Here’s how to develop the theme while simultaneously previewing the changes
on a site. The sequence would be as follows, assuming you have a local copy
of this repo and have a Jekyll site using this theme:

1. For the Jekyll site, change Gemfile to point to local copy
   of the theme (the root of this repo) and run `bundle`.

   For example, you’d change `gem "jekyll-theme-isotc211"`
   to `gem "jekyll-theme-isotc211", :path => "../jekyll-theme-isotc211"`.
   The relative path assumes your site root and theme root are sibling directories.

2. Run `bundle exec jekyll serve` to start Jekyll’s development server.

3. Make changes to both theme and site directory contents.

4. If needed, kill with Ctrl+C then relaunch the serve command
   to apply the changes you made to the theme
   (it may not reload automatically if changes only affect the theme and not the site
   you’re serving).

4. Once you’re satisfied, release a new version of the theme — see below.

5. (To later bump the site to this latest version: revert the Gemfile change,
   update theme dependency version to the one you’ve just released,
   run `bundle --full-index` to update the lockfile,
   and your site is ready to go.)

#### Releasing

Make sure theme works: build script is under construction,
so use good judgement and thorough manual testing.

1. First, update version number in .gemspec within this repo’s root.

2. Then, execute `./develop/release`. This does the following:

   * Builds new gem version
   * Pushes gem to rubygems.org
   * Creates new version tag in this repository
   * Pushes changes to GitHub


## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
