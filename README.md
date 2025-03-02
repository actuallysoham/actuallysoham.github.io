# Academic Website Template

A minimalist academic website template built with Jekyll. Features include:
- Clean, responsive design
- Publication list with BibTeX support
- Blog system
- News feed
- Teaching/Service section

## Quick Start

1. Install Jekyll and Bundler:
```bash
gem install jekyll bundler
```

2. Clone and serve locally:
```bash
git clone https://github.com/actuallysoham/website
cd website
bundle install
bundle exec jekyll serve
```

3. View at `http://localhost:4000`

## Customization

### Basic Configuration
Edit `_config.yml` to update:
- Site title and description
- Your social media handles
- Other site-wide settings

### Content Structure
- `_data/`: Contains YAML files for publications, news, etc.
- `_posts/`: Blog posts (format: YYYY-MM-DD-title.md)
- `assets/`: Images, CSS, and JavaScript files
- Main pages: `index.md`, `research.md`, `teaching.md`, etc.

### Adding Publications
Add entries to `_data/publications.yml`:
```yaml
- title: "Paper Title"
  authors: ["Author 1", "Author 2"]
  venue: "Conference/Journal Name"
  year: 2024
  links:
    paper: "path/to/paper.pdf"
    code: "https://github.com/..."
```

## License

This template is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). You are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

## Acknowledgments

Design inspired by:
- [Martin Saveski](https://faculty.washington.edu/msaveski)
- [Deedy Das](https://debarghyadas.com)
- [MIT Visualization Group](https://vis.csail.mit.edu) 