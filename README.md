# Scott Blain - Research Portfolio Website

A modern, interactive website showcasing research in cognitive science and a pivot to AI safety research.

## Features

- **Interactive Visualizations**: Dynamic canvas animations for each research theme
- **Neural Network Background**: Animated particle system representing cognitive connections
- **Research Modals**: Detailed exploration of key concepts (apophenia, social cognition, hallucination mitigation, DCM)
- **Responsive Design**: Mobile-friendly layout with smooth animations
- **PDF Integration**: Direct links to research publications

## Setup for GitHub Pages

1. Create a new GitHub repository named `[your-username].github.io` (for user site) or any name (for project site)

2. Initialize git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - research portfolio website"
   ```

3. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/[your-username]/[repository-name].git
   git branch -M main
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to Settings → Pages in your repository
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

5. Your site will be available at:
   - User site: `https://[your-username].github.io`
   - Project site: `https://[your-username].github.io/[repository-name]`

## Customization

### Update Contact Information
Edit the contact section in `index.html`:
- Replace `your.email@example.com` with your email
- Update GitHub and LinkedIn links

### Modify Research Content
- Research modal content is in `scripts.js` under the `openResearchModal` function
- Add new research themes by creating new cards in the research grid

### Update Publications
- Place PDF files in the root directory
- Update links in the publications section

## Technologies Used

- **Three.js**: 3D mind network visualization
- **GSAP**: Smooth animations
- **Canvas API**: Custom visualizations for research concepts
- **CSS Grid & Flexbox**: Responsive layout
- **Intersection Observer**: Scroll-triggered animations

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── scripts.js          # Interactive features and animations
├── README.md           # This file
├── *.pdf              # Research publications
└── *.docx             # Resume and other documents
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Notes

- Animations are GPU-accelerated for smooth performance
- Background neural network uses requestAnimationFrame for efficiency
- Images and heavy resources are lazy-loaded

## Future Enhancements

- Add blog section for AI safety thoughts
- Integrate with Google Scholar API for publication metrics
- Add dark mode toggle
- Create individual pages for detailed research projects